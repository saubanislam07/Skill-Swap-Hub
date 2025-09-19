import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen({ navigation }) {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        }
                    },
                },
            ]
        );
    };

    const settingsOptions = [
        {
            id: 1,
            title: 'Edit Profile',
            icon: 'person-outline',
            color: '#4CAF50',
            onPress: () => Alert.alert('Coming Soon', 'Profile editing will be available soon!'),
        },
        {
            id: 2,
            title: 'Notifications',
            icon: 'notifications-outline',
            color: '#2196F3',
            onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon!'),
        },
        {
            id: 3,
            title: 'Privacy & Security',
            icon: 'shield-outline',
            color: '#FF9800',
            onPress: () => Alert.alert('Coming Soon', 'Privacy settings will be available soon!'),
        },
        {
            id: 4,
            title: 'Help & Support',
            icon: 'help-circle-outline',
            color: '#9C27B0',
            onPress: () => Alert.alert('Help', 'Contact us at support@skillswaphub.com'),
        },
        {
            id: 5,
            title: 'About',
            icon: 'information-circle-outline',
            color: '#607D8B',
            onPress: () => Alert.alert('About', 'Skill Swap Hub v1.0.0\nTrade skills, not money!'),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content}>
                {/* User Info Section */}
                <View style={styles.userSection}>
                    <View style={styles.userAvatar}>
                        <Text style={styles.userAvatarText}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                        </Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.name || 'Sauban Islam'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'sauban@example.com'}</Text>
                    </View>
                </View>

                {/* Settings Options */}
                <View style={styles.settingsSection}>
                    {settingsOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.settingItem}
                            onPress={option.onPress}
                        >
                            <View style={styles.settingLeft}>
                                <View style={[styles.settingIcon, { backgroundColor: `${option.color}20` }]}>
                                    <Ionicons name={option.icon} size={20} color={option.color} />
                                </View>
                                <Text style={styles.settingTitle}>{option.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Section */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <View style={styles.logoutLeft}>
                            <View style={styles.logoutIcon}>
                                <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                            </View>
                            <Text style={styles.logoutText}>Logout</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#FF6B6B" />
                    </TouchableOpacity>
                    <Text style={styles.logoutSubtext}>
                        You'll need to sign in again to access your account
                    </Text>
                </View>

                {/* App Version */}
                <View style={styles.versionSection}>
                    <Text style={styles.versionText}>Skill Swap Hub v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        marginBottom: 20,
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    userAvatarText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    settingsSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    settingTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    logoutSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF5F5',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FFE4E4',
        marginBottom: 10,
    },
    logoutLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFE4E4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    logoutSubtext: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    versionSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    versionText: {
        fontSize: 12,
        color: '#999',
    },
});