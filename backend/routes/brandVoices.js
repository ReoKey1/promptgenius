const express = require('express');
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');
const { checkTierLimit } = require('../middleware/tierCheck');

const router = express.Router();

// Get all brand voices for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('brand_voices')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ brandVoices: data });
  } catch (error) {
    console.error('Get brand voices error:', error);
    res.status(500).json({ error: 'Failed to get brand voices' });
  }
});

// Get single brand voice
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('brand_voices')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Brand voice not found' });
    }

    res.json({ brandVoice: data });
  } catch (error) {
    console.error('Get brand voice error:', error);
    res.status(500).json({ error: 'Failed to get brand voice' });
  }
});

// Create brand voice
router.post('/', authMiddleware, checkTierLimit('brandVoices'), async (req, res) => {
  try {
    const { name, description, guidelines, examples } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const { data, error } = await supabase
      .from('brand_voices')
      .insert([
        {
          user_id: req.user.id,
          name,
          description: description || '',
          guidelines: guidelines || '',
          examples: examples || ''
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Brand voice created successfully',
      brandVoice: data 
    });
  } catch (error) {
    console.error('Create brand voice error:', error);
    res.status(500).json({ error: 'Failed to create brand voice' });
  }
});

// Update brand voice
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, guidelines, examples } = req.body;

    const { data, error } = await supabase
      .from('brand_voices')
      .update({
        name,
        description,
        guidelines,
        examples
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      message: 'Brand voice updated successfully',
      brandVoice: data 
    });
  } catch (error) {
    console.error('Update brand voice error:', error);
    res.status(500).json({ error: 'Failed to update brand voice' });
  }
});

// Delete brand voice
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from('brand_voices')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ message: 'Brand voice deleted successfully' });
  } catch (error) {
    console.error('Delete brand voice error:', error);
    res.status(500).json({ error: 'Failed to delete brand voice' });
  }
});

module.exports = router;

