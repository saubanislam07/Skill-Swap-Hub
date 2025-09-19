import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/Avatar';

const categories = [
  { name: 'Music', icon: '🎸', color: '#FFE4E1', count: 45 },
  { name: 'Cooking', icon: '🍳', color: '#FFF8DC', count: 32 },
  { name: 'Fitness', icon: '💪', color: '#E0F6FF', count: 28 },
  { name: 'Languages', icon: '🌍', color: '#E8F5E8', count: 67 },
  { name: 'Tech', icon: '💻', color: '#E6E6FA', count: 89 },
  { name: 'Arts', icon: '🎨', color: '#FFE4E1', count: 23 },
];

const quickActions = [
  { id: 1, title: 'Post Skill', icon: 'add-circle', color: '#4CAF50' },
  { id: 2, title: 'Find Teacher', icon: 'search', color: '#2196F3' },
  { id: 3, title: 'My Swaps', icon: 'swap-horizontal', color: '#FF9800' },
  { id: 4, title: 'Messages', icon: 'chatbubble', color: '#9C27B0' },
];

const featuredSwaps = [
  {
    id: 1,
    title: 'Guitar Lessons for Cooking Classes',
    teacher: 'Fatima Rahman',
    teacherSkill: 'Guitar',
    wantedSkill: 'Cooking',
    rating: 4.8,
    reviews: 23,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop&crop=center',
    badge: 'Popular',
    badgeColor: '#FF6B6B'
  },
  {
    id: 2,
    title: 'Web Development for Photography',
    teacher: 'Arif Hassan',
    teacherSkill: 'Web Development',
    wantedSkill: 'Photography',
    rating: 4.9,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center',
    badge: 'New',
    badgeColor: '#4CAF50'
  },
  {
    id: 3,
    title: 'Bengali Language for Yoga Classes',
    teacher: 'Nadia Ahmed',
    teacherSkill: 'Bengali',
    wantedSkill: 'Yoga',
    rating: 4.7,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop&crop=center',
    badge: 'Trending',
    badgeColor: '#FF9800'
  },
  {
    id: 4,
    title: 'Fitness Training for Art Classes',
    teacher: 'Karim Khan',
    teacherSkill: 'Fitness',
    wantedSkill: 'Digital Art',
    rating: 4.6,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&crop=center',
    badge: 'Hot',
    badgeColor: '#E91E63'
  },
  {
    id: 5,
    title: 'Cooking Classes for English Lessons',
    teacher: 'Rashida Begum',
    teacherSkill: 'Traditional Cooking',
    wantedSkill: 'English',
    rating: 4.9,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&crop=center',
    badge: 'Featured',
    badgeColor: '#9C27B0'
  }
];

const nearbyUsers = [
  {
    id: 1,
    name: 'Rashida Begum',
    skill: 'Cooking',
    distance: '0.5 km',
    rating: 4.9,
    gender: 'female',
    online: true
  },
  {
    id: 2,
    name: 'Karim Khan',
    skill: 'Photography',
    distance: '1.2 km',
    rating: 4.7,
    gender: 'male',
    online: false
  },
  {
    id: 3,
    name: 'Fatima Rahman',
    skill: 'Guitar Teaching',
    distance: '0.8 km',
    rating: 4.8,
    gender: 'female',
    online: true
  },
  {
    id: 4,
    name: 'Arif Hassan',
    skill: 'Web Development',
    distance: '1.5 km',
    rating: 4.9,
    gender: 'male',
    online: true
  }
];

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickAction = (action) => {
    switch (action.title) {
      case 'Post Skill':
        Alert.alert('Coming Soon', 'Skill posting will be available soon!');
        break;
      case 'Find Teacher':
        navigation?.navigate('Explore');
        break;
      case 'My Swaps':
        Alert.alert('Coming Soon', 'Swap management will be available soon!');
        break;
      case 'Messages':
        navigation?.navigate('Messages');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header with Welcome */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name?.split(' ')[0] || 'Sauban'}! 👋</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Enhanced Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search skills, people, or categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Community Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Active Skills</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Successful Swaps</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>234</Text>
          <Text style={styles.statLabel}>Community Members</Text>
        </View>
      </View>

      {/* Enhanced Categories */}
      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count} skills</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Swaps Carousel */}
      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Swaps</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredSwaps}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.featuredSwapCard}
              onPress={() => navigation?.navigate('FeaturedSwapDetail', { swap: item })}
            >
              <Image source={{ uri: item.image }} style={styles.featuredSwapImage} />
              <View style={styles.featuredSwapBadge}>
                <Text style={[styles.badgeText, { backgroundColor: item.badgeColor }]}>
                  {item.badge}
                </Text>
              </View>
              <View style={styles.featuredSwapContent}>
                <Text style={styles.featuredSwapTitle}>{item.title}</Text>
                <Text style={styles.featuredSwapTeacher}>by {item.teacher}</Text>
                <View style={styles.featuredSwapMeta}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                </View>
                <Text style={styles.swapDetails}>
                  {item.teacherSkill} ↔ {item.wantedSkill}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredSwapsList}
        />
      </View>

      {/* Nearby Users */}
      <View style={styles.nearbySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Skill Swappers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View Map</Text>
          </TouchableOpacity>
        </View>
        {nearbyUsers.map((nearbyUser) => (
          <TouchableOpacity key={nearbyUser.id} style={styles.nearbyUserCard}>
            <View style={styles.nearbyUserInfo}>
              <Avatar
                name={nearbyUser.name}
                gender={nearbyUser.gender}
                size={50}
                showOnlineStatus={true}
                isOnline={nearbyUser.online}
              />
              <View style={styles.nearbyUserDetails}>
                <Text style={styles.nearbyUserName}>{nearbyUser.name}</Text>
                <Text style={styles.nearbyUserSkill}>{nearbyUser.skill}</Text>
                <View style={styles.nearbyUserMeta}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.nearbyUserRating}>{nearbyUser.rating}</Text>
                  <Text style={styles.nearbyUserDistance}>• {nearbyUser.distance}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Search Section
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },

  // Quick Actions Section
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  // Stats Section
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },

  // Section Headers
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Categories Section
  categoriesSection: {
    marginBottom: 30,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    marginRight: '3.33%',
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },

  // Featured Swaps Section
  featuredSection: {
    marginBottom: 30,
  },
  featuredSwapsList: {
    paddingLeft: 20,
  },
  featuredSwapCard: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredSwapImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  featuredSwapBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  featuredSwapContent: {
    padding: 18,
  },
  featuredSwapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  featuredSwapTeacher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  featuredSwapMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  swapDetails: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Nearby Users Section
  nearbySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  nearbyUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nearbyUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nearbyUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  nearbyUserAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nearbyUserDetails: {
    flex: 1,
  },
  nearbyUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  nearbyUserSkill: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  nearbyUserMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyUserRating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  nearbyUserDistance: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 30,
  },
});