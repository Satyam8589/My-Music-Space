'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setLoading } from '@/config/redux/reducer/authReducer';
import { getUserProfileAction } from '@/config/redux/action/userAction';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set token in redux state
      dispatch(setToken(token));
      // Fetch user profile to verify token and get user data
      dispatch(getUserProfileAction());
    } else {
      // No token found, stop loading
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return <>{children}</>;
}
