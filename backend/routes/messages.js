const express = require('express');
const router = express.Router();

// Mock messages data
const mockMessages = [
    {
        id: 1,
        sender: 'Fatima Rahman',
        receiver: 'Sauban Islam',
        content: 'Hi! I saw you want to learn guitar. I can help!',
        timestamp: new Date()
    }
];

// Get messages
router.get('/', async (req, res) => {
    try {
        res.json(mockMessages);
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;