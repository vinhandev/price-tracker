import { useStore } from '../../../../store/useStore';
import { useUser } from '../../../../store/useUser';
import { updateFirebasePrices } from '../../../../utils/firebase';
import { showError } from '../../../../utils/helper';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '@/hooks';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components';
export default function HorizonSelector() {
  const colors = useColors();
  const navigation = useNavigate();

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

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      product: product,
      shop: selectedShop,
    },
    values: {
      product: product,
      shop: selectedShop,
    },
  });

  const onSubmit = (data: { product: string; shop: string }) => {
    setSelectedProduct(data.product);
    setSelectedShop(data.shop);
  };

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

  const watchProduct = watch('product');
  useEffect(() => {
    if (watchProduct) {
      setSelectedProduct(watchProduct);
      const selectedShop = prices.find((item) => item.label === watchProduct)
        ?.data[0].name;
      setSelectedShop(selectedShop ?? '');
    }
  }, [watchProduct]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '10px',

        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',

          width: '100%',
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

        <FormInput
          variant="dropdown"
          control={control}
          name="product"
          data={
            prices.map((item) => {
              return {
                label: item.label,
                value: item.label,
              };
            }) ?? []
          }
          label="Products"
        />
        <FormInput
          variant="dropdown"
          control={control}
          name="shop"
          data={
            productSelectedData?.data.map((item) => {
              return {
                label: item.name,
                value: item.name,
              };
            }) ?? []
          }
          label="Shops"
        />
      </Box>

      <Button
        sx={{
          height: 50,
        }}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Search Product
      </Button>
    </Box>
  );
}
