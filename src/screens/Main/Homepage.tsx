import { Chart } from '../../components';
import HighLight from '../../components/atoms/HighLight/HighLight';
import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';
import ShopRecords from '../../components/molecules/Homepage/Records/ShopRecords';
import { Box } from '@mui/material';
import Tab from '@/HOCs/Tab';
import HorizonSelector from '@/components/molecules/Homepage/HorizonSelector/HorizonSelector';

export type HightLightType = {
  label: string;
  price: number;
  link: string;
  name: string;
  color: string;
  data: { date: number; price: number }[];
};

export default function Homepage() {
  const prices = useStore((state) => state.prices);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const product = useStore((state) => state.selectedProduct);
  const setProduct = useStore((state) => state.setSelectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);

  const currentLowestPrice = useMemo(() => {
    if (prices && selectedProduct) {
      const selectedProductList = prices.find(
        (item) => item.label === selectedProduct
      );
      if (selectedProductList) {
        const allPrices: {
          price: number;
          link: string;
          name: string;
        }[] = [];
        selectedProductList.data.forEach((item) => {
          if (
            item?.data?.length &&
            item.data?.[item.data.length - 1]?.price > 0
          ) {
            allPrices.push({
              price: item.data?.[item.data.length - 1].price,
              link: item.link,
              name: item.name,
            });
          }
        });
        if (allPrices.length > 0) {
          const price = Math.min(...allPrices.map((item) => item.price));
          const whereToBuy = allPrices.find((item) => item.price === price);
          return {
            price: whereToBuy?.price,
            name: whereToBuy?.name,
            link: whereToBuy?.link,
            data: selectedProductList.data.find(
              (item) => item.name === whereToBuy?.name
            )?.data,
          };
        }
      }
    }
    return { price: 0, whereToBuy: '', link: '' };
  }, [prices, selectedProduct]);

  const currentHighestPrice = useMemo(() => {
    if (prices && selectedProduct) {
      const selectedProductList = prices.find(
        (item) => item.label === selectedProduct
      );
      if (selectedProductList) {
        const allPrices: {
          price: number;
          link: string;
          name: string;
        }[] = [];
        selectedProductList.data.forEach((item) => {
          if (
            item?.data?.length &&
            item.data?.[item.data.length - 1]?.price > 0
          ) {
            allPrices.push({
              price: item.data?.[item.data.length - 1].price,
              link: item.link,
              name: item.name,
            });
          }
        });
        if (allPrices.length > 0) {
          const price = Math.max(...allPrices.map((item) => item.price));
          const whereToBuy = allPrices.find((item) => item.price === price);
          return {
            price: whereToBuy?.price,
            name: whereToBuy?.name,
            link: whereToBuy?.link,
            data: selectedProductList.data.find(
              (item) => item.name === whereToBuy?.name
            )?.data,
          };
        }
      }
    }
    return { price: 0, whereToBuy: '', link: '' };
  }, [prices, selectedProduct]);

  const averagePrice = useMemo(() => {
    if (prices && selectedProduct) {
      const selectedProductList = prices.find(
        (item) => item.label === selectedProduct
      );
      if (selectedProductList) {
        let allPricesData: { date: number; prices: number[] }[] = [];
        selectedProductList.data.forEach((item) => {
          item.data?.forEach((subItem) => {
            if (subItem.price !== -1) {
              if (allPricesData.find((price) => price.date === subItem.date)) {
                allPricesData = allPricesData.map((price) => {
                  if (price.date === subItem.date) {
                    price.prices.push(subItem.price);
                    return price;
                  } else {
                    return price;
                  }
                });
              } else {
                allPricesData.push({
                  date: subItem.date,
                  prices: [subItem.price],
                });
              }
            }
          });
        });
        const data: { date: number; price: number }[] = [];
        if (allPricesData.length > 0) {
          allPricesData.map((item) => {
            data.push({
              date: item.date,
              price:
                item.prices.reduce((a, b) => a + b, 0) / item.prices.length,
            });
          });
        }
        return {
          price: data[data.length - 1].price,
          name: '',
          link: '',
          data: data,
        };
      }
    }
    return undefined;
  }, [prices, selectedProduct]);

  const highlightData: HightLightType[] = [
    {
      label: 'Lowest price',
      name: currentLowestPrice.name ?? '',
      price: currentLowestPrice.price ?? 0,
      link: currentLowestPrice.link ?? '',
      data: currentLowestPrice.data ?? [],
      color: '#2192FF',
    },
    {
      label: 'Highest price',
      price: currentHighestPrice.price ?? 0,
      name: currentHighestPrice.name ?? '',
      link: currentHighestPrice.link ?? '',
      data: currentHighestPrice.data ?? [],
      color: '#38E54D',
    },
    {
      label: 'Average price',
      price: averagePrice?.price ?? 0,
      name: selectedProduct,
      link: '',
      data: averagePrice?.data ?? [],
      color: '#9CFF2E',
    },
  ];

  useEffect(() => {
    if (prices.length > 0 && product === '') {
      console.log('prices', prices, prices?.[0]?.label);

      setProduct(prices?.[0]?.label);
      setSelectedShop(prices?.[0]?.data?.[0]?.name);
    }
  }, [prices, product, setProduct]);

  return (
    <Box
      style={{
        height: '100%',

        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: '10px',
        }}
      >
        <Box
          sx={{
            height: 'calc( 50% - 5px )',
          }}
        >
          <Chart />
        </Box>
        <Box
          sx={{
            height: 'calc( 50% - 5px )',
          }}
        >
          <Tab noPadding title="Records">
            <ShopRecords />
          </Tab>
        </Box>
      </Box>
      <Box
        style={{
          width: '25%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
          }}
        >
          <HighLight data={highlightData} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
          }}
        >
          <Tab title="Filters">
            <HorizonSelector />
          </Tab>
        </Box>
      </Box>
    </Box>
  );
}
