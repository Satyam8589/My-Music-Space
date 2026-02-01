'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setLoading } from '@/config/redux/reducer/authReducer';
import { getUserProfileAction } from '@/config/redux/action/userAction';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Set token in redux state
        dispatch(setToken(token));
        // Fetch user profile to verify token and get user data
        try {
          await dispatch(getUserProfileAction()).unwrap();
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // Only clear token if it's an authentication error (401)
          // Don't clear on network errors or other temporary issues
          if (error?.includes('401') || error?.includes('Unauthorized') || error?.includes('Invalid token')) {
            localStorage.removeItem('token');
          }
          dispatch(setLoading(false));
        }
      } else {
        // No token found, stop loading
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
}
