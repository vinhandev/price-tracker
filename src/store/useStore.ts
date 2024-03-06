import { create } from 'zustand';
import { GroupPriceProps } from '../types/prices';

export type Store = {
  isDarkMode: boolean;
  setDarkMode: () => void;
  openSidebar: boolean;
  setOpenSidebar: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  prices: GroupPriceProps[];
  setPrices: (prices: GroupPriceProps[]) => void;
  progressValue: number;
  setProgressValue: (value: number) => void;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  labels: number[];
  setLabels: (labels: number[]) => void;
  lastUpdate: number;
  setLastUpdate: (value: number) => void;
  initData: (
    prices: GroupPriceProps[],
    labels: number[],
    lastUpdate: number
  ) => void;
};

export const useStore = create<Store>((set) => ({
  isDarkMode: false,
  setDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  openSidebar: false,
  setOpenSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  isLoading: false,
  setLoading: (isLoading) => set(() => ({ isLoading })),
  prices: [],
  setPrices: (prices: GroupPriceProps[]) => set({ prices }),
  progressValue: 0,
  setProgressValue: (value: number) => set({ progressValue: value }),
  selectedProduct: '',
  setSelectedProduct: (value: string) => set({ selectedProduct: value }),
  labels: [],
  setLabels: (labels: number[]) => set({ labels }),
  lastUpdate: 0,
  setLastUpdate: (value: number) => set({ lastUpdate: value }),
  initData: (prices: GroupPriceProps[], labels: number[], lastUpdate: number) =>
    set({ prices, labels, lastUpdate }),
}));
