const express = require('express');
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all templates (public + user's custom)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .or(`is_public.eq.true,user_id.eq.${req.user.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ templates: data });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Failed to get templates' });
  }
});

// Get single template
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check access
    if (!data.is_public && data.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ template: data });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Failed to get template' });
  }
});

// Create custom template
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, content, category, industry } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const { data, error } = await supabase
      .from('templates')
      .insert([
        {
          user_id: req.user.id,
          title,
          description: description || '',
          content,
          category: category || 'custom',
          industry: industry || 'general',
          is_public: false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Template created successfully',
      template: data 
    });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Update custom template
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, content, category, industry } = req.body;

    const { data, error } = await supabase
      .from('templates')
      .update({
        title,
        description,
        content,
        category,
        industry
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      message: 'Template updated successfully',
      template: data 
    });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ error: 'Failed to update template' });
  }
});

// Delete custom template
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

module.exports = router;

