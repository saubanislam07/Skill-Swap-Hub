import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/Avatar';
import AvatarSelector from '../components/AvatarSelector';
import SkillsSelector from '../components/SkillsSelector';
import { getAvatarByName } from '../utils/avatars';

const achievements = [
  { name: 'First Swap', description: 'Completed your first skill exchange', icon: '🔄', earned: true },
  { name: '10 Successful Trades', description: 'Successfully completed 10 trades', icon: '🏆', earned: true },
  { name: 'Community Mentor', description: 'Mentored 5 new members', icon: '👥', earned: true },
  { name: 'Top Rated', description: 'Consistently high ratings', icon: '⭐', earned: true },
  { name: 'Helpful Swapper', description: 'Provided helpful advice', icon: '❤️', earned: false },
  { name: 'Skill Master', description: 'Mastered a new skill', icon: '🛡️', earned: false },
];

const teachingSkills = [
  { name: 'Guitar', color: '#FFE4E1' },
  { name: 'Drawing', color: '#E8F5E8' },
  { name: 'Yoga', color: '#FFE4E1' },
];

const learningSkills = [
  { name: 'Cooking', color: '#FFF8DC' },
  { name: 'English', color: '#E0F6FF' },
  { name: 'Coding', color: '#E6E6FA' },
];

export default function ProfileScreen({ navigation }) {
  const { logout, user } = useAuth();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showSkillsSelector, setShowSkillsSelector] = useState(false);
  const [userTeachingSkills, setUserTeachingSkills] = useState(teachingSkills);
  const [userLearningSkills, setUserLearningSkills] = useState(learningSkills);

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

  const handleAvatarUpdate = async (avatar) => {
    try {
      console.log('Updating avatar:', avatar);
      setSelectedAvatar(avatar);

      // TODO: Update user avatar in backend
      // await api.updateProfile({ avatar: avatar.url });

      Alert.alert(
        'Avatar Updated',
        `Your profile avatar has been updated to "${avatar.name}"!`,
        [{ text: 'OK', style: 'default' }]
      );
    } catch (error) {
      console.error('Avatar update error:', error);
      Alert.alert('Update Failed', 'Failed to update avatar. Please try again.');
    }
  };

  const handleSkillsUpdate = (skills) => {
    setUserTeachingSkills(skills.teachingSkills.map(skill => ({
      name: skill.name,
      color: '#4CAF50'
    })));
    setUserLearningSkills(skills.learningSkills.map(skill => ({
      name: skill.name,
      color: '#2196F3'
    })));
    Alert.alert('Skills Updated', 'Your skills have been updated successfully!');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => setShowAvatarSelector(true)}
        >
          {selectedAvatar ? (
            <Image
              source={{ uri: selectedAvatar.url }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <Avatar
              user={user}
              name={user?.name || 'Sauban Islam'}
              size={120}
              gender={user?.gender || 'male'}
            />
          )}
          <View style={styles.editAvatarOverlay}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{user?.name || 'Sauban Islam'}</Text>
        <TouchableOpacity
          style={styles.avatarEditHint}
          onPress={() => setShowAvatarSelector(true)}
        >
          <Ionicons name="camera-outline" size={14} color="#4CAF50" />
          <Text style={styles.avatarEditText}>
            {selectedAvatar ? 'Change avatar' : 'Tap to select avatar'}
          </Text>
        </TouchableOpacity>
        {selectedAvatar && (
          <View style={styles.avatarStatusContainer}>
            <View style={styles.avatarStatus}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.avatarStatusText}>Custom avatar selected</Text>
            </View>
            <TouchableOpacity
              style={styles.resetAvatarButton}
              onPress={() => {
                setSelectedAvatar(null);
                Alert.alert('Avatar Reset', 'Avatar has been reset to default.');
              }}
            >
              <Text style={styles.resetAvatarText}>Reset to default</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>4.8 (125 reviews)</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.levelBadge}>Level 3</Text>
          <Text style={styles.points}>2500 Points</Text>
        </View>
      </View>

      <View style={styles.skillsSection}>
        <View style={styles.skillsHeader}>
          <Text style={styles.sectionTitle}>My Skills</Text>
          <TouchableOpacity
            style={styles.editSkillsButton}
            onPress={() => setShowSkillsSelector(true)}
          >
            <Ionicons name="pencil" size={16} color="#4CAF50" />
            <Text style={styles.editSkillsText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.skillsSubtitle}>I Can Teach</Text>
        <View style={styles.skillsContainer}>
          {userTeachingSkills.map((skill, index) => (
            <View key={index} style={[styles.skillTag, { backgroundColor: skill.color }]}>
              <Text style={styles.skillText}>{skill.name}</Text>
            </View>
          ))}
          {userTeachingSkills.length === 0 && (
            <Text style={styles.noSkillsText}>No teaching skills added yet</Text>
          )}
        </View>

        <Text style={styles.skillsSubtitle}>I Want to Learn</Text>
        <View style={styles.skillsContainer}>
          {userLearningSkills.map((skill, index) => (
            <View key={index} style={[styles.skillTag, { backgroundColor: skill.color }]}>
              <Text style={styles.skillText}>{skill.name}</Text>
            </View>
          ))}
          {userLearningSkills.length === 0 && (
            <Text style={styles.noSkillsText}>No learning skills added yet</Text>
          )}
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgesGrid}>
          {achievements.map((achievement, index) => (
            <View key={index} style={[styles.badgeCard, !achievement.earned && styles.lockedBadge]}>
              <Text style={styles.badgeIcon}>{achievement.icon}</Text>
              <Text style={[styles.badgeName, !achievement.earned && styles.lockedText]}>
                {achievement.name}
              </Text>
              <Text style={[styles.badgeDescription, !achievement.earned && styles.lockedText]}>
                {achievement.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.experienceContainer}>
          <Text style={styles.experienceLabel}>Experience Level</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.experienceLabels}>
            <Text style={styles.experienceText}>Beginner</Text>
            <Text style={styles.experienceText}>Mentor</Text>
          </View>
        </View>
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FF6B6B" />
        </TouchableOpacity>

        <Text style={styles.logoutSubtext}>
          You'll need to sign in again to access your account
        </Text>
      </View>

      {/* Avatar Selector Modal */}
      <AvatarSelector
        visible={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        onSelectAvatar={handleAvatarUpdate}
        currentAvatar={selectedAvatar}
        title="Choose Your Profile Avatar"
      />

      {/* Skills Selector Modal */}
      <SkillsSelector
        visible={showSkillsSelector}
        onClose={() => setShowSkillsSelector(false)}
        onSaveSkills={handleSkillsUpdate}
        initialTeachingSkills={userTeachingSkills.map(skill => ({ name: skill.name, category: 'Current' }))}
        initialLearningSkills={userLearningSkills.map(skill => ({ name: skill.name, category: 'Current' }))}
        title="Update Your Skills"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
    marginRight: 8,
  },
  logoutButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editAvatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  avatarEditHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 12,
  },
  avatarEditText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  avatarStatusContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarStatusText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  resetAvatarButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resetAvatarText: {
    fontSize: 10,
    color: '#666',
    textDecorationLine: 'underline',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  points: {
    fontSize: 14,
    color: '#666',
  },
  skillsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editSkillsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  editSkillsText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  skillsSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  skillTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  noSkillsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  lockedText: {
    color: '#999',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  experienceContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
  },
  experienceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    width: '65%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  experienceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  experienceText: {
    fontSize: 12,
    color: '#666',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  logoutCard: {
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
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 12,
  },
  logoutSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});