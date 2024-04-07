import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useStore, useUser } from '@/store';
import { Tab } from '@/HOCs';
import { showSuccess, updateFirebasePrices } from '@/utils';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/components/atoms/Inputs/TextInput/TextInput';
import { Button } from '@/components';
import { convertLabelToUrl, getPath } from '@/utils/route';

export default function ProductsScreen() {
  const theme = useTheme();
  const colors = useColors();
  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');

  const isActive = scrollPosition > 0;

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);
  const setLoading = useStore((state) => state.setLoading);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

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

  const handleClose = () => {
    setOpen(!open);
  };

  async function handleAddNewProduct() {
    if (user) {
      handleClose();
      setLoading(true);
      try {
        prices.push({
          label: newProductName,
          data: [],
        });
        await updateFirebasePrices(user?.uid, {
          prices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        showSuccess();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
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
      <Dialog
        sx={{
          '.MuiPaper-root': {
            width: 500,
            padding: '10px',
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <TextInput
            onChange={setNewProductName}
            value={newProductName}
            label="Name"
            errorText=""
            isError={false}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleAddNewProduct}>Add</Button>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Tab>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Typography variant="h5">Products</Typography>
            <IconButton
              onClick={handleClose}
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
