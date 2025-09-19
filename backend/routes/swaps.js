const express = require('express');
const router = express.Router();

// Mock swaps data
const mockSwaps = [
    {
        id: 1,
        requester: 'Sauban Islam',
        provider: 'Fatima Rahman',
        skillOffered: 'Coding',
        skillRequested: 'Guitar',
        status: 'pending'
    }
];

// Get all swaps
router.get('/', async (req, res) => {
    try {
        res.json(mockSwaps);
    } catch (error) {
        console.error('Get swaps error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;