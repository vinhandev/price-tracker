import { Chart, DarkModeButton, IconButton, ProductBar } from '../components';
import HighLight from '../components/HighLight/HighLight';
import Layout from '../components/Layout';
import Records from '../components/Records/Records';
import Tabs from '../components/Tabs/Tabs';
import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import HorizonSelector from '../components/HorizonSelector/HorizonSelector';
import { useEffect } from 'react';
import ShopRecords from '../components/Records/ShopRecords';
import HorizonShopSelector from '../components/HorizonShopSelector/HorizonSelector';

export default function Homepage() {
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);

  const isDarkMode = useStore((state) => state.isDarkMode);

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
      setSelectedShop(prices?.[0]?.data[0].name);
    }
  }, [prices, product, setProduct]);

  return (
    <Layout>
      <div>
        <div
          className="d-flex d-md-none"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            padding: 20,

            position: 'fixed',
            backgroundColor: isDarkMode ? 'black' : 'white',
            width: '100%',
          }}
        >
          <IconButton onClick={setOpenSidebar} variant="menu" />

          <div
            style={{
              width: '75%',
            }}
          >
            <ProductBar />
          </div>
          <DarkModeButton />
        </div>
        <div
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="d-none d-md-flex"
        >
          <div>
            <h3 className="text">Price Tracker</h3>
          </div>
          <div>
            <DarkModeButton />
          </div>
        </div>
        <div className="d-none d-md-block">
          <HorizonSelector />
        </div>
        <div
          style={{
            height: '100%',
            flex: 1,
          }}
        >
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
          <div className="d-block d-md-none">
            <Tabs
              data={[
                {
                  label: 'Highlight',
                  tab: <HighLight data={highlightData} />,
                },
                {
                  label: 'Records',
                  tab: <Records />,
                },
              ]}
            />
          </div>
          <div className="d-none d-md-block">
            <HorizonShopSelector />
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
        </div>
      </div>
    </Layout>
  );
}
