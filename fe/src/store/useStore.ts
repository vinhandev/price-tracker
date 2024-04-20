import { create } from 'zustand';
import { GroupPriceProps } from '@/types';
import { ReactNode } from 'react';

type Store = {
  initData: (
    prices: GroupPriceProps[],
    labels: number[],
    lastUpdate: number,
    metadata: {
      isShowBreadcrumb: boolean;
      isUseBiggerPagination: boolean;
      isUseDrawer: boolean;
      opacity: number;
      themeIndex: number;
    }
  ) => void;
  isDarkMode: boolean;
  setDarkMode: () => void;
  openSidebar: boolean;
  setOpenSidebar: () => void;
  isInit: boolean;
  setIsInit: (value: boolean) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  isSuccess: boolean;
  setSuccess: (isSuccess: boolean) => void;
  successMessage: string;
  setSuccessMessage: (message: string) => void;
  prices: GroupPriceProps[];
  setPrices: (prices: GroupPriceProps[]) => void;
  progressValue: number;
  setProgressValue: (value: number) => void;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  selectedShop: string;
  setSelectedShop: (value: string) => void;
  labels: number[];
  setLabels: (labels: number[]) => void;
  lastUpdate: number;
  setLastUpdate: (value: number) => void;
  isShowBreadcrumb: boolean;
  setIsShowBreadcrumb: (value: boolean) => void;
  isUseDrawer: boolean;
  setIsUseDrawer: (value: boolean) => void;
  isUsePagePagination: boolean;
  setIsUsePagePagination: (value: boolean) => void;
  themeIndex: number;
  setThemeIndex: (themeIndex: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  isOpenConfirmDialog: boolean;
  callbackConfirmDialog: undefined | (() => void);
  setIsOpenConfirmDialog: (value: boolean, onConfirm?: () => void) => void;
  isOpenInputDialog: boolean;
  callbackInputDialog: undefined | (() => void | Promise<void>);
  bodyInputDialog: ReactNode;
  inputDialogTexts: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };
  setIsOpenInputDialog: (
    value: boolean,
    props?: {
      inputDialogTexts?: {
        title: string;
        description: string;
        confirm: string;
        cancel: string;
      };
      bodyInputDialog?: ReactNode;
      onConfirm?: () => void | Promise<void>;
    }
  ) => void;
};

export const useStore = create<Store>((set) => ({
  isDarkMode: false,
  setDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  openSidebar: false,
  setOpenSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  isInit: true,
  setIsInit: (value) => set({ isInit: value }),
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
  initData: (
    prices: GroupPriceProps[],
    labels: number[],
    lastUpdate: number,
    metadata
  ) => set({ prices, labels, lastUpdate, ...metadata }),
  selectedShop: '',
  setSelectedShop: (value: string) => set({ selectedShop: value }),
  isSuccess: false,
  setSuccess: (isSuccess: boolean) => set({ isSuccess }),
  successMessage: 'Success',
  setSuccessMessage: (message: string) => set({ successMessage: message }),
  isShowBreadcrumb: false,
  setIsShowBreadcrumb: (value: boolean) => set({ isShowBreadcrumb: value }),
  isUseDrawer: false,
  setIsUseDrawer: (value: boolean) => set({ isUseDrawer: value }),
  isUsePagePagination: false,
  setIsUsePagePagination: (value: boolean) =>
    set({ isUsePagePagination: value }),
  themeIndex: 0,
  setThemeIndex: (themeIndex: number) => set({ themeIndex }),
  opacity: 50,
  setOpacity: (opacity: number) => set({ opacity }),
  isOpenConfirmDialog: false,
  callbackConfirmDialog: undefined,
  setIsOpenConfirmDialog: (value: boolean, onConfirm?: () => void) =>
    set({ isOpenConfirmDialog: value, callbackConfirmDialog: onConfirm }),
  isOpenInputDialog: false,
  callbackInputDialog: undefined,
  bodyInputDialog: undefined,
  inputDialogTexts: {
    title: 'Input dialog',
    description: 'Are your confirm this action?',
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  setIsOpenInputDialog: (value, props) => {
    if (value) {
      set({
        isOpenInputDialog: value,
        inputDialogTexts: props?.inputDialogTexts,
        bodyInputDialog: props?.bodyInputDialog,
        callbackInputDialog: props?.onConfirm,
      });
    } else {
      set({ isOpenInputDialog: value });
    }
  },
}));
