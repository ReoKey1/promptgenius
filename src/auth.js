/**
 * Prompt-U Authentication Module
 * Handles user signup, login, logout, and profile management
 * WITH ENHANCED SECURITY MEASURES
 */

import { supabase } from './supabaseClient.js';

// ============================================
// SECURITY: Rate Limiting
// ============================================

const authAttempts = new Map();
const MAX_AUTH_ATTEMPTS = 5;
const AUTH_LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function checkAuthRateLimit(email) {
    const now = Date.now();
    const attempts = authAttempts.get(email) || { count: 0, firstAttempt: now };
    
    // Reset if lockout time has passed
    if (now - attempts.firstAttempt > AUTH_LOCKOUT_TIME) {
        authAttempts.delete(email);
        return { allowed: true };
    }
    
    if (attempts.count >= MAX_AUTH_ATTEMPTS) {
        const remainingTime = Math.ceil((AUTH_LOCKOUT_TIME - (now - attempts.firstAttempt)) / 1000 / 60);
        return { 
            allowed: false, 
            message: `Too many login attempts. Please try again in ${remainingTime} minutes.` 
        };
    }
    
    return { allowed: true };
}

function recordFailedAttempt(email) {
    const now = Date.now();
    const attempts = authAttempts.get(email) || { count: 0, firstAttempt: now };
    attempts.count++;
    authAttempts.set(email, attempts);
}

function clearAuthAttempts(email) {
    authAttempts.delete(email);
}

// ============================================
// SECURITY: Input Validation
// ============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().substring(0, 255); // Limit length and trim whitespace
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

/**
 * Handle user signup with security validation
 */
export async function handleSignup(email, password, fullName) {
    // Security: Validate email
    if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
    }
    
    // Security: Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.message };
    }
    
    // Security: Sanitize name
    const sanitizedName = sanitizeInput(fullName || '');
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: sanitizedName
                }
            }
        });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Signup error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Handle user login with rate limiting
 */
export async function handleLogin(email, password) {
    // Security: Validate email
    if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
    }
    
    // Security: Check rate limit
    const rateLimit = checkAuthRateLimit(email);
    if (!rateLimit.allowed) {
        return { success: false, error: rateLimit.message };
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            // Security: Record failed attempt
            recordFailedAttempt(email);
            throw error;
        }
        
        // Security: Clear failed attempts on successful login
        clearAuthAttempts(email);

        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Handle user logout
 */
export async function handleLogout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Check authentication status
 */
export async function checkAuth() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return { authenticated: !!session, session };
    } catch (error) {
        console.error('Auth check error:', error.message);
        return { authenticated: false, session: null };
    }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error('Get user error:', error.message);
        return null;
    }
}

/**
 * Get current user profile
 */
export async function getUserProfile() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) throw error;

        return profile;
    } catch (error) {
        console.error('Profile fetch error:', error.message);
        return null;
    }
}

/**
 * Update user profile with validation
 */
export async function updateUserProfile(updates) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user logged in');

        // Security: Sanitize inputs
        const sanitizedUpdates = {};
        if (updates.full_name) {
            sanitizedUpdates.full_name = sanitizeInput(updates.full_name);
        }
        if (updates.avatar_url) {
            sanitizedUpdates.avatar_url = sanitizeInput(updates.avatar_url);
        }

        const { data, error } = await supabase
            .from('profiles')
            .update(sanitizedUpdates)
            .eq('id', user.id)
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Profile update error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Password reset request with validation
 */
export async function requestPasswordReset(email) {
    // Security: Validate email
    if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
    }
    
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Update password with validation
 */
export async function updatePassword(newPassword) {
    // Security: Validate password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.message };
    }
    
    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Password update error:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Refresh session token
 */
export async function refreshSession() {
    try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Session refresh error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Set up automatic session refresh
 */
export function setupSessionRefresh() {
    // Refresh session every 50 minutes (tokens expire after 60 minutes)
    setInterval(async () => {
        const { authenticated } = await checkAuth();
        if (authenticated) {
            await refreshSession();
        }
    }, 50 * 60 * 1000);
}

// ============================================
// SECURITY MONITORING
// ============================================

/**
 * Log security event (for monitoring)
 */
function logSecurityEvent(event, details) {
    console.log(`[SECURITY] ${event}:`, details);
    // In production, send to monitoring service (e.g., Sentry)
}

/**
 * Monitor authentication events
 */
supabase.auth.onAuthStateChange((event, session) => {
    logSecurityEvent('Auth state changed', { event, userId: session?.user?.id });
    
    if (event === 'SIGNED_IN') {
        logSecurityEvent('User signed in', { userId: session.user.id });
    } else if (event === 'SIGNED_OUT') {
        logSecurityEvent('User signed out', {});
    } else if (event === 'TOKEN_REFRESHED') {
        logSecurityEvent('Token refreshed', { userId: session.user.id });
    }
});

