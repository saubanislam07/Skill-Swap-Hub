import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getAvatarByName, getFallbackAvatar } from '../utils/avatars';

const Avatar = ({
    user,
    name,
    size = 50,
    gender = null,
    style = {},
    showOnlineStatus = false,
    isOnline = false
}) => {
    const avatarSize = { width: size, height: size, borderRadius: size / 2 };

    // Get avatar URL
    let avatarUrl = null;
    if (user?.avatar && user.avatar.startsWith('http')) {
        avatarUrl = user.avatar;
    } else if (name) {
        avatarUrl = getAvatarByName(name, gender);
    }

    // Fallback to initials
    const fallback = getFallbackAvatar(user?.name || name);

    return (
        <View style={[styles.container, style]}>
            {avatarUrl ? (
                <Image
                    source={{ uri: avatarUrl }}
                    style={[styles.avatar, avatarSize]}
                    onError={() => {
                        // If image fails to load, we'll show initials
                    }}
                />
            ) : (
                <View style={[styles.initialsAvatar, avatarSize, { backgroundColor: fallback.backgroundColor }]}>
                    <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
                        {fallback.initials}
                    </Text>
                </View>
            )}

            {showOnlineStatus && (
                <View style={[
                    styles.onlineIndicator,
                    {
                        width: size * 0.25,
                        height: size * 0.25,
                        borderRadius: size * 0.125,
                        bottom: size * 0.05,
                        right: size * 0.05,
                        backgroundColor: isOnline ? '#4CAF50' : '#999'
                    }
                ]} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    avatar: {
        backgroundColor: '#f0f0f0',
    },
    initialsAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        color: '#fff',
        fontWeight: 'bold',
    },
    onlineIndicator: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff',
    },
});

export default Avatar;