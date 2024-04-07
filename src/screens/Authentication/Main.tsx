import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Dialog,
  Snackbar,
} from '@mui/material';
import {
  convertLabelToUrl,
  delay,
  getFirebasePrices,
  getPath,
  showError,
  showSuccess,
} from '@/utils';
import { LogoHorizontal } from '@/components/atoms/Logos';
import { useStore, useUser } from '@/store';
import Loading from '../Helper/Loading';
import { CustomBreadcrumbs, Sidebar } from '@/components';
import { Header } from '@/components/molecules';
import { useColors } from '@/hooks';
import { updateUserPrices } from '@/services';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
export default function Main() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [count, setCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentShop, setCurrentShop] = useState('');

  const user = useUser((state) => state.user);

  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);

  const isLoading = useStore((state) => state.isLoading);
  const setLoading = useStore((state) => state.setLoading);

  const successMessage = useStore((state) => state.successMessage);
  const isSuccess = useStore((state) => state.isSuccess);
  const setSuccess = useStore((state) => state.setSuccess);

  const isShowBreadcrumb = useStore((state) => state.isShowBreadcrumb);

  const initData = useStore((state) => state.initData);

  async function handleReload() {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setLoading(true);
      await updateUserPrices();
      showSuccess('Prices updated successfully');
      await delay(1000);
      window.location.reload();
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }

  function handleCloseSnackbar() {
    setSuccess(false);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        if (user) {
          const response = await getFirebasePrices(user.uid);
          if (response.prices && response?.prices?.length > 0) {
            for (const item of response.prices) {
              if (pathname.includes(convertLabelToUrl(item.label))) {
                setSelectedProduct(item.label);
                for (const subItem of item.data) {
                  if (pathname.includes(convertLabelToUrl(subItem.name))) {
                    setSelectedShop(subItem.name);
                    break;
                  }
                }
                break;
              }
            }
          }
          console.log(response);

          if (response.prices) {
            initData(
              response.prices,
              response.labels ?? [],
              response.lastUpdate ?? 0,
              response.metadata ?? {
                isShowBreadcrumb: false,
                isUseDrawer: false,
                isUseBiggerPagination: false,
                opacity: 50,
                themeIndex: 0,
              }
            );
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
          navigate(getPath({ path: 'HOME' }));
        },
        isActive: pathname === getPath({ path: 'HOME' }),
      },

      {
        label: 'Products',
        onClick: () => {
          navigate(getPath({ path: 'PRODUCTS' }));
        },
        isActive: pathname === getPath({ path: 'PRODUCTS' }),
      },
    ],
    [
      {
        label: 'Settings',
        onClick: () => {
          navigate(getPath({ path: 'SETTING' }));
        },
        isActive: pathname === getPath({ path: 'SETTING' }),
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

        background: colors.background2,
        transition: 'all 1s ease',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',

          display: 'flex',
          flexDirection: 'row',

          padding: {
            xs: '20px',
            md: '30px',
          },
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
            position: 'relative',
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
            }}
          >
            <Header />
          </Box>
          <Box
            sx={{
              display: isShowBreadcrumb ? 'block' : 'none',
              transition: 'all 1s ease',
            }}
          >
            <CustomBreadcrumbs />
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

        <Snackbar
          open={isSuccess}
          onClose={handleCloseSnackbar}
          // TransitionComponent={Slide}
          autoHideDuration={1200}
        >
          <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box
        sx={{
          zIndex: 100,
          background: colors.background,
          position: 'fixed',
          bottom: 0,
          width: '100%',
          display: {
            xs: 'block',
            md: 'none',
            lg: 'none',
          },
        }}
      >
        <BottomNavigation
          sx={{
            height: '80px',
          }}
          showLabels
          value={pathname}
          onChange={(_, newValue) => {
            navigate(newValue);
          }}
        >
          <BottomNavigationAction
            value={'/products'}
            label="Products"
            icon={<WidgetsIcon />}
          />
          <BottomNavigationAction
            value={'/home'}
            label="Dashboard"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            value={'/setting'}
            label="Setting"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
