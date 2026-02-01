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
          // If profile fetch fails, clear token and stop loading
          localStorage.removeItem('token');
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
