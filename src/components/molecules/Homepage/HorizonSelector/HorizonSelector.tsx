import { GroupPriceProps } from '@/types';
import { useStore } from '../../../../store/useStore';
import { useUser } from '../../../../store/useUser';
import { updateFirebasePrices } from '../../../../utils/firebase';
import { showError } from '../../../../utils/helper';
import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '@/hooks';
export default function HorizonSelector() {
  const colors = useColors();
  const navigation = useNavigate();
  const [tempSelectedShop, setTempSelectedShop] = React.useState('');

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);
  const selectedShop = useStore((state) => state.selectedShop);
  const product = useStore((state) => state.selectedProduct);
  const setLoading = useStore((state) => state.setLoading);
  const labels = useStore((state) => state.labels);

  const productSelectedData = prices.find(
    (item) => item.label === selectedProduct
  );

  const shopSelectedData = productSelectedData?.data?.find(
    (item) => item.name === selectedShop
  );

  const handleChangeShopName = async () => {
    const text = prompt('Change shop name', selectedShop);
    if (text && user) {
      setLoading(true);
      try {
        const tmpPrices = prices.map((item) => {
          if (item.label === product) {
            return {
              ...item,
              data: item.data.map((subItem) => {
                if (subItem.name === selectedShop) {
                  return {
                    ...subItem,
                    name: text,
                  };
                }
                return subItem;
              }),
            };
          }
          return item;
        });
        await updateFirebasePrices(user?.uid, {
          labels,
          prices: tmpPrices,
          lastUpdate: new Date().getTime(),
        });
        window.location.reload();
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
  };

  const handleOpenLink = () => {
    const url = prices
      .find((item) => item.label === product)
      ?.data.find((item) => item.name === selectedShop)?.link;
    if (url) {
      window.open(url);
    }
  };

  const handleDelete = async () => {
    if (user) {
      setLoading(true);
      try {
        const tmpPrices = prices.map((item) => {
          if (item.label === product) {
            const tmpShop = item.data.filter((subItem) => {
              return subItem.name !== selectedShop;
            });

            return {
              label: item.label,
              data: tmpShop,
            };
          }
          return item;
        });

        await updateFirebasePrices(user?.uid, {
          labels,
          prices: tmpPrices,
          lastUpdate: new Date().getTime(),
        });
        window.location.reload();
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
  };

  // const handleChangeProductName = async () => {
  //   const text = prompt('Change product name', product);
  //   setLoading(true);
  //   try {
  //     if (text && user) {
  //       const tmpPrices = prices.map((item) => {
  //         if (item.label === product) {
  //           return {
  //             ...item,
  //             label: text,
  //           };
  //         }
  //         return item;
  //       });
  //       await updateFirebasePrices(user?.uid, {
  //         prices: tmpPrices,
  //         labels,
  //         lastUpdate: new Date().getTime(),
  //       });
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     showError(error);
  //   }
  //   setLoading(false);
  // };
  // const handleDeleteProduct = async () => {
  //   setLoading(true);
  //   try {
  //     if (user) {
  //       const tmpPrices = prices.filter((item) => {
  //         return item.label !== product;
  //       });
  //       await updateFirebasePrices(user?.uid, {
  //         prices: tmpPrices,
  //         labels,
  //         lastUpdate: new Date().getTime(),
  //       });
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     showError(error);
  //   }
  //   setLoading(false);
  // };

  const handleSelectProduct = (item: GroupPriceProps) => {
    setSelectedProduct(item.label);
    setSelectedShop(item.data[0].name);
    setTempSelectedShop(() => item.data[0].name);
  };

  const handleSelectShop = (item: string) => {
    setSelectedShop(item);
  };

  useEffect(() => {
    if (tempSelectedShop === '') {
      setTempSelectedShop(selectedShop);
    }
  }, [selectedShop]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '10px',

        height: '100%',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,

          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              height: 50,
              padding: '5px',
              width: undefined,
              aspectRatio: 1,
              borderRadius: 1,
              background: colors.border,

              marginY: 1,
            }}
          >
            <img
              style={{ height: '100%', width: '100%' }}
              src={shopSelectedData?.avatar ?? undefined}
            />
          </Box>
          <Box>
            <Typography
              noWrap={false}
              onClick={handleOpenLink}
              sx={{
                color: colors.text,
                lineHeight: '20px',
                fontSize: 10,
                fontWeight: '300',
                fontFamily: 'Roboto',
                cursor: 'pointer',
                '&:hover': {
                  textDecorationLine: 'underline',
                },
              }}
            >
              {productSelectedData?.label}
            </Typography>
            <Typography
              noWrap={false}
              variant="h6"
              onClick={handleOpenLink}
              sx={{
                fontFamily: 'Roboto',
                color: colors.text,
                lineHeight: '20px',
                cursor: 'pointer',
                '&:hover': {
                  textDecorationLine: 'underline',
                },
              }}
            >
              {shopSelectedData?.name}
            </Typography>
            <Typography
              noWrap={false}
              variant="body1"
              sx={{
                fontFamily: 'Roboto',
                color: colors.text,
                lineHeight: '20px',
                fontSize: 10,
                fontWeight: '300',

                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
              }}
            >
              {shopSelectedData?.link}
            </Typography>
          </Box>
        </Box>
        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          sx={{
            height: '40px',
            borderColor: colors.red,
            '.MuiButtonGroup-root': {
              borderColor: colors.red,
            },
          }}
        >
          <Button
            onClick={handleChangeShopName}
            sx={{
              flex: 1,
              flexDirection: 'column',
              color: colors.primary,
              fontFamily: 'Roboto',
              fontSize: '10px',
            }}
          >
            Edit Name
          </Button>
          <Button
            onClick={() => {
              navigation('/update');
            }}
            sx={{
              flex: 1,
              flexDirection: 'column',
              color: colors.primary,
              fontFamily: 'Roboto',
              fontSize: '10px',
            }}
          >
            Edit Link
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              flex: 1,
              flexDirection: 'column',
              color: colors.primary,
              fontFamily: 'Roboto',
              fontSize: '10px',
            }}
          >
            Delete Shop
          </Button>
        </ButtonGroup>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: '300',
              lineHeight: '20px',
              color: colors.text,
              fontFamily: 'Roboto',
            }}
          >
            Product
          </Typography>
          <Select
            sx={{
              color: colors.text,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSelect-icon': {
                color: colors.text,
              },
              borderColor: colors.text,
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedProduct}
          >
            {prices.map((item) => {
              return (
                <MenuItem
                  key={item.label}
                  value={item.label}
                  onClick={() => handleSelectProduct(item)}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: '300',
              lineHeight: '20px',
              color: colors.text,
              fontFamily: 'Roboto',
            }}
          >
            Shop
          </Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tempSelectedShop}
            sx={{
              color: colors.text,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(228, 219, 233, 0.25)',
              },
              '.MuiSelect-icon': {
                color: colors.text,
              },
              borderColor: colors.text,
            }}
          >
            {productSelectedData?.data?.map((item) => {
              return (
                <MenuItem
                  key={item.name}
                  value={item.name}
                  onClick={() => setTempSelectedShop(item.name)}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      </Box>

      <Button
        sx={{
          height: 50,
        }}
        variant="contained"
        onClick={() => handleSelectShop(tempSelectedShop)}
      >
        Search Product
      </Button>
    </Box>
  );
}
