// Avatar utility for male and female users - Modern & Cool
export const avatarOptions = {
    male: [
        // Cool, modern, handsome male avatars
        'https://api.dicebear.com/7.x/adventurer/png?seed=coolDude1&backgroundColor=1976D2&hair=short01&hairColor=2c1b18&eyes=variant01&mouth=variant01&skinColor=f2d3b1',
        'https://api.dicebear.com/7.x/adventurer/png?seed=coolDude2&backgroundColor=4CAF50&hair=short02&hairColor=724133&eyes=variant02&mouth=variant02&skinColor=d08b5b',
        'https://api.dicebear.com/7.x/adventurer/png?seed=coolDude3&backgroundColor=FF9800&hair=short03&hairColor=0e0e0e&eyes=variant03&mouth=variant03&skinColor=edb98a',
        'https://api.dicebear.com/7.x/adventurer/png?seed=coolDude4&backgroundColor=9C27B0&hair=short04&hairColor=4a312c&eyes=variant04&mouth=variant04&skinColor=f2d3b1',
        'https://api.dicebear.com/7.x/adventurer/png?seed=coolDude5&backgroundColor=607D8B&hair=short05&hairColor=2c1b18&eyes=variant05&mouth=variant05&skinColor=d08b5b',
        'https://api.dicebear.com/7.x/adventurer/png?seed=coolDude6&backgroundColor=F44336&hair=short06&hairColor=724133&eyes=variant06&mouth=variant06&skinColor=edb98a',
    ],
    female: [
        // Beautiful, modern female avatars
        'https://api.dicebear.com/7.x/adventurer/png?seed=beautifulLady1&backgroundColor=E91E63&hair=long01&hairColor=2c1b18&eyes=variant01&mouth=variant01&skinColor=f2d3b1',
        'https://api.dicebear.com/7.x/adventurer/png?seed=beautifulLady2&backgroundColor=9C27B0&hair=long02&hairColor=724133&eyes=variant02&mouth=variant02&skinColor=d08b5b',
        'https://api.dicebear.com/7.x/adventurer/png?seed=beautifulLady3&backgroundColor=4CAF50&hair=long03&hairColor=0e0e0e&eyes=variant03&mouth=variant03&skinColor=edb98a',
        'https://api.dicebear.com/7.x/adventurer/png?seed=beautifulLady4&backgroundColor=FF5722&hair=long04&hairColor=4a312c&eyes=variant04&mouth=variant04&skinColor=f2d3b1',
        'https://api.dicebear.com/7.x/adventurer/png?seed=beautifulLady5&backgroundColor=2196F3&hair=long05&hairColor=2c1b18&eyes=variant05&mouth=variant05&skinColor=d08b5b',
        'https://api.dicebear.com/7.x/adventurer/png?seed=beautifulLady6&backgroundColor=009688&hair=long06&hairColor=724133&eyes=variant06&mouth=variant06&skinColor=edb98a',
    ]
};

// Get avatar based on user data
export const getUserAvatar = (user) => {
    if (user?.avatar && user.avatar.startsWith('http')) {
        return user.avatar;
    }

    // Determine gender from name or use default
    const femaleNames = ['fatima', 'nadia', 'rashida', 'ayesha', 'maya', 'emma', 'sarah', 'sultana', 'begum', 'khatun'];
    const isFemale = user?.gender === 'female' ||
        femaleNames.some(name =>
            user?.name?.toLowerCase().includes(name));

    const avatarType = isFemale ? 'female' : 'male';
    const avatarIndex = user?.id ? (user.id - 1) % avatarOptions[avatarType].length : 0;

    return avatarOptions[avatarType][avatarIndex];
};

// Get avatar by name (for quick assignment)
export const getAvatarByName = (name, gender = null) => {
    const userName = name?.toLowerCase() || '';

    // Auto-detect gender from common Bangladeshi names
    const femaleNames = ['fatima', 'nadia', 'rashida', 'ayesha', 'maya', 'emma', 'sarah', 'sultana', 'begum', 'khatun', 'nasreen', 'salma', 'ruma', 'shirin', 'taslima'];
    const maleNames = ['arif', 'karim', 'rafiq', 'sauban', 'hassan', 'ahmed', 'khan', 'islam', 'rahman', 'mohammad', 'abdul', 'mizanur', 'aminul', 'jahangir'];

    let detectedGender = gender;
    if (!detectedGender) {
        if (femaleNames.some(n => userName.includes(n))) {
            detectedGender = 'female';
        } else if (maleNames.some(n => userName.includes(n))) {
            detectedGender = 'male';
        } else {
            detectedGender = 'male'; // default
        }
    }

    const avatarType = detectedGender === 'female' ? 'female' : 'male';
    const nameHash = name?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
    const avatarIndex = nameHash % avatarOptions[avatarType].length;

    return avatarOptions[avatarType][avatarIndex];
};

// Fallback avatar with initials
export const getFallbackAvatar = (name, backgroundColor = '#4CAF50') => {
    const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    return {
        initials,
        backgroundColor,
        isInitials: true
    };
};