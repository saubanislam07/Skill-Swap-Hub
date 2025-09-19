import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';

const conversations = [
  {
    id: 1,
    name: 'Rafiq Ahmed',
    lastMessage: 'Great! See you then. I\'ll bring my guitar.',
    time: '2m ago',
    unread: false,
    gender: 'male',
    skill: 'Guitar ↔ Cooking',
  },
  {
    id: 2,
    name: 'Rashida Begum',
    lastMessage: 'When would be a good time for our first session?',
    time: '1h ago',
    unread: true,
    gender: 'female',
    skill: 'Bengali ↔ Photography',
  },
  {
    id: 3,
    name: 'Karim Khan',
    lastMessage: 'Thanks for the coding tips! Ready for yoga tomorrow?',
    time: '3h ago',
    unread: false,
    gender: 'male',
    skill: 'Web Dev ↔ Yoga',
  },
  {
    id: 4,
    name: 'Fatima Rahman',
    lastMessage: 'Looking forward to our guitar lesson!',
    time: '5h ago',
    unread: false,
    gender: 'female',
    skill: 'Guitar ↔ Cooking',
  },
];

export default function MessagesScreen() {
  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversationCard}>
      <View style={styles.avatarContainer}>
        <Avatar
          name={item.name}
          gender={item.gender}
          size={50}
        />
        {item.unread && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.skillBadge}>{item.skill}</Text>
        <Text style={[styles.lastMessage, item.unread && styles.unreadMessage]}>
          {item.lastMessage}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id.toString()}
        style={styles.conversationsList}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  newMessageButton: {
    padding: 8,
  },
  conversationsList: {
    paddingHorizontal: 20,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadAvatar: {
    backgroundColor: '#FF6B6B',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  skillBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#333',
  },
});