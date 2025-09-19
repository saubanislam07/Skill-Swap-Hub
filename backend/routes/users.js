const express = require('express');
const router = express.Router();

// Mock users data
const mockUsers = [
    {
        id: 1,
        name: 'Fatima Rahman',
        email: 'fatima@example.com',
        skills: ['Guitar', 'Music Theory'],
        wantsToLearn: ['Cooking', 'Bengali Cuisine']
    },
    {
        id: 2,
        name: 'Arif Hassan',
        email: 'arif@example.com',
        skills: ['Web Development', 'JavaScript'],
        wantsToLearn: ['Photography', 'Digital Art']
    }
];

// Get all users
router.get('/', async (req, res) => {
    try {
        res.json(mockUsers);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user profile
router.get('/profile/:id', async (req, res) => {
    try {
        const user = mockUsers.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;