const express = require('express');
const Notification = require('../models/Notification');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get all notifications (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('order')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/notifications/unread
// @desc    Get unread notifications count (admin only)
router.get('/unread', [auth, admin], async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read (admin only)
router.put('/:id/read', [auth, admin], async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read (admin only)
router.put('/read-all', [auth, admin], async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

