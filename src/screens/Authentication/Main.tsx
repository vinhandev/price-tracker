import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { GroupPriceProps } from '@/types';
import {
  convertStringToNumber,
  getFirebasePrices,
  isSameDay,
  showError,
  updateFirebasePrices,
} from '@/utils';
import { LogoHorizontal } from '@/components/atoms/Logos';
import { auth } from '@/services';
import { useStore, useUser } from '@/store';
import Loading from '../Helper/Loading';
import { Sidebar } from '@/components';
import { Header } from '@/components/molecules';
import { useColors } from '@/hooks';

export default function Main() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [count, setCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentShop, setCurrentShop] = useState('');

  const user = useUser((state) => state.user);

  const setLoading = useStore((state) => state.setLoading);
  const initData = useStore((state) => state.initData);

  async function handleReload() {
    setLoading(true);
    try {
      if (user) {
        const response = await getFirebasePrices(user.uid);
        if (response.prices && response.labels) {
          await handleFetch(response.prices, response.labels);
        }
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }
  async function handleFetch(
    paramPrices: GroupPriceProps[],
    paramLabels: number[]
  ) {
    const lastUpdate = new Date().getTime();
    let isHaveRecord = false;

    setCount(0);
    setLoading(true);
    try {
      if (paramPrices?.length === 0) throw new Error('Prices not found');
      const lastDayLabels = paramLabels[paramLabels.length - 1];
      const isToday = isSameDay(new Date(lastDayLabels), new Date(lastUpdate));
      for (let index = 0; index < paramPrices.length; index++) {
        const group = paramPrices[index];
        setCurrentProduct(() => group.label);
        for (let i = 0; i < group?.data.length; i++) {
          const element = paramPrices[index].data[i];
          try {
            setCurrentShop(() => element.name);

            const response = await fetch(element.link);
            const data = (await response.text())
              .replace(/\n/g, ' ')
              .replace(/\r/g, ' ')
              .replace(/\t/g, ' ')
              .split('=""')
              .join('')
              .split(' ')
              .join('');

            const price =
              data
                .split(element.first.split(' ').join(''))[1]
                ?.split(element.last.split(' ').join(''))[0] ?? '0';
            const number = convertStringToNumber(price);
            if (number !== null && number !== 0) {
              if (!element?.data) {
                element.data = [
                  {
                    price: number,
                    date: lastUpdate,
                  },
                ];
              } else {
                if (isToday) {
                  element.data.pop();
                }

                element.data?.push({
                  price: number,
                  date: lastUpdate,
                });
              }
              if (!isHaveRecord) {
                isHaveRecord = true;
              }
              setCount(
                (tmpCount) =>
                  tmpCount + Math.round((1 / group?.data.length) * 100) / 100
              );
            } else {
              throw new Error('no price');
            }
          } catch (error) {
            if (!isToday) {
              element.data?.push({
                price: -1,
                date: lastUpdate,
              });
            }

            setCount(
              (tmpCount) =>
                tmpCount + Math.round((1 / group?.data.length) * 100) / 100
            );
          }
        }
      }
      if (isHaveRecord) {
        if (isToday) {
          paramLabels.pop();
        }
        paramLabels.push(lastUpdate);

        initData(paramPrices, paramLabels, lastUpdate);

        if (user) {
          await updateFirebasePrices(user.uid, {
            prices: paramPrices,
            labels: paramLabels,
            lastUpdate,
          });
        }
      } else {
        throw new Error('No record to fetch');
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        if (user) {
          const response = await getFirebasePrices(user.uid);
          console.log(response);

          if (response.prices) {
            initData(response.prices, response.labels ?? [], 0);
            await handleFetch(response.prices, response.labels ?? []);
          }
        }
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
    getData();
  }, []);

  const NavBarList = [
    [
      {
        label: 'Dashboard',
        onClick: () => {
          navigate('/home');
        },
        isActive: pathname === '/home',
      },
      {
        label: 'Add Product',
        onClick: () => {
          navigate('/add');
        },
        isActive: pathname === '/add',
      },
    ],
    [
      {
        label: 'Settings',
        onClick: () => {
          navigate('/setting');
        },
        isActive: pathname === '/setting',
      },
      {
        label: 'Logout',
        onClick: async () => {
          await auth.signOut();
          window.location.reload();
        },
      },
    ],
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: {
          xs: 'scroll',
          md: 'hidden',
        },

        padding: {
          xs: '20px',
          md: '30px',
        },

        background: colors.background2,
        transition: 'background 1s ease',
      }}
    >
      <Box
        style={{
          height: '100%',
          width: '100%',

          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            width: '250px',
            height: '100%',

            display: {
              xs: 'none',
              md: 'none',
              lg: 'flex',
            },
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Box
            sx={{
              width: 200,
            }}
          >
            <LogoHorizontal />
          </Box>
          <Box
            sx={{
              flex: 1,
              background: colors.background2,
            }}
          >
            <Sidebar navBarList={NavBarList} onReload={handleReload} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: {
              xs: '100%',
              md:'100%',
              lg: 'calc(100% - 250px)',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Header />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              overflow: 'scroll',
            }}
          >
            <Outlet />
          </Box>
        </Box>

        <Loading
          count={count}
          currentProduct={currentProduct}
          currentShop={currentShop}
        />
      </Box>
    </Box>
  );
}
