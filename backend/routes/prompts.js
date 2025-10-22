const express = require('express');
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');
const { checkTierLimit } = require('../middleware/tierCheck');
const { calculateQualityScore } = require('../utils/qualityScore');

const router = express.Router();

// Get all prompts for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('user_id', req.user.id)
      .is('parent_id', null) // Only get latest versions
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ prompts: data });
  } catch (error) {
    console.error('Get prompts error:', error);
    res.status(500).json({ error: 'Failed to get prompts' });
  }
});

// Get single prompt
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    res.json({ prompt: data });
  } catch (error) {
    console.error('Get prompt error:', error);
    res.status(500).json({ error: 'Failed to get prompt' });
  }
});

// Create prompt
router.post('/', authMiddleware, checkTierLimit('prompts'), async (req, res) => {
  try {
    const { title, content, category, industry } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Calculate quality score
    const qualityScore = calculateQualityScore(content);

    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          user_id: req.user.id,
          title,
          content,
          category: category || 'general',
          industry: industry || 'general',
          quality_score: qualityScore,
          version: 1
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Prompt created successfully',
      prompt: data 
    });
  } catch (error) {
    console.error('Create prompt error:', error);
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});

// Update prompt (creates new version)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, category, industry } = req.body;

    // Get original prompt
    const { data: original, error: getError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (getError) throw getError;

    if (!original) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    // Calculate quality score
    const qualityScore = calculateQualityScore(content || original.content);

    // Create new version
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          user_id: req.user.id,
          title: title || original.title,
          content: content || original.content,
          category: category || original.category,
          industry: industry || original.industry,
          quality_score: qualityScore,
          version: original.version + 1,
          parent_id: original.id
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      message: 'Prompt updated successfully',
      prompt: data 
    });
  } catch (error) {
    console.error('Update prompt error:', error);
    res.status(500).json({ error: 'Failed to update prompt' });
  }
});

// Delete prompt
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    console.error('Delete prompt error:', error);
    res.status(500).json({ error: 'Failed to delete prompt' });
  }
});

// Get prompt versions
router.get('/:id/versions', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .or(`id.eq.${req.params.id},parent_id.eq.${req.params.id}`)
      .eq('user_id', req.user.id)
      .order('version', { ascending: false });

    if (error) throw error;

    res.json({ versions: data });
  } catch (error) {
    console.error('Get versions error:', error);
    res.status(500).json({ error: 'Failed to get versions' });
  }
});

module.exports = router;

