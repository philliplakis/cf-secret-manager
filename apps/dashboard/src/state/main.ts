import { create } from 'zustand';
import type { MainStore } from './types';

import { authClient } from '@/lib/auth-client';
import { useNavigate } from 'react-router-dom';

export const useMainStore = create<MainStore>((set) => ({
  isAuthenticated: false,
  signOut: async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          const navigate = useNavigate();
          set({ isAuthenticated: false });
          navigate('/');
        },
      },
    });
  },
}));
