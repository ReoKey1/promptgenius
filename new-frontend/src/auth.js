import { supabase } from './supabaseClient.js'

// Handle user signup
export async function handleSignup(email, password, fullName) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Signup error:', error.message)
    return { success: false, error: error.message }
  }
}

// Handle user login
export async function handleLogin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Login error:', error.message)
    return { success: false, error: error.message }
  }
}

// Handle user logout
export async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error.message)
    return { success: false, error: error.message }
  }
}

// Check authentication status
export async function checkAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return { authenticated: !!session, session }
  } catch (error) {
    console.error('Auth check error:', error.message)
    return { authenticated: false, session: null }
  }
}

// Get current user profile
export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error

    return profile
  } catch (error) {
    console.error('Profile fetch error:', error.message)
    return null
  }
}

// Update user profile
export async function updateUserProfile(updates) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user logged in')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Profile update error:', error.message)
    return { success: false, error: error.message }
  }
}

// Password reset request
export async function requestPasswordReset(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Password reset error:', error.message)
    return { success: false, error: error.message }
  }
}

// Update password
export async function updatePassword(newPassword) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Password update error:', error.message)
    return { success: false, error: error.message }
  }
}

