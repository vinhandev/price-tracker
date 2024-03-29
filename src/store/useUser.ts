import { create } from 'zustand';
import { User } from 'firebase/auth';

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  themeIndex: number;
  setThemeIndex: (themeIndex: number) => void;
  opacity:number;
  setOpacity:(opacity:number)=>void
};

export const useUser = create<Store>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  themeIndex: 0,
  setThemeIndex: (themeIndex: number) => set({ themeIndex }),
  opacity:50,
  setOpacity:(opacity:number)=>set({opacity})
}));
