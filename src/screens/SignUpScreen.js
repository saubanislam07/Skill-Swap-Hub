import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import CoolAvatarSelector from '../components/CoolAvatarSelector';
import SkillsSelector from '../components/SkillsSelector';

export default function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [teachingSkills, setTeachingSkills] = useState([]);
  const [learningSkills, setLearningSkills] = useState([]);
  const [showSkillsSelector, setShowSkillsSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: selectedAvatar?.url || '',
        skillsToTeach: teachingSkills,
        skillsToLearn: learningSkills,
      });
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    Alert.alert('Coming Soon', 'Google signup will be available soon!');
  };

  const handleFacebookSignUp = () => {
    Alert.alert('Coming Soon', 'Facebook signup will be available soon!');
  };

  const handleSkillsUpdate = (skills) => {
    setTeachingSkills(skills.teachingSkills);
    setLearningSkills(skills.learningSkills);
  };

  const getAvatarStyleColor = (style) => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Join Skill Swap Hub</Text>
          <Text style={styles.subtitle}>Start trading skills with your community</Text>
        </View>

        {/* Enhanced Avatar Selection */}
        <View style={styles.avatarSection}>
          <Text style={styles.avatarLabel}>Choose Your Cool Avatar</Text>
          <Text style={styles.avatarSubtitle}>Pick from 26+ awesome styles!</Text>
          <TouchableOpacity
            style={styles.avatarSelector}
            onPress={() => setShowAvatarSelector(true)}
          >
            {selectedAvatar ? (
              <View style={styles.selectedAvatarWrapper}>
                <Image
                  source={{ uri: selectedAvatar.url }}
                  style={styles.selectedAvatarImage}
                  resizeMode="contain"
                />
                <View style={[styles.avatarStyleBadge, { backgroundColor: getAvatarStyleColor(selectedAvatar.style) }]}>
                  <Text style={styles.avatarStyleText}>{selectedAvatar.style}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.defaultAvatarContainer}>
                <Ionicons name="person-add" size={40} color="#666" />
                <Text style={styles.defaultAvatarText}>Tap to browse</Text>
              </View>
            )}
            <View style={styles.avatarSelectorOverlay}>
              <Ionicons name="sparkles" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>
            {selectedAvatar ? `${selectedAvatar.name} - ${selectedAvatar.style}` : 'Choose from Modern, Tech, Creative & more!'}
          </Text>
        </View>

        {/* Social Sign Up */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookSignUp}>
            <Ionicons name="logo-facebook" size={20} color="#fff" />
            <Text style={styles.facebookButtonText}>Sign up with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Skills Selection */}
        <View style={styles.skillsSection}>
          <Text style={styles.skillsLabel}>Your Skills</Text>
          <TouchableOpacity
            style={styles.skillsSelector}
            onPress={() => setShowSkillsSelector(true)}
          >
            <View style={styles.skillsSelectorContent}>
              <Ionicons name="school-outline" size={24} color="#4CAF50" />
              <View style={styles.skillsInfo}>
                <Text style={styles.skillsTitle}>Select Your Skills</Text>
                <Text style={styles.skillsSubtitle}>
                  {teachingSkills.length > 0 || learningSkills.length > 0
                    ? `${teachingSkills.length} to teach, ${learningSkills.length} to learn`
                    : 'What can you teach? What do you want to learn?'
                  }
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
          </TouchableOpacity>

          {/* Skills Preview */}
          {(teachingSkills.length > 0 || learningSkills.length > 0) && (
            <View style={styles.skillsPreview}>
              {teachingSkills.length > 0 && (
                <View style={styles.skillsPreviewSection}>
                  <Text style={styles.skillsPreviewTitle}>Teaching:</Text>
                  <View style={styles.skillsPreviewList}>
                    {teachingSkills.slice(0, 3).map((skill, index) => (
                      <View key={index} style={styles.skillPreviewTag}>
                        <Text style={styles.skillPreviewText}>{skill.name}</Text>
                      </View>
                    ))}
                    {teachingSkills.length > 3 && (
                      <Text style={styles.moreSkillsText}>+{teachingSkills.length - 3} more</Text>
                    )}
                  </View>
                </View>
              )}

              {learningSkills.length > 0 && (
                <View style={styles.skillsPreviewSection}>
                  <Text style={styles.skillsPreviewTitle}>Learning:</Text>
                  <View style={styles.skillsPreviewList}>
                    {learningSkills.slice(0, 3).map((skill, index) => (
                      <View key={index} style={styles.skillPreviewTag}>
                        <Text style={styles.skillPreviewText}>{skill.name}</Text>
                      </View>
                    ))}
                    {learningSkills.length > 3 && (
                      <Text style={styles.moreSkillsText}>+{learningSkills.length - 3} more</Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signUpButton, loading && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Cool Avatar Selector Modal */}
      <CoolAvatarSelector
        visible={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        onSelectAvatar={setSelectedAvatar}
        currentAvatar={selectedAvatar}
        title="Choose Your Cool Avatar"
      />

      {/* Skills Selector Modal */}
      <SkillsSelector
        visible={showSkillsSelector}
        onClose={() => setShowSkillsSelector(false)}
        onSaveSkills={handleSkillsUpdate}
        initialTeachingSkills={teachingSkills}
        initialLearningSkills={learningSkills}
        title="Select Your Skills"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  socialContainer: {
    marginBottom: 25,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D4AA',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 15,
    borderRadius: 25,
  },
  facebookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 25,
  },
  termsLink: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.7,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  avatarSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  avatarSelector: {
    position: 'relative',
    marginBottom: 10,
  },
  selectedAvatarWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  selectedAvatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
  avatarStyleBadge: {
    position: 'absolute',
    bottom: -8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarStyleText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  defaultAvatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
  },
  defaultAvatarText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontWeight: '500',
  },
  avatarSelectorOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  skillsSection: {
    marginBottom: 25,
  },
  skillsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  skillsSelector: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  skillsSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillsInfo: {
    flex: 1,
    marginLeft: 15,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  skillsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  skillsPreview: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  skillsPreviewSection: {
    marginBottom: 10,
  },
  skillsPreviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  skillsPreviewList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  skillPreviewTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  skillPreviewText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  moreSkillsText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});