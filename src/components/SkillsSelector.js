import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Predefined skill categories and skills
const skillCategories = {
    'Technology': [
        'Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design',
        'Digital Marketing', 'Cybersecurity', 'Cloud Computing', 'AI/Machine Learning',
        'Database Management', 'DevOps', 'Game Development', 'Blockchain'
    ],
    'Creative Arts': [
        'Photography', 'Graphic Design', 'Video Editing', 'Music Production',
        'Drawing/Painting', 'Writing', 'Animation', 'Interior Design',
        'Fashion Design', 'Pottery', 'Jewelry Making', 'Calligraphy'
    ],
    'Languages': [
        'English', 'Spanish', 'French', 'German', 'Chinese (Mandarin)',
        'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu', 'Portuguese'
    ],
    'Music': [
        'Guitar', 'Piano', 'Violin', 'Drums', 'Singing', 'Music Theory',
        'Bass Guitar', 'Flute', 'Saxophone', 'Ukulele', 'Harmonica', 'DJ Skills'
    ],
    'Fitness & Health': [
        'Yoga', 'Personal Training', 'Nutrition', 'Meditation', 'Pilates',
        'CrossFit', 'Running', 'Swimming', 'Martial Arts', 'Dance', 'Cycling', 'Rock Climbing'
    ],
    'Cooking & Food': [
        'Traditional Cooking', 'Baking', 'Vegetarian Cooking', 'International Cuisine',
        'Pastry Making', 'Food Photography', 'Wine Tasting', 'Coffee Making',
        'Grilling/BBQ', 'Healthy Cooking', 'Dessert Making', 'Food Styling'
    ],
    'Business & Finance': [
        'Entrepreneurship', 'Accounting', 'Investment', 'Marketing', 'Sales',
        'Project Management', 'Leadership', 'Public Speaking', 'Negotiation',
        'Business Strategy', 'Financial Planning', 'E-commerce'
    ],
    'Crafts & DIY': [
        'Woodworking', 'Knitting', 'Sewing', 'Gardening', 'Home Repair',
        'Electronics', 'Automotive', 'Furniture Making', 'Painting (House)',
        'Plumbing', 'Carpentry', 'Metalworking'
    ],
    'Academic': [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History',
        'Literature', 'Philosophy', 'Psychology', 'Economics', 'Tutoring',
        'Research Methods', 'Academic Writing'
    ],
    'Life Skills': [
        'Time Management', 'Organization', 'Communication', 'Parenting',
        'Relationship Advice', 'Career Counseling', 'Interview Skills',
        'Resume Writing', 'Stress Management', 'Goal Setting', 'Budgeting', 'Travel Planning'
    ]
};

