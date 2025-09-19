import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';

const skillListings = [
  {
    id: 1,
    user: 'Fatima Rahman',
    skill: 'Guitar Lessons',
    wantsToLearn: 'Cooking',
    rating: 4.8,
    reviews: 23,
    distance: '0.5 km',
    category: 'Music',
    gender: 'female',
  },
  {
    id: 2,
    user: 'Arif Hassan',
    skill: 'Web Development',
    wantsToLearn: 'Photography',
    rating: 4.9,
    reviews: 15,
    distance: '1.2 km',
    category: 'Tech',
    gender: 'male',
  },
  {
    id: 3,
    user: 'Nadia Ahmed',
    skill: 'Yoga Classes',
    wantsToLearn: 'Bengali',
    rating: 4.7,
    reviews: 31,
    distance: '0.8 km',
    category: 'Fitness',
    gender: 'female',
  },
];

const categories = ['All', 'Music', 'Tech', 'Fitness', 'Cooking', 'Languages', 'Arts'];

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const renderSkillCard = ({ item }) => (
    <TouchableOpacity style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <View style={styles.userInfo}>
          <Avatar
            name={item.user}
            gender={item.gender}
            size={40}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={styles.userName}>{item.user}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
            </View>
          </View>
        </View>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>

      <View style={styles.skillContent}>
        <Text style={styles.skillTitle}>Teaches: {item.skill}</Text>
        <Text style={styles.wantsToLearn}>Wants to learn: {item.wantsToLearn}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Skills</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search skills or people..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.selectedCategoryButtonText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={skillListings}
        renderItem={renderSkillCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.skillsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  skillsList: {
    paddingHorizontal: 20,
  },
  skillCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: '#666',
  },
  skillContent: {
    marginBottom: 15,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  wantsToLearn: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});