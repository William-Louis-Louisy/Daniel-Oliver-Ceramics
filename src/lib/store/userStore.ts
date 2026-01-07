import { create } from 'zustand';
import { User } from '../../lib/api/user';

interface UserState {
  user: User | null;
  setUser: (u: User | null) => void;
  isAuthenticated: boolean;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u, isAuthenticated: !!u }),
  isAuthenticated: false,
}));
