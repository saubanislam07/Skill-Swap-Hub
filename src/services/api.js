import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API URL configuration for different platforms
const API_BASE_URL = __DEV__
    ? Platform.OS === 'android'
        ? 'http://10.0.2.2:5000/api'  // Android emulator
        : 'http://localhost:5000/api'  // iOS Simulator or web
    : 'http://YOUR_PRODUCTION_URL/api'; // Production URL

class ApiService {
    constructor() {
        this.token = null;
    }

    async getToken() {
        if (!this.token) {
            this.token = await AsyncStorage.getItem('authToken');
        }
        return this.token;
    }

    async setToken(token) {
        this.token = token;
        await AsyncStorage.setItem('authToken', token);
    }

    async removeToken() {
        this.token = null;
        await AsyncStorage.removeItem('authToken');
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = await this.getToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Request Error:', error);

            // Provide more specific error messages
            if (error.message.includes('Network request failed')) {
                throw new Error('Cannot connect to server. Make sure the backend is running on port 5000.');
            }

            throw error;
        }
    }

    // Auth endpoints
    async register(userData) {
        const response = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        if (response.token) {
            await this.setToken(response.token);
        }

        return response;
    }

    async login(credentials) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (response.token) {
            await this.setToken(response.token);
        }

        return response;
    }

    async verifyToken() {
        return this.request('/auth/verify');
    }

    async logout() {
        await this.removeToken();
    }

    // User endpoints
    async getUsers(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.request(`/users?${queryParams}`);
    }

    async getUserProfile(userId) {
        return this.request(`/users/profile/${userId}`);
    }

    async updateProfile(profileData) {
        return this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    // Swap endpoints
    async createSwap(swapData) {
        return this.request('/swaps', {
            method: 'POST',
            body: JSON.stringify(swapData),
        });
    }

    async getMySwaps() {
        return this.request('/swaps/my-swaps');
    }

    async updateSwapStatus(swapId, status) {
        return this.request(`/swaps/${swapId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    }

    async rateSwap(swapId, rating) {
        return this.request(`/swaps/${swapId}/rate`, {
            method: 'PUT',
            body: JSON.stringify(rating),
        });
    }

    // Message endpoints
    async getConversations() {
        return this.request('/messages/conversations');
    }

    async getMessages(userId) {
        return this.request(`/messages/${userId}`);
    }

    async sendMessage(messageData) {
        return this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        });
    }
}

export default new ApiService();