import { create } from 'zustand';
import { User } from 'firebase/auth';

export type Store = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUser = create<Store>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
