import { useStore } from '../../../../store/useStore';
import { Box, ButtonGroup, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColors } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Button, FormInput } from '@/components';
export default function HorizonSelector() {
  const colors = useColors();
  const navigation = useNavigate();


  const prices = useStore((state) => state.prices);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);
  const selectedShop = useStore((state) => state.selectedShop);
  const product = useStore((state) => state.selectedProduct);

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

  const handleOpenLink = () => {
    const url = prices
      .find((item) => item.label === product)
      ?.data.find((item) => item.name === selectedShop)?.link;
    if (url) {
      window.open(url);
    }
  };

  const handleUpdateProduct = () => {
    navigation('/update_product');
  };

  const handleUpdateShop = () => {
    navigation('/update_shop');
  };

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
            onClick={handleUpdateProduct}
            sx={{
              flex: 1,
              flexDirection: 'column',
              color: colors.primary,
              fontFamily: 'Roboto',
              fontSize: '10px',
            }}
          >
            Edit Product
          </Button>
          <Button
            onClick={handleUpdateShop}
            sx={{
              flex: 1,
              flexDirection: 'column',
              color: colors.primary,
              fontFamily: 'Roboto',
              fontSize: '10px',
            }}
          >
            Edit Shop
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
