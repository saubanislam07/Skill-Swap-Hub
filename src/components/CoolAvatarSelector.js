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

// Cool and diverse avatar options with modern styles
const coolAvatarOptions = [
    // Modern Male Avatars
    {
        id: 'male_1',
        gender: 'male',
        style: 'modern',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cool_male1&backgroundColor=667eea&clothingColor=262e33&eyebrowType=default&eyeType=happy&facialHairType=blank&hairColor=auburn&mouthType=smile&skinColor=light&topType=shortHairShortFlat&accessoriesType=prescription02',
        name: 'Cool Developer'
    },
    {
        id: 'male_2',
        gender: 'male',
        style: 'trendy',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=trendy_male1&backgroundColor=764ba2&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=wink&facialHairType=beardMedium&hairColor=black&mouthType=smile&skinColor=brown&topType=shortHairShortWaved&accessoriesType=wayfarers',
        name: 'Trendy Artist'
    },
    {
        id: 'male_3',
        gender: 'male',
        style: 'hipster',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hipster_male1&backgroundColor=f093fb&clothingColor=262e33&eyebrowType=raisedExcited&eyeType=default&facialHairType=moustacheFancy&hairColor=brown&mouthType=smile&skinColor=tanned&topType=shortHairShortCurly&accessoriesType=round',
        name: 'Hipster Guru'
    },
    {
        id: 'male_4',
        gender: 'male',
        style: 'tech',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech_male1&backgroundColor=4facfe&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=dark&topType=shortHairDreads01&accessoriesType=prescription01',
        name: 'Tech Ninja'
    },
    {
        id: 'male_5',
        gender: 'male',
        style: 'creative',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative_male1&backgroundColor=00d2ff&clothingColor=ff5722&eyebrowType=default&eyeType=squint&facialHairType=blank&hairColor=blonde&mouthType=smile&skinColor=light&topType=shortHairSides&accessoriesType=sunglasses',
        name: 'Creative Mind'
    },
    {
        id: 'male_6',
        gender: 'male',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pro_male1&backgroundColor=c7ecee&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=goatee&hairColor=brown&mouthType=smile&skinColor=brown&topType=shortHairTheCaesar',
        name: 'Business Pro'
    },
    {
        id: 'male_7',
        gender: 'male',
        style: 'casual',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=casual_male1&backgroundColor=ff9a9e&clothingColor=94d82d&eyebrowType=unibrowNatural&eyeType=default&facialHairType=blank&hairColor=red&mouthType=smile&skinColor=light&topType=shortHairShortRound',
        name: 'Casual Cool'
    },
    {
        id: 'male_8',
        gender: 'male',
        style: 'sporty',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sporty_male1&backgroundColor=feca57&clothingColor=ff6b6b&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=tanned&topType=hat&hatColor=blue01',
        name: 'Sporty Guy'
    },

    // Modern Female Avatars
    {
        id: 'female_1',
        gender: 'female',
        style: 'elegant',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elegant_female1&backgroundColor=667eea&clothingColor=262e33&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=auburn&mouthType=smile&skinColor=light&topType=longHairStraight&accessoriesType=prescription02',
        name: 'Elegant Lady'
    },
    {
        id: 'female_2',
        gender: 'female',
        style: 'trendy',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=trendy_female1&backgroundColor=764ba2&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=wink&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=brown&topType=longHairBigHair&accessoriesType=wayfarers',
        name: 'Trendy Designer'
    },
    {
        id: 'female_3',
        gender: 'female',
        style: 'artistic',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=artistic_female1&backgroundColor=f093fb&clothingColor=ff5722&eyebrowType=raisedExcited&eyeType=happy&facialHairType=blank&hairColor=brown&mouthType=smile&skinColor=tanned&topType=longHairCurly&accessoriesType=round',
        name: 'Artistic Soul'
    },
    {
        id: 'female_4',
        gender: 'female',
        style: 'tech',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech_female1&backgroundColor=4facfe&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=dark&topType=longHairDreads&accessoriesType=prescription01',
        name: 'Tech Queen'
    },
    {
        id: 'female_5',
        gender: 'female',
        style: 'creative',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=creative_female1&backgroundColor=00d2ff&clothingColor=94d82d&eyebrowType=default&eyeType=squint&facialHairType=blank&hairColor=blonde&mouthType=smile&skinColor=light&topType=longHairStraight2&accessoriesType=sunglasses',
        name: 'Creative Genius'
    },
    {
        id: 'female_6',
        gender: 'female',
        style: 'professional',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pro_female1&backgroundColor=c7ecee&clothingColor=3c4f5c&eyebrowType=defaultNatural&eyeType=default&facialHairType=blank&hairColor=brown&mouthType=smile&skinColor=brown&topType=longHairBun',
        name: 'Business Leader'
    },
    {
        id: 'female_7',
        gender: 'female',
        style: 'bohemian',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=boho_female1&backgroundColor=ff9a9e&clothingColor=ff6b6b&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=red&mouthType=smile&skinColor=light&topType=longHairMiaWallace',
        name: 'Bohemian Spirit'
    },
    {
        id: 'female_8',
        gender: 'female',
        style: 'sporty',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sporty_female1&backgroundColor=feca57&clothingColor=3742fa&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=tanned&topType=hijab&hatColor=blue01',
        name: 'Athletic Star'
    },

    // Cool Neutral/Creative Options
    {
        id: 'creative_1',
        gender: 'neutral',
        style: 'futuristic',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=future1&backgroundColor=2ed573&clothingColor=1e3799&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=silverGray&mouthType=smile&skinColor=light&topType=shortHairShortRound&accessoriesType=eyepatch',
        name: 'Future Visionary'
    },
    {
        id: 'creative_2',
        gender: 'neutral',
        style: 'cyberpunk',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cyber1&backgroundColor=ff3838&clothingColor=2f3542&eyebrowType=angryNatural&eyeType=default&facialHairType=blank&hairColor=blue&mouthType=smile&skinColor=brown&topType=shortHairShortFlat&accessoriesType=kurt',
        name: 'Cyber Punk'
    },
    {
        id: 'creative_3',
        gender: 'neutral',
        style: 'retro',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=retro1&backgroundColor=ff6348&clothingColor=ffa502&eyebrowType=default&eyeType=wink&facialHairType=blank&hairColor=pastelPink&mouthType=smile&skinColor=light&topType=winterHat01&hatColor=red',
        name: 'Retro Vibes'
    },
    {
        id: 'creative_4',
        gender: 'neutral',
        style: 'minimalist',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minimal1&backgroundColor=a4b0be&clothingColor=57606f&eyebrowType=flatNatural&eyeType=default&facialHairType=blank&hairColor=brown&mouthType=serious&skinColor=light&topType=shortHairShortFlat',
        name: 'Minimalist'
    },
    {
        id: 'creative_5',
        gender: 'neutral',
        style: 'colorful',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=colorful1&backgroundColor=ff4757&clothingColor=00cec9&eyebrowType=raisedExcited&eyeType=hearts&facialHairType=blank&hairColor=platinum&mouthType=smile&skinColor=tanned&topType=turban&hatColor=pink',
        name: 'Colorful Creator'
    },
    {
        id: 'creative_6',
        gender: 'neutral',
        style: 'mystical',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mystical1&backgroundColor=6c5ce7&clothingColor=2d3436&eyebrowType=default&eyeType=surprised&facialHairType=blank&hairColor=auburn&mouthType=smile&skinColor=dark&topType=winterHat02&hatColor=black',
        name: 'Mystical Being'
    },

    // Fun & Quirky Options
    {
        id: 'fun_1',
        gender: 'neutral',
        style: 'gamer',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer1&backgroundColor=00b894&clothingColor=e17055&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=black&mouthType=smile&skinColor=light&topType=shortHairShortFlat&accessoriesType=prescription02',
        name: 'Pro Gamer'
    },
    {
        id: 'fun_2',
        gender: 'neutral',
        style: 'musician',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=musician1&backgroundColor=fd79a8&clothingColor=2d3436&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=red&mouthType=smile&skinColor=brown&topType=shortHairDreads02&accessoriesType=sunglasses',
        name: 'Music Maker'
    },
    {
        id: 'fun_3',
        gender: 'neutral',
        style: 'explorer',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=explorer1&backgroundColor=fdcb6e&clothingColor=6c5ce7&eyebrowType=default&eyeType=default&facialHairType=blank&hairColor=brown&mouthType=smile&skinColor=tanned&topType=hat&hatColor=gray01',
        name: 'World Explorer'
    },
    {
        id: 'fun_4',
        gender: 'neutral',
        style: 'chef',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef1&backgroundColor=e84393&clothingColor=ffffff&eyebrowType=default&eyeType=happy&facialHairType=moustacheMagnum&hairColor=black&mouthType=smile&skinColor=light&topType=hat&hatColor=white',
        name: 'Master Chef'
    }
];

