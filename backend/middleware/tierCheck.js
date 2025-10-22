const supabase = require('../config/supabase');

const TIER_LIMITS = {
  tier1: {
    maxPrompts: 100,
    maxTemplates: 5,
    maxBrandVoices: 1,
    maxTeamMembers: 1
  },
  tier2: {
    maxPrompts: 500,
    maxTemplates: 20,
    maxBrandVoices: 3,
    maxTeamMembers: 3
  },
  tier3: {
    maxPrompts: 999999, // Unlimited
    maxTemplates: 999999,
    maxBrandVoices: 999999,
    maxTeamMembers: 10
  },
  monthly: {
    maxPrompts: 500,
    maxTemplates: 20,
    maxBrandVoices: 3,
    maxTeamMembers: 3
  }
};

const checkTierLimit = (resource) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      
      // Get user tier
      const { data: user, error } = await supabase
        .from('users')
        .select('tier')
        .eq('id', userId)
        .single();

      if (error) throw error;

      const tier = user.tier || 'tier1';
      const limits = TIER_LIMITS[tier];

      // Check current count based on resource type
      let currentCount = 0;
      
      if (resource === 'prompts') {
        const { count } = await supabase
          .from('prompts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);
        currentCount = count;
        
        if (currentCount >= limits.maxPrompts) {
          return res.status(403).json({ 
            error: 'Prompt limit reached',
            limit: limits.maxPrompts,
            current: currentCount
          });
        }
      } else if (resource === 'templates') {
        const { count } = await supabase
          .from('templates')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);
        currentCount = count;
        
        if (currentCount >= limits.maxTemplates) {
          return res.status(403).json({ 
            error: 'Template limit reached',
            limit: limits.maxTemplates,
            current: currentCount
          });
        }
      } else if (resource === 'brandVoices') {
        const { count } = await supabase
          .from('brand_voices')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);
        currentCount = count;
        
        if (currentCount >= limits.maxBrandVoices) {
          return res.status(403).json({ 
            error: 'Brand voice limit reached',
            limit: limits.maxBrandVoices,
            current: currentCount
          });
        }
      }

      req.tierLimits = limits;
      next();
    } catch (error) {
      console.error('Tier check error:', error);
      res.status(500).json({ error: 'Failed to check tier limits' });
    }
  };
};

module.exports = { checkTierLimit, TIER_LIMITS };

