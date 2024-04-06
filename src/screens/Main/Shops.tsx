import {
  Box,
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
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { Selector } from '@/components/atoms/Inputs/Selector/Selector';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@/components';

export default function ShopsScreen() {
  const theme = useTheme();
  const colors = useColors();
  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);

  const isActive = scrollPosition > 0;

  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);
  const prices = useStore((state) => state.prices);

  const priceList = useMemo(() => {
    const tmpList: {
      label: string;
      numOfWebsites: number;
    }[] = [];
    prices
      ?.filter((item) => item.label === selectedProduct)
      .map((item) => {
        item.data?.map((subItem) => {
          tmpList.push({
            label: subItem.name,
            numOfWebsites: item?.data?.length ?? 0,
          });
        });
      });
    return tmpList.sort((a, b) => b.numOfWebsites - a.numOfWebsites);
  }, [prices, selectedProduct]);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleDeleteProduct = () => {
    
  };

  async function handleAddNewProduct() {
    navigate('/add');
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
      }}
    >
      <Tab>
        <Box>
          <Link
            style={{
              textDecoration: 'none',
              color: colors.primary,
            }}
            to="/products"
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
                All products
              </Typography>
            </Box>
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography variant="h5">Shops</Typography>
              <IconButton
                onClick={handleAddNewProduct}
                sx={{
                  borderRadius: 1000,
                  background: colors.primary,
                  padding: '2px',
                }}
              >
                <AddIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                    color: colors.text2,
                  }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Button onClick={handleDeleteProduct} color="error" variant="outlined">
                Delete Shop
              </Button>
              <Selector
                data={
                  prices?.map((item) => ({
                    label: item.label,
                    value: item.label,
                  })) ?? []
                }
                value={selectedProduct}
                onChange={(value) => {
                  const shop = prices?.find((item) => item.label === value)
                    ?.data[0];
                  setSelectedProduct(value);
                  setSelectedShop(shop?.name ?? '');
                }}
              />
            </Box>
          </Box>
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
                    NAME
                  </TableCell>
                  <TableCell>SHOPS' QUANTITY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceList.map((item) => (
                  <TableRow
                    key={item.label}
                    onClick={() => {
                      setSelectedShop(item.label);
                      navigate('/shop');
                    }}
                  >
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                      }}
                    >
                      {item.label}
                    </TableCell>
                    <TableCell>{item.numOfWebsites}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