export default function CoolAvatarSelector({
    visible,
    onClose,
    onSelectAvatar,
    currentAvatar,
    title = "Choose Your Cool Avatar"
}) {
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
    const [filterGender, setFilterGender] = useState('all');

    const filteredAvatars = coolAvatarOptions.filter(avatar => {
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
                <View style={[styles.styleBadge, { backgroundColor: getStyleColor(avatar.style) }]}>
                    <Text style={styles.styleBadgeText}>{avatar.style}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const getStyleColor = (style) => {
        const colors = {
            modern: '#667eea',
            trendy: '#764ba2',
            hipster: '#f093fb',
            tech: '#4facfe',
            creative: '#00d2ff',
            professional: '#c7ecee',
            casual: '#ff9a9e',
            sporty: '#feca57',
            elegant: '#667eea',
            artistic: '#f093fb',
            bohemian: '#ff9a9e',
            futuristic: '#2ed573',
            cyberpunk: '#ff3838',
            retro: '#ff6348',
            minimalist: '#a4b0be',
            colorful: '#ff4757',
            mystical: '#6c5ce7',
            gamer: '#00b894',
            musician: '#fd79a8',
            explorer: '#fdcb6e',
            chef: '#e84393'
        };
        return colors[style] || '#4CAF50';
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
                                All ({coolAvatarOptions.length})
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
                                Male (8)
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
                                Female (8)
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
                                Creative (10)
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
                            <View style={styles.previewInfo}>
                                <Text style={styles.previewAvatarName}>{selectedAvatar.name}</Text>
                                <View style={[styles.previewStyleBadge, { backgroundColor: getStyleColor(selectedAvatar.style) }]}>
                                    <Text style={styles.previewStyleText}>{selectedAvatar.style}</Text>
                                </View>
                            </View>
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
        marginBottom: 25,
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
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 4,
    },
    selectedAvatarName: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    styleBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    styleBadgeText: {
        fontSize: 9,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    previewContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    previewAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewAvatarImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    previewInfo: {
        alignItems: 'flex-start',
    },
    previewAvatarName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        marginBottom: 4,
    },
    previewStyleBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    previewStyleText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
});