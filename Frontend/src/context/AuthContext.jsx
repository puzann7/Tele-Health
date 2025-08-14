// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, setAuthToken, clearAuthToken, getAuthToken } from '../utils/api';

// Auth context
const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.user?.userType || 'patient',
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        userType: 'patient',
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        userType: 'patient',
        token: null,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_USER_TYPE':
      return {
        ...state,
        userType: action.payload
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  userType: 'patient',
  token: null,
  loading: true,
  error: null
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthState = async () => {
      // First check for new token format
      let token = getAuthToken() || localStorage.getItem('token');
      
      // Fallback to old localStorage format
      if (!token) {
        const savedAuth = localStorage.getItem('nepalcare_auth');
        if (savedAuth) {
          try {
            const authData = JSON.parse(savedAuth);
            if (authData.user && authData.userType) {
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                  user: authData.user,
                  token: null // No token in old format
                }
              });
              return;
            }
          } catch (error) {
            console.error('Error parsing saved auth:', error);
            localStorage.removeItem('nepalcare_auth');
          }
        }
      }
      
      if (token) {
        try {
          setAuthToken(token);
          const result = await authAPI.getCurrentUser();
          
          if (result.success) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: result.data.user,
                token: token
              }
            });
          } else {
            // Token is invalid
            clearAuthToken();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          // Token is invalid or expired
          clearAuthToken();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuthState();
  }, []);

  // Login function with API integration
  const login = async (credentials, type = 'patient') => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Try API login first
      if (typeof authAPI !== 'undefined' && authAPI.login) {
        const result = await authAPI.login(credentials);
        
        if (result.success) {
          const { user, token } = result.data;
          
          // Store token
          setAuthToken(token);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token }
          });
          
          return { success: true, user };
        } else {
          dispatch({
            type: 'LOGIN_FAILURE',
            payload: result.error.message || 'Login failed'
          });
          
          return { success: false, error: result.error.message };
        }
      } else {
        // Fallback to mock login for development/testing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          firstName: credentials.firstName || credentials.name || 'User',
          lastName: credentials.lastName || '',
          email: credentials.email,
          userType: type,
          avatar: credentials.name ? credentials.name.charAt(0).toUpperCase() : 'U'
        };

        // Store in both formats for compatibility
        localStorage.setItem('nepalcare_auth', JSON.stringify({
          userType: type,
          user: userData
        }));

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: userData, token: null }
        });

        return { success: true, user: userData };
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
  try {
    // Call API to logout if available
    if (typeof authAPI !== 'undefined' && authAPI.logout) {
      try {
        await authAPI.logout();
      } catch (apiError) {
        console.error('Logout API call failed:', apiError);
        // Continue with client-side logout even if API call fails
      }
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Continue with client-side logout even if there's an error
  } finally {
    // Always perform client-side cleanup regardless of API call result
    try {
      // Clear client-side data
      clearAuthToken();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('nepalcare_auth');
      
      // Clear all localStorage items that might be related to auth
      Object.keys(localStorage).forEach(key => {
        if (key.includes('auth') || key.includes('token') || key.includes('user')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Update state
      dispatch({ type: 'LOGOUT' });
      
      // Force a page reload to ensure clean state
      if (typeof window !== 'undefined') {
        // Try to navigate to login page - adjust this path based on your routing
        try {
          // If you're using React Router, you might want to use navigate instead
          // But since this is in context, we'll use window.location
          
          // Check if we're already on a login/auth page
          const currentPath = window.location.pathname;
          if (!currentPath.includes('login') && !currentPath.includes('auth')) {
            // Adjust this path to match your actual login route
            window.location.href = '/login'; // or '/auth/login' or whatever your login path is
            
            // Alternative: if the above doesn't work, try:
            // window.location.replace('/login');
            
            // Or force a reload to the login page:
            // window.location.assign('/login');
          }
        } catch (navError) {
          console.error('Navigation error:', navError);
          // Fallback: reload the page which should redirect to login
          window.location.reload();
        }
      }
    } catch (cleanupError) {
      console.error('Cleanup error during logout:', cleanupError);
      // Even if cleanup fails, try to navigate
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }
};

  // Register function with API integration
  const register = async (userData, userType = 'patient') => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Try API registration first
      if (typeof authAPI !== 'undefined' && (authAPI.registerPatient || authAPI.registerDoctor)) {
        let result;
        
        if (userType === 'patient' && authAPI.registerPatient) {
          result = await authAPI.registerPatient(userData);
        } else if (userType === 'doctor' && authAPI.registerDoctor) {
          result = await authAPI.registerDoctor(userData);
        } else {
          throw new Error('Invalid user type or API not available');
        }
        
        if (result.success) {
          const { user, token } = result.data;
          
          // Store token if provided
          if (token) {
            setAuthToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
          }
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token }
          });
          
          return { success: true, message: result.message, user };
        } else {
          dispatch({
            type: 'LOGIN_FAILURE',
            payload: result.error.message || 'Registration failed'
          });
          
          return { success: false, error: result.error.message };
        }
      } else {
        // Fallback to mock registration
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          ...userData,
          userType: userType,
          avatar: userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U'
        };

        // Store in both formats for compatibility
        localStorage.setItem('nepalcare_auth', JSON.stringify({
          userType: userType,
          user: newUser
        }));

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: newUser, token: null }
        });

        return { success: true, user: newUser };
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      
      return { success: false, error: errorMessage };
    }
  };

  // Update user function
  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
    
    // Update localStorage in both formats
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('nepalcare_auth', JSON.stringify({
      userType: state.userType,
      user: updatedUser
    }));
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Set loading function
  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  // Set user type function
  const setUserType = (userType) => {
    dispatch({ type: 'SET_USER_TYPE', payload: userType });
  };

  const value = {
    // State values
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    userType: state.userType,
    token: state.token,
    loading: state.loading,
    error: state.error,
    // Actions
    login,
    logout,
    register,
    updateUser,
    clearError,
    setLoading,
    setUserType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected routes
export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
    
    return <Component {...props} />;
  };
};

export default AuthContext;