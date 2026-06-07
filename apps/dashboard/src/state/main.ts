import { create } from 'zustand';
import type { MainStore } from './types';

import { authClient } from '@/lib/auth-client';

export const useMainStore = create<MainStore>(() => ({
  signOut: () => authClient.signOut(),
}));
