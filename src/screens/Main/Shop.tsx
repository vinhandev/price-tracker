import {
  Box,
  Divider,
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Zoom,
  useTheme,
} from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useEffect, useMemo, useState } from 'react';
import { useColors } from '@/hooks';
import { useStore } from '@/store';
import { Tab } from '@/HOCs';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, formatMoney } from '@/utils';

export default function ShopScreen() {
  const theme = useTheme();
  const colors = useColors();
  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);

  const isActive = scrollPosition > 0;

  const selectedShop = useStore((state) => state.selectedShop);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const prices = useStore((state) => state.prices);

  const shop = useMemo(() => {
    return prices
      ?.find((item) => item.label === selectedProduct)
      ?.data.find((item) => item.name === selectedShop);
  }, [prices, selectedProduct, selectedShop]);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  async function handleAddNewProduct() {
    navigate('/update_shop');
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const displayList: {
    label: string;
    value: string;
  }[] = [
    {
      label: 'Shop Name',
      value: shop?.name ?? '',
    },
    {
      label: 'Shop Link',
      value: shop?.link ?? '',
    },
    {
      label: 'Shop Logo',
      value: shop?.avatar ?? '',
    },
    {
      label: 'Shop Before Characters Catchphrase',
      value: shop?.first ?? '',
    },
    {
      label: 'Shop After Characters Catchphrase',
      value: shop?.last ?? '',
    },
  ];

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingTop: '10px',
        width: '100%',
      }}
    >
      <Tab>
        <Box>
          <Link
            style={{
              textDecoration: 'none',
              color: colors.primary,
            }}
            to="/shops"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1px',
              }}
            >
              <ArrowBackIosIcon
                sx={{
                  fontWeight: '400',
                  fontSize: '12px',
                  textDecorationLine: 'none',
                }}
              />
              <Typography
                sx={{
                  cursor: 'pointer',
                  color: colors.primary,
                  fontWeight: '400',
                  fontSize: '12px',
                  textDecorationLine: 'none',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    textDecorationLine: 'underline',
                  },
                }}
              >
                All shops
              </Typography>
            </Box>
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              paddingY: '10px',
            }}
          >
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography variant="h5">Review your shop</Typography>
              <IconButton
                onClick={handleAddNewProduct}
                sx={{
                  borderRadius: 1000,
                  background: colors.primary,
                  padding: '5px',
                }}
              >
                <EditIcon
                  sx={{
                    width: '15px',
                    height: '15px',
                    color: colors.text2,
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              paddingTop: '10px',
            }}
          >
            <Typography variant="h6">Shop Details</Typography>
            <Box
              sx={{
                width: '70%',

                paddingTop: '10px',

                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {displayList.map((item) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(50% - 5px)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '300',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              paddingTop: '10px',
            }}
          >
            <Typography variant="h6">Shop Price Records</Typography>
            <TableContainer
              sx={{
                paddingTop: '10px',
                flex: 1,
                background: colors.background,
                transition: 'background 1s ease',
                color: colors.text,
              }}
            >
              <Table
                stickyHeader
                sx={{
                  '.MuiTableCell-root': {
                    color: colors.text3,
                    transition: 'background 1s ease',
                    paddingY: '7px',
                    fontFamily: 'Roboto',
                    fontWeight: '400',
                    fontSize: '14px',
                    ':hover': {
                      color: colors.primary,
                    },
                  },
                  '.MuiTableRow-root': {
                    background: colors.background,
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                    },
                  },
                  '.MuiTableCell-head': {
                    fontWeight: '300',
                    color: 'grey',
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                      }}
                    >
                      DATE
                    </TableCell>
                    <TableCell>PRICE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shop?.data?.map((item) => (
                    <TableRow key={item.date}>
                      <TableCell
                        sx={{
                          paddingLeft: 0,
                        }}
                      >
                        {' '}
                        {formatDate(new Date(item.date))}
                      </TableCell>
                      <TableCell>
                        {item.price === -1
                          ? 'No Data'
                          : formatMoney(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Tab>
      <Zoom
        in={isActive}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${isActive ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab
          sx={{
            padding: '10px',
            position: 'fixed',
            bottom: '30px',
            right: '30px',
          }}
          variant="extended"
          size="medium"
          color="primary"
          onClick={handleScrollToTop}
        >
          <NavigationIcon sx={{ mr: 1, fontSize: 18 }} />
          Scroll to top
        </Fab>
      </Zoom>
    </Box>
  );
}
