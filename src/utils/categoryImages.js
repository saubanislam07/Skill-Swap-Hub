// Category images for better visual appeal
export const categoryImages = {
    Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center',
    Cooking: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center',
    Fitness: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center',
    Languages: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop&crop=center',
    Tech: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop&crop=center',
    Arts: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop&crop=center',
};

// Skill-specific images for featured swaps
export const skillImages = {
    'Guitar Lessons': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop&crop=center',
    'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center',
    'Yoga Classes': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop&crop=center',
    'Cooking Classes': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&crop=center',
    'Photography': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=200&fit=crop&crop=center',
    'Fitness Training': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&crop=center',
    'Bengali Language': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&crop=center',
    'Digital Art': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center',
};

export const getSkillImage = (skillName) => {
    return skillImages[skillName] || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop&crop=center';
};