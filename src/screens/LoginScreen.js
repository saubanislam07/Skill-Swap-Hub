import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    Alert.alert('Coming Soon', 'Google login will be available soon!');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Coming Soon', 'Facebook login will be available soon!');
  };

  const handleEmailLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(formData);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.backgroundShapes}>
            <View style={styles.shape1} />
            <View style={styles.shape2} />
            <View style={styles.shape3} />
          </View>

          {/* Characters */}
          <View style={styles.charactersContainer}>
            <View style={styles.leftCharacter}>
              <View style={styles.characterBody1} />
              <View style={styles.characterHead1} />
            </View>

            <View style={styles.rightCharacter}>
              <View style={styles.characterBody2} />
              <View style={styles.characterHead2} />
              <View style={styles.guitar} />
            </View>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Skill Swap Hub</Text>
          <View style={styles.swapIcon}>
            <Ionicons name="swap-horizontal" size={24} color="#4CAF50" />
          </View>
        </View>

        <Text style={styles.subtitle}>Trade skills, not money.</Text>

        {/* Login Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookLogin}>
            <Ionicons name="logo-facebook" size={20} color="#fff" />
            <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emailButton} onPress={toggleEmailForm}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.emailButtonText}>Continue with email</Text>
          </TouchableOpacity>
        </View>

        {/* Email Login Form */}
        {showEmailForm && (
          <View style={styles.emailForm}>
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

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleEmailLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  illustrationContainer: {
    height: 300,
    marginBottom: 40,
    position: 'relative',
  },
  backgroundShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  shape1: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: '#E8F5E8',
    borderRadius: 40,
    top: 20,
    left: 20,
  },
  shape2: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#FFF8DC',
    borderRadius: 30,
    top: 50,
    right: 30,
  },
  shape3: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#FFE4E1',
    borderRadius: 50,
    bottom: 30,
    left: 50,
  },
  charactersContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  leftCharacter: {
    alignItems: 'center',
  },
  characterBody1: {
    width: 60,
    height: 80,
    backgroundColor: '#FF6B6B',
    borderRadius: 30,
    marginBottom: 10,
  },
  characterHead1: {
    width: 40,
    height: 40,
    backgroundColor: '#FFB4A2',
    borderRadius: 20,
    position: 'absolute',
    top: -5,
  },
  rightCharacter: {
    alignItems: 'center',
    position: 'relative',
  },
  characterBody2: {
    width: 60,
    height: 80,
    backgroundColor: '#FFD93D',
    borderRadius: 30,
    marginBottom: 10,
  },
  characterHead2: {
    width: 40,
    height: 40,
    backgroundColor: '#8B4513',
    borderRadius: 20,
    position: 'absolute',
    top: -5,
  },
  guitar: {
    width: 30,
    height: 60,
    backgroundColor: '#D2691E',
    borderRadius: 15,
    position: 'absolute',
    right: -20,
    top: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  swapIcon: {
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    marginBottom: 30,
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
    marginBottom: 15,
  },
  facebookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  emailForm: {
    marginTop: 20,
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
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.7,
  },
});