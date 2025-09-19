import React, { createContext, useContext, useReducer, useEffect } from 'react';
import ApiService from '../services/api';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                isLoading: false,
                error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...initialState,
                isLoading: false,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await ApiService.verifyToken();
            dispatch({ type: 'SET_USER', payload: response.user });
        } catch (error) {
            dispatch({ type: 'SET_USER', payload: null });
        }
    };

    const login = async (credentials) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await ApiService.login(credentials);
            dispatch({ type: 'SET_USER', payload: response.user });
            return response;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await ApiService.register(userData);
            dispatch({ type: 'SET_USER', payload: response.user });
            return response;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await ApiService.logout();
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateUser = (userData) => {
        dispatch({ type: 'SET_USER', payload: userData });
    };

    const value = {
        ...state,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};