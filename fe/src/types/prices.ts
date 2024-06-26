export type PriceProps = {
  name: string;
  data?: {
    price: number;
    date: number;
  }[];
  link: string;
  selector: string;
  color: string;
  avatar: string;
};

export type GroupPriceProps = {
  label: string;
  data: PriceProps[];
};

export type FirebaseType = {
  prices?: GroupPriceProps[];
  labels?: number[];
  lastUpdate?: number;
  metadata: {
    themeIndex: number;
    opacity: number;
    isShowBreadcrumb: boolean;
    isUseDrawer: boolean;
    isUseBiggerPagination: boolean;
    isDarkMode: boolean;
  };
};
