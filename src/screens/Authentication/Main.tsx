import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { getFirebasePrices, showError } from '@/utils';
import { LogoHorizontal } from '@/components/atoms/Logos';
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

  const isLoading = useStore((state) => state.isLoading);
  const setLoading = useStore((state) => state.setLoading);
  const initData = useStore((state) => state.initData);

  async function getData() {
    setLoading(true);
    try {
      if (user) {
        const response = await getFirebasePrices(user.uid);
        console.log(response);

        if (response.prices) {
          initData(response.prices, response.labels ?? [], 0);
        }
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }
  async function handleReload() {
    try {
      setLoading(true);
      await fetch('http://localhost:4000/updatePrices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      await getData();
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
        label: 'Products',
        onClick: () => {
          navigate('/products');
        },
        isActive: pathname === '/products',
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
    ],
  ];

  useEffect(() => {
    if (isLoading === false) {
      setCurrentProduct(() => '');
      setCurrentShop(() => '');
      setCount(() => 0);
    }
  }, [isLoading]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        padding: {
          xs: '20px',
          md: '30px',
        },

        background: colors.background2,
        transition: 'all 1s ease',
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
            width: '300px',
            height: {
              xs: 'calc( 100vh - 40px )',
              md: 'calc( 100vh - 60px )',
            },

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
            width: {
              xs: '100%',
              md: '100%',
              lg: 'calc(100% - 300px)',
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
          <Box>
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
