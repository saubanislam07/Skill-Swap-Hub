const express = require('express');
const router = express.Router();

// Mock skills data
const mockSkills = [
    { id: 1, name: 'Guitar', category: 'Music', teacher: 'Fatima Rahman' },
    { id: 2, name: 'Web Development', category: 'Tech', teacher: 'Arif Hassan' },
    { id: 3, name: 'Cooking', category: 'Cooking', teacher: 'Rashida Begum' }
];

// Get all skills
router.get('/', async (req, res) => {
    try {
        res.json(mockSkills);
    } catch (error) {
        console.error('Get skills error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;