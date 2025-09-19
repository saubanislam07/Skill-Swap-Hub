import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Professional avatar options with diverse representation
const avatarOptions = [
    // Male Professional Avatars
    {
        id: 'male_1',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male1&backgroundColor=b6e3f4&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=auburn&hatColor=black&mouthType=smile&skinColor=light&topType=shortHairShortFlat',
        name: 'Professional Male 1'
    },
    {
        id: 'male_2',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male2&backgroundColor=c0aede&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=brown&topType=shortHairShortWaved',
        name: 'Professional Male 2'
    },
    {
        id: 'male_3',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male3&backgroundColor=ffdfbf&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=moustacheFancy&hairColor=brown&mouthType=smile&skinColor=tanned&topType=shortHairShortCurly',
        name: 'Professional Male 3'
    },
    {
        id: 'male_4',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male4&backgroundColor=d1d4f9&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=dark&topType=shortHairDreads01',
        name: 'Professional Male 4'
    },
    {
        id: 'male_5',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male5&backgroundColor=ffd5dc&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=blonde&mouthType=smile&skinColor=light&topType=shortHairSides',
        name: 'Professional Male 5'
    },
    {
        id: 'male_6',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male6&backgroundColor=c7ecee&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=goatee&hairColor=brown&mouthType=smile&skinColor=brown&topType=shortHairTheCaesar',
        name: 'Professional Male 6'
    },

    // Female Professional Avatars
    {
        id: 'female_1',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female1&backgroundColor=b6e3f4&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=auburn&mouthType=smile&skinColor=light&topType=longHairStraight',
        name: 'Professional Female 1'
    },
    {
        id: 'female_2',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female2&backgroundColor=c0aede&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=brown&topType=longHairBigHair',
        name: 'Professional Female 2'
    },
    {
        id: 'female_3',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female3&backgroundColor=ffdfbf&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=brown&mouthType=smile&skinColor=tanned&topType=longHairCurly',
        name: 'Professional Female 3'
    },
    {
        id: 'female_4',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female4&backgroundColor=d1d4f9&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=dark&topType=longHairDreads',
        name: 'Professional Female 4'
    },
    {
        id: 'female_5',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female5&backgroundColor=ffd5dc&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=blonde&mouthType=smile&skinColor=light&topType=longHairStraight2',
        name: 'Professional Female 5'
    },
    {
        id: 'female_6',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female6&backgroundColor=c7ecee&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=brown&mouthType=smile&skinColor=brown&topType=longHairBun',
        name: 'Professional Female 6'
    },

    // Neutral/Creative Options
    {
        id: 'creative_1',
        gender: 'neutral',
        style: 'creative',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative1&backgroundColor=b6e3f4&clothingColor=94d82d&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=red&mouthType=smile&skinColor=light&topType=shortHairShortRound',
        name: 'Creative Style 1'
    },
    {
        id: 'creative_2',
        gender: 'neutral',
        style: 'creative',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative2&backgroundColor=c0aede&clothingColor=ff5c5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=blue&mouthType=smile&skinColor=brown&topType=shortHairShortFlat',
        name: 'Creative Style 2'
    },
];

export default function AvatarSelector({
    visible,
    onClose,
    onSelectAvatar,
    currentAvatar,
    title = "Choose Your Avatar"
}) {
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
    const [filterGender, setFilterGender] = useState('all');

    const filteredAvatars = avatarOptions.filter(avatar => {
        if (filterGender === 'all') return true;
        return avatar.gender === filterGender;
    });

    const handleSelectAvatar = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleConfirmSelection = () => {
        if (selectedAvatar) {
            onSelectAvatar(selectedAvatar);
            onClose();
        }
    };

    const renderAvatar = (avatar) => {
        const isSelected = selectedAvatar?.id === avatar.id;

        return (
            <TouchableOpacity
                key={avatar.id}
                style={[
                    styles.avatarOption,
                    isSelected && styles.selectedAvatarOption
                ]}
                onPress={() => handleSelectAvatar(avatar)}
            >
                <View style={[
                    styles.avatarContainer,
                    isSelected && styles.selectedAvatarContainer
                ]}>
                    <Image
                        source={{ uri: avatar.url }}
                        style={styles.avatarImage}
                        resizeMode="contain"
                    />
                    {isSelected && (
                        <View style={styles.selectedIndicator}>
                            <Ionicons name="checkmark" size={16} color="#fff" />
                        </View>
                    )}
                </View>
                <Text style={[
                    styles.avatarName,
                    isSelected && styles.selectedAvatarName
                ]}>
                    {avatar.name}
                </Text>
            </TouchableOpacity>
        );
    };

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
                    <TouchableOpacity
                        onPress={handleConfirmSelection}
                        style={[
                            styles.confirmButton,
                            !selectedAvatar && styles.confirmButtonDisabled
                        ]}
                        disabled={!selectedAvatar}
                    >
                        <Text style={[
                            styles.confirmButtonText,
                            !selectedAvatar && styles.confirmButtonTextDisabled
                        ]}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Buttons */}
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filterGender === 'all' && styles.activeFilterButton
                            ]}
                            onPress={() => setFilterGender('all')}
                        >
                            <Text style={[
                                styles.filterButtonText,
                                filterGender === 'all' && styles.activeFilterButtonText
                            ]}>
                                All
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filterGender === 'male' && styles.activeFilterButton
                            ]}
                            onPress={() => setFilterGender('male')}
                        >
                            <Text style={[
                                styles.filterButtonText,
                                filterGender === 'male' && styles.activeFilterButtonText
                            ]}>
                                Male
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filterGender === 'female' && styles.activeFilterButton
                            ]}
                            onPress={() => setFilterGender('female')}
                        >
                            <Text style={[
                                styles.filterButtonText,
                                filterGender === 'female' && styles.activeFilterButtonText
                            ]}>
                                Female
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                filterGender === 'neutral' && styles.activeFilterButton
                            ]}
                            onPress={() => setFilterGender('neutral')}
                        >
                            <Text style={[
                                styles.filterButtonText,
                                filterGender === 'neutral' && styles.activeFilterButtonText
                            ]}>
                                Creative
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Avatar Grid */}
                <ScrollView style={styles.avatarGrid} showsVerticalScrollIndicator={false}>
                    <View style={styles.avatarRow}>
                        {filteredAvatars.map(renderAvatar)}
                    </View>
                </ScrollView>

                {/* Selected Avatar Preview */}
                {selectedAvatar && (
                    <View style={styles.previewContainer}>
                        <Text style={styles.previewTitle}>Selected Avatar:</Text>
                        <View style={styles.previewAvatar}>
                            <Image
                                source={{ uri: selectedAvatar.url }}
                                style={styles.previewAvatarImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.previewAvatarName}>{selectedAvatar.name}</Text>
                        </View>
                    </View>
                )}
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
    confirmButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    confirmButtonDisabled: {
        backgroundColor: '#ccc',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    confirmButtonTextDisabled: {
        color: '#999',
    },
    filterContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    activeFilterButton: {
        backgroundColor: '#4CAF50',
    },
    filterButtonText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeFilterButtonText: {
        color: '#fff',
    },
    avatarGrid: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    avatarRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    avatarOption: {
        width: (width - 60) / 3,
        marginBottom: 20,
        alignItems: 'center',
    },
    selectedAvatarOption: {
        transform: [{ scale: 1.05 }],
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    selectedAvatarContainer: {
        borderWidth: 3,
        borderColor: '#4CAF50',
        shadowColor: '#4CAF50',
        shadowOpacity: 0.3,
    },
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    selectedIndicator: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarName: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    selectedAvatarName: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    previewContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        alignItems: 'center',
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    previewAvatar: {
        alignItems: 'center',
    },
    previewAvatarImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
    },
    previewAvatarName: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
});