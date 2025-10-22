const express = require('express');
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user's teams
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*, teams(*)')
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ teams: data });
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ error: 'Failed to get teams' });
  }
});

// Create team
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    // Create team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert([
        {
          name,
          owner_id: req.user.id
        }
      ])
      .select()
      .single();

    if (teamError) throw teamError;

    // Add creator as owner
    const { error: memberError } = await supabase
      .from('team_members')
      .insert([
        {
          team_id: team.id,
          user_id: req.user.id,
          role: 'owner'
        }
      ]);

    if (memberError) throw memberError;

    res.status(201).json({ 
      message: 'Team created successfully',
      team 
    });
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// Invite team member
router.post('/:teamId/invite', authMiddleware, async (req, res) => {
  try {
    const { email, role } = req.body;
    const { teamId } = req.params;

    // Check if user is owner or admin
    const { data: membership } = await supabase
      .from('team_members')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', req.user.id)
      .single();

    if (!membership || !['owner', 'admin'].includes(membership.role)) {
      return res.status(403).json({ error: 'Only owners and admins can invite members' });
    }

    // Find user by email
    const { data: invitedUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (!invitedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add to team
    const { data, error } = await supabase
      .from('team_members')
      .insert([
        {
          team_id: teamId,
          user_id: invitedUser.id,
          role: role || 'member'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      message: 'Team member invited successfully',
      member: data 
    });
  } catch (error) {
    console.error('Invite member error:', error);
    res.status(500).json({ error: 'Failed to invite team member' });
  }
});

// Remove team member
router.delete('/:teamId/members/:userId', authMiddleware, async (req, res) => {
  try {
    const { teamId, userId } = req.params;

    // Check if requester is owner or admin
    const { data: membership } = await supabase
      .from('team_members')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', req.user.id)
      .single();

    if (!membership || !['owner', 'admin'].includes(membership.role)) {
      return res.status(403).json({ error: 'Only owners and admins can remove members' });
    }

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ error: 'Failed to remove team member' });
  }
});

module.exports = router;

