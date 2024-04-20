import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Grid,
  Snackbar,
  Stack,
} from '@mui/material';
import {
  convertLabelToUrl,
  delay,
  getFirebasePrices,
  getPath,
  showError,
  showSuccess,
} from '@/utils';
import { useStore, useUser } from '@/store';
import Loading from '../Helper/Loading';
import {
  ConfirmDialog,
  CustomBreadcrumbs,
  InputDialog,
  Sidebar,
} from '@/components';
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
  const isUseDrawer = useStore((state) => state.isUseDrawer);
  const isSuccess = useStore((state) => state.isSuccess);
  const setSuccess = useStore((state) => state.setSuccess);

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
        isActive: pathname.includes(getPath({ path: 'HOME' })),
      },

      {
        label: 'Products',
        onClick: () => {
          navigate(getPath({ path: 'PRODUCTS' }));
        },
        isActive: pathname.includes(getPath({ path: 'PRODUCTS' })),
      },
    ],
    [
      {
        label: 'Settings',
        onClick: () => {
          navigate(getPath({ path: 'SETTING' }));
        },
        isActive: pathname.includes(getPath({ path: 'SETTING' })),
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
    <Container maxWidth={false} disableGutters>
      <Grid
        container
        sx={{
          height: '100vh',
          width: '100vw',
          padding: {
            xs: '20px',
            md: '30px',
          },

          transition: 'all 1s ease',

          background: colors.background2,
        }}
      >
        <Grid
          item
          lg={2}
          sx={{
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

            background: colors.background2,
          }}
        >
          <Sidebar navBarList={NavBarList} onReload={handleReload} />
        </Grid>

        <Grid item xs={12} lg={10}>
          <Stack sx={{ height: '100%' }}>
            <Header />
            <CustomBreadcrumbs />
            <Outlet />
          </Stack>
        </Grid>
      </Grid>
      {!isUseDrawer ? (
        <Box
          sx={{
            zIndex: 100,
            background: colors.background,
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: {
              xs: 'block',
              md: 'block',
              lg: 'none',
            },
          }}
        >
          <BottomNavigation
            sx={{
              height: '80px',
              borderTop: `1px solid ${colors.border}`,
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
      ) : null}
      <ConfirmDialog />
      <InputDialog />
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
    </Container>
  );
}
