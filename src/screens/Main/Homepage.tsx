import {
  Chart,
  DarkModeButton,
  IconButton,
  ProductBar,
} from '../../components';
import HighLight from '../../components/atoms/HighLight/HighLight';
import Layout from '../../components/layouts/MainLayout/MainLayout';
import Records from '../../components/molecules/Homepage/Records/Records';
import Tabs from '../../components/molecules/Homepage/Tabs/Tabs';
import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import HorizonSelector from '../../components/molecules/Homepage/HorizonSelector/HorizonSelector';
import { useEffect } from 'react';
import ShopRecords from '../../components/molecules/Homepage/Records/ShopRecords';
import HorizonShopSelector from '../../components/molecules/Homepage/HorizonShopSelector/HorizonSelector';
import { Box } from '@mui/material';

export default function Homepage() {
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);

  const prices = useStore((state) => state.prices);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const product = useStore((state) => state.selectedProduct);
  const setProduct = useStore((state) => state.setSelectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);

  const lowestPrice = useMemo(() => {
    if (prices && selectedProduct) {
      const selectedProductList = prices.find(
        (item) => item.label === selectedProduct
      );
      if (selectedProductList) {
        const allPrices: { price: number; link: string; name: string }[] = [];
        selectedProductList.data.forEach((item) => {
          item.data?.forEach((subItem) => {
            if (subItem.price !== -1) {
              allPrices.push({
                price: subItem.price,
                link: item.link,
                name: item.name,
              });
            }
          });
        });
        if (allPrices.length > 0) {
          const price = Math.min(...allPrices.map((item) => item.price));
          const whereToBuy = allPrices.find((item) => item.price === price);
          return {
            price: whereToBuy?.price,
            whereToBuy: whereToBuy?.name,
            link: whereToBuy?.link,
          };
        }
      }
    }
    return { price: 0, whereToBuy: '', link: '' };
  }, [prices, selectedProduct]);
  const currentLowestPrice = useMemo(() => {
    if (prices && selectedProduct) {
      const selectedProductList = prices.find(
        (item) => item.label === selectedProduct
      );
      if (selectedProductList) {
        const allPrices: { price: number; link: string; name: string }[] = [];
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
            whereToBuy: whereToBuy?.name,
            link: whereToBuy?.link,
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
        const allPrices: number[] = [];
        selectedProductList.data.forEach((item) => {
          item.data?.forEach((subItem) => {
            if (subItem.price !== -1) {
              allPrices.push(subItem.price);
            }
          });
        });
        if (allPrices.length > 0) {
          return allPrices.reduce((a, b) => a + b, 0) / allPrices.length;
        }
      }
    }
    return 0;
  }, [prices, selectedProduct]);

  const highlightData = [
    {
      label: 'Current lowest price',
      price: currentLowestPrice.price ?? 0,
      where: currentLowestPrice.whereToBuy ?? '',
      link: currentLowestPrice.link ?? '',
    },
    {
      label: 'Avarage price',
      price: averagePrice,
      where: '',
      link: '',
    },
    {
      label: 'Lowest price',
      price: lowestPrice.price ?? 0,
      where: lowestPrice.whereToBuy ?? '',
      link: lowestPrice.link ?? '',
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
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <div
            className="d-none d-md-block"
            style={{
              fontWeight: 'bold',
              paddingBottom: 5,
              paddingLeft: 20,
            }}
          >
            Graphs
          </div>
          <Chart />
          <div className="d-none d-md-block">
            <div
              style={{
                padding: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                }}
              >
                Records
              </div>
              <ShopRecords />
            </div>
          </div>
        </Box>
        <div>
          <div
            style={{
              padding: 20,
            }}
            className="d-none d-md-block"
          >
            <div
              style={{
                fontWeight: 'bold',
                paddingBottom: 5,
              }}
            >
              High Light
            </div>

            <HighLight data={highlightData} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
