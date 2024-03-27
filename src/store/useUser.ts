import { create } from 'zustand';
import { User } from 'firebase/auth';

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  themeIndex: number;
  setThemeIndex: (themeIndex: number) => void;
};

export const useUser = create<Store>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  themeIndex: 0,
  setThemeIndex: (themeIndex: number) => set({ themeIndex }),
}));
