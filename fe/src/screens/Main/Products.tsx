import {
  Box,
  Divider,
  Fab,
  IconButton,
  Stack,
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
import { useAddNewProduct, useColors } from '@/hooks';
import { useStore } from '@/store';
import { SkeletonWrapper, Tab } from '@/HOCs';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { convertLabelToUrl, getPath } from '@/utils';

export default function ProductsScreen() {
  const theme = useTheme();
  const colors = useColors();
  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);

  const isActive = scrollPosition > 0;

  const prices = useStore((state) => state.prices);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const { addProduct } = useAddNewProduct();

  const priceList = useMemo(() => {
    const tmpList: {
      label: string;
      numOfWebsites: number;
    }[] = [];
    prices?.map((item) => {
      tmpList.push({
        label: item.label,
        numOfWebsites: item?.data?.length ?? 0,
      });
    });
    return tmpList.sort((a, b) => b.numOfWebsites - a.numOfWebsites);
  }, [prices]);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleAddProduct = async () => {
    await addProduct();
  };

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
    <SkeletonWrapper>
      <Stack
        sx={{
          flex: 1,
        }}
      >
        <Tab style={{ flex: 1 }}>
          <Stack
            sx={{
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: colors.text,
                }}
              >
                Products
              </Typography>
              <IconButton
                onClick={handleAddProduct}
                sx={{
                  borderRadius: 1000,
                  background: colors.primary,
                  padding: '2px',
                  transition: 'background 0.3s ease',
                  ':hover': {
                    background: `${colors.primary}DD`,
                  },
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
            {priceList.length > 0 ? (
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
                      background: colors.background,
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
                      transition: 'background 1s ease',
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
                          setSelectedProduct(item.label);
                          navigate(
                            getPath({
                              path: 'PRODUCT',
                              params: {
                                productId: convertLabelToUrl(item.label),
                              },
                            })
                          );
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
            ) : (
              <Box>
                <Divider />
                <Typography
                  sx={{
                    paddingTop: 2,
                    color: colors.text,
                    fontSize: '12px',
                    fontWeight: '300',
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                  }}
                >
                  No data.
                </Typography>
              </Box>
            )}
          </Stack>
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
      </Stack>
    </SkeletonWrapper>
  );
}