export default function SkillsSelector({
    visible,
    onClose,
    onSaveSkills,
    initialTeachingSkills = [],
    initialLearningSkills = [],
    title = "Select Your Skills"
}) {
    const [activeTab, setActiveTab] = useState('teach');
    const [selectedCategory, setSelectedCategory] = useState('Technology');
    const [teachingSkills, setTeachingSkills] = useState(initialTeachingSkills);
    const [learningSkills, setLearningSkills] = useState(initialLearningSkills);
    const [customSkill, setCustomSkill] = useState('');

    const currentSkills = activeTab === 'teach' ? teachingSkills : learningSkills;
    const setCurrentSkills = activeTab === 'teach' ? setTeachingSkills : setLearningSkills;

    const handleSkillToggle = (skill) => {
        const skillObj = { name: skill, category: selectedCategory };
        const isSelected = currentSkills.some(s => s.name === skill);

        if (isSelected) {
            setCurrentSkills(currentSkills.filter(s => s.name !== skill));
        } else {
            if (currentSkills.length < 10) { // Limit to 10 skills
                setCurrentSkills([...currentSkills, skillObj]);
            }
        }
    };

    const handleAddCustomSkill = () => {
        if (customSkill.trim() && currentSkills.length < 10) {
            const skillObj = { name: customSkill.trim(), category: 'Custom' };
            const exists = currentSkills.some(s => s.name.toLowerCase() === customSkill.toLowerCase());

            if (!exists) {
                setCurrentSkills([...currentSkills, skillObj]);
                setCustomSkill('');
            }
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setCurrentSkills(currentSkills.filter(s => s.name !== skillToRemove.name));
    };

    const handleSave = () => {
        onSaveSkills({
            teachingSkills,
            learningSkills
        });
        onClose();
    };

    const renderSkillChip = (skill, isSelected) => (
        <TouchableOpacity
            key={skill}
            style={[
                styles.skillChip,
                isSelected && styles.selectedSkillChip
            ]}
            onPress={() => handleSkillToggle(skill)}
        >
            <Text style={[
                styles.skillChipText,
                isSelected && styles.selectedSkillChipText
            ]}>
                {skill}
            </Text>
            {isSelected && (
                <Ionicons name="checkmark" size={16} color="#fff" style={styles.checkIcon} />
            )}
        </TouchableOpacity>
    );

    const renderSelectedSkill = (skill) => (
        <View key={skill.name} style={styles.selectedSkillTag}>
            <Text style={styles.selectedSkillText}>{skill.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                <Ionicons name="close" size={16} color="#666" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'teach' && styles.activeTab]}
                        onPress={() => setActiveTab('teach')}
                    >
                        <Ionicons
                            name="school-outline"
                            size={20}
                            color={activeTab === 'teach' ? '#fff' : '#666'}
                        />
                        <Text style={[
                            styles.tabText,
                            activeTab === 'teach' && styles.activeTabText
                        ]}>
                            I Can Teach ({teachingSkills.length})
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'learn' && styles.activeTab]}
                        onPress={() => setActiveTab('learn')}
                    >
                        <Ionicons
                            name="book-outline"
                            size={20}
                            color={activeTab === 'learn' ? '#fff' : '#666'}
                        />
                        <Text style={[
                            styles.tabText,
                            activeTab === 'learn' && styles.activeTabText
                        ]}>
                            I Want to Learn ({learningSkills.length})
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Selected Skills Display */}
                {currentSkills.length > 0 && (
                    <View style={styles.selectedSkillsContainer}>
                        <Text style={styles.selectedSkillsTitle}>
                            Selected {activeTab === 'teach' ? 'Teaching' : 'Learning'} Skills:
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.selectedSkillsList}>
                                {currentSkills.map(renderSelectedSkill)}
                            </View>
                        </ScrollView>
                    </View>
                )}

                {/* Category Selector */}
                <View style={styles.categoryContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Object.keys(skillCategories).map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.activeCategoryButton
                                ]}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.activeCategoryButtonText
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Skills Grid */}
                <ScrollView style={styles.skillsContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.skillsGrid}>
                        {skillCategories[selectedCategory].map((skill) => {
                            const isSelected = currentSkills.some(s => s.name === skill);
                            return renderSkillChip(skill, isSelected);
                        })}
                    </View>

                    {/* Custom Skill Input */}
                    <View style={styles.customSkillContainer}>
                        <Text style={styles.customSkillTitle}>Add Custom Skill:</Text>
                        <View style={styles.customSkillInput}>
                            <TextInput
                                style={styles.customSkillTextInput}
                                placeholder="Enter custom skill..."
                                value={customSkill}
                                onChangeText={setCustomSkill}
                                placeholderTextColor="#999"
                            />
                            <TouchableOpacity
                                style={styles.addCustomButton}
                                onPress={handleAddCustomSkill}
                                disabled={!customSkill.trim() || currentSkills.length >= 10}
                            >
                                <Ionicons name="add" size={20} color="#4CAF50" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Info */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Select up to 10 skills per category. You can always update these later.
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    closeButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
    },
    activeTab: {
        backgroundColor: '#4CAF50',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginLeft: 8,
    },
    activeTabText: {
        color: '#fff',
    },
    selectedSkillsContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedSkillsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    selectedSkillsList: {
        flexDirection: 'row',
    },
    selectedSkillTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
    },
    selectedSkillText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        marginRight: 6,
    },
    categoryContainer: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    activeCategoryButton: {
        backgroundColor: '#4CAF50',
    },
    categoryButtonText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeCategoryButtonText: {
        color: '#fff',
    },
    skillsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedSkillChip: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    skillChipText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    selectedSkillChipText: {
        color: '#fff',
    },
    checkIcon: {
        marginLeft: 4,
    },
    customSkillContainer: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    customSkillTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    customSkillInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    customSkillTextInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    addCustomButton: {
        padding: 8,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});