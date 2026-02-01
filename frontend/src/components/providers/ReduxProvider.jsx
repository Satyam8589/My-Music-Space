'use client';

import { Provider } from 'react-redux';
import { store } from '@/config/redux/store';
import AuthProvider from './AuthProvider';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
