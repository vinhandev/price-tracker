export type PriceProps = {
  name: string;
  data?: {
    price: number;
    date: number;
  }[];
  link: string;
  first: string;
  last: string;
  color: string;
};

export type GroupPriceProps = {
  label: string;
  data: PriceProps[];
};
