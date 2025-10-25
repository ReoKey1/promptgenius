/**
 * Database Functions for Supabase Integration
 * Handles all database operations with security and error handling
 */

import { supabase } from './supabaseClient.js';

// ============================================
// TEMPLATES
// ============================================

/**
 * Load all templates for the current user
 */
export async function loadTemplates() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        // Load user's custom templates + public templates
        const { data, error } = await supabase
            .from('templates')
            .select('*')
            .or(`user_id.eq.${user.id},is_public.eq.true`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // If no templates exist, return default templates
        if (!data || data.length === 0) {
            return getDefaultTemplates();
        }

        return data;
    } catch (error) {
        console.error('Error loading templates:', error);
        return getDefaultTemplates();
    }
}

/**
 * Save a new template
 */
export async function saveTemplateToDb(template) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { data, error } = await supabase
            .from('templates')
            .insert([{
                user_id: user.id,
                name: template.name,
                category: template.category,
                description: template.description,
                content: template.content,
                is_public: false
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error saving template:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Default templates (fallback if database is empty)
 */
function getDefaultTemplates() {
    return [
        {
            id: 'default-1',
            name: 'Blog Post Outline',
            category: 'content',
            description: 'Create a structured outline for a blog post',
            content: 'Create a detailed blog post outline about {{topic}}. Include:\n- Catchy headline\n- Introduction hook\n- 5 main sections with subpoints\n- Conclusion with call-to-action\n\nTarget audience: {{audience}}\nTone: {{tone}}',
            uses: 156,
            created_at: new Date().toISOString()
        },
        {
            id: 'default-2',
            name: 'Email Marketing Campaign',
            category: 'marketing',
            description: 'Generate a complete email marketing sequence',
            content: 'Create a 3-email marketing sequence for {{product/service}}.\n\nEmail 1: Problem awareness\nEmail 2: Solution introduction\nEmail 3: Call-to-action with urgency\n\nTarget audience: {{audience}}\nGoal: {{goal}}\nTone: Professional yet friendly',
            uses: 203,
            created_at: new Date().toISOString()
        },
        {
            id: 'default-3',
            name: 'Social Media Post',
            category: 'marketing',
            description: 'Create engaging social media content',
            content: 'Write a {{platform}} post about {{topic}}.\n\nRequirements:\n- Hook in first line\n- Include relevant hashtags\n- Call-to-action at end\n- {{word_limit}} words maximum\n\nTone: {{tone}}\nAudience: {{audience}}',
            uses: 342,
            created_at: new Date().toISOString()
        },
        {
            id: 'default-4',
            name: 'Customer Support Response',
            category: 'support',
            description: 'Draft professional customer support replies',
            content: 'Write a customer support response for this situation:\n\nCustomer issue: {{issue}}\n\nResponse should:\n- Acknowledge the problem empathetically\n- Provide clear solution steps\n- Offer additional help\n- End with professional closing\n\nTone: Empathetic and helpful',
            uses: 89,
            created_at: new Date().toISOString()
        },
        {
            id: 'default-5',
            name: 'Product Description',
            category: 'sales',
            description: 'Write compelling product descriptions',
            content: 'Write a product description for {{product_name}}.\n\nInclude:\n- Attention-grabbing headline\n- 3-5 key benefits (not features)\n- Use case scenarios\n- Social proof element\n- Strong call-to-action\n\nTarget audience: {{audience}}\nWord limit: {{word_limit}} words',
            uses: 178,
            created_at: new Date().toISOString()
        },
        {
            id: 'default-6',
            name: 'Code Documentation',
            category: 'code',
            description: 'Generate clear code documentation',
            content: 'Create documentation for this {{language}} code:\n\n```\n{{code}}\n```\n\nInclude:\n- Purpose and functionality\n- Parameters and return values\n- Usage examples\n- Edge cases and limitations\n\nFormat: Markdown',
            uses: 67,
            created_at: new Date().toISOString()
        }
    ];
}

// ============================================
// BRAND VOICES
// ============================================

/**
 * Load all brand voices for the current user
 */
export async function loadBrandVoices() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('brand_voices')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data || [];
    } catch (error) {
        console.error('Error loading brand voices:', error);
        return [];
    }
}

/**
 * Save a new brand voice
 */
export async function saveBrandVoiceToDb(brandVoice) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { data, error } = await supabase
            .from('brand_voices')
            .insert([{
                user_id: user.id,
                name: brandVoice.name,
                tone: brandVoice.tone,
                description: brandVoice.description,
                sample_text: brandVoice.sample_text,
                keywords: brandVoice.keywords || []
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error saving brand voice:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update an existing brand voice
 */
export async function updateBrandVoice(id, updates) {
    try {
        const { data, error } = await supabase
            .from('brand_voices')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error updating brand voice:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete a brand voice
 */
export async function deleteBrandVoice(id) {
    try {
        const { error } = await supabase
            .from('brand_voices')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error('Error deleting brand voice:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// PROMPTS & HISTORY
// ============================================

/**
 * Load prompt history for the current user
 */
export async function loadHistory() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('prompts')
            .select(`
                *,
                brand_voices (
                    name
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;

        // Flatten the brand voice name
        return (data || []).map(prompt => ({
            ...prompt,
            brand_voice_name: prompt.brand_voices?.name || null
        }));
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
}

/**
 * Save a prompt to history
 */
export async function savePromptToDb(content, qualityScore, brandVoiceId = null, templateId = null) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { success: false, error: 'Not authenticated' };
        }

        const { data, error } = await supabase
            .from('prompts')
            .insert([{
                user_id: user.id,
                content: content,
                quality_score: qualityScore,
                brand_voice_id: brandVoiceId || null,
                template_id: templateId || null
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error saving prompt:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get a specific prompt by ID
 */
export async function getPromptById(id) {
    try {
        const { data, error } = await supabase
            .from('prompts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error getting prompt:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// PROMPT VERSIONS
// ============================================

/**
 * Save a new version of a prompt
 */
export async function savePromptVersion(promptId, content, qualityScore) {
    try {
        const { data, error } = await supabase
            .from('prompt_versions')
            .insert([{
                prompt_id: promptId,
                content: content,
                quality_score: qualityScore,
                version_number: 1 // In a real app, increment this
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error saving prompt version:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get all versions of a prompt
 */
export async function getPromptVersions(promptId) {
    try {
        const { data, error } = await supabase
            .from('prompt_versions')
            .select('*')
            .eq('prompt_id', promptId)
            .order('version_number', { ascending: false });

        if (error) throw error;

        return { success: true, data: data || [] };
    } catch (error) {
        console.error('Error getting prompt versions:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// ANALYTICS
// ============================================

/**
 * Get user analytics
 */
export async function getUserAnalytics() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Get total prompts
        const { count: totalPrompts } = await supabase
            .from('prompts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        // Get average quality score
        const { data: prompts } = await supabase
            .from('prompts')
            .select('quality_score')
            .eq('user_id', user.id);

        const avgScore = prompts && prompts.length > 0
            ? Math.round(prompts.reduce((sum, p) => sum + p.quality_score, 0) / prompts.length)
            : 0;

        // Get templates used
        const { count: templatesUsed } = await supabase
            .from('prompts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .not('template_id', 'is', null);

        // Get brand voices count
        const { count: brandVoicesCount } = await supabase
            .from('brand_voices')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        return {
            totalPrompts: totalPrompts || 0,
            avgScore,
            templatesUsed: templatesUsed || 0,
            brandVoicesCount: brandVoicesCount || 0
        };
    } catch (error) {
        console.error('Error getting analytics:', error);
        return null;
    }
}

// ============================================
// SECURITY & VALIDATION
// ============================================

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate template data
 */
export function validateTemplate(template) {
    const errors = [];

    if (!template.name || template.name.trim().length === 0) {
        errors.push('Template name is required');
    }

    if (!template.category || template.category.trim().length === 0) {
        errors.push('Category is required');
    }

    if (!template.content || template.content.trim().length === 0) {
        errors.push('Template content is required');
    }

    if (template.name && template.name.length > 100) {
        errors.push('Template name must be less than 100 characters');
    }

    if (template.content && template.content.length > 5000) {
        errors.push('Template content must be less than 5000 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Validate brand voice data
 */
export function validateBrandVoice(brandVoice) {
    const errors = [];

    if (!brandVoice.name || brandVoice.name.trim().length === 0) {
        errors.push('Brand name is required');
    }

    if (!brandVoice.tone || brandVoice.tone.trim().length === 0) {
        errors.push('Tone is required');
    }

    if (brandVoice.name && brandVoice.name.length > 100) {
        errors.push('Brand name must be less than 100 characters');
    }

    if (brandVoice.description && brandVoice.description.length > 1000) {
        errors.push('Description must be less than 1000 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Rate limiting check (client-side)
 */
const rateLimitMap = new Map();

export function checkRateLimit(action, limit = 10, windowMs = 60000) {
    const now = Date.now();
    const key = action;
    
    if (!rateLimitMap.has(key)) {
        rateLimitMap.set(key, []);
    }

    const timestamps = rateLimitMap.get(key).filter(t => now - t < windowMs);
    
    if (timestamps.length >= limit) {
        return {
            allowed: false,
            retryAfter: Math.ceil((timestamps[0] + windowMs - now) / 1000)
        };
    }

    timestamps.push(now);
    rateLimitMap.set(key, timestamps);

    return { allowed: true };
}

