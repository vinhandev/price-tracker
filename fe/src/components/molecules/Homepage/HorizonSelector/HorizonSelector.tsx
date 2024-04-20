import { useStore } from '../../../../store/useStore';
import { ButtonGroup, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useColors, useDeleteProduct, useEditProduct } from '@/hooks';
import { Button } from '@/components';
import { DEFAULT_IMAGE } from '@/constants';
import { convertLabelToUrl, getPath } from '@/utils';
import { Selector } from '@/components/atoms/Inputs/Selector/Selector';
export default function HorizonSelector() {
  const colors = useColors();
  const navigation = useNavigate();

  const prices = useStore((state) => state.prices);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);
  const selectedShop = useStore((state) => state.selectedShop);
  const product = useStore((state) => state.selectedProduct);

  const { updateProduct } = useEditProduct();
  const { deleteProduct } = useDeleteProduct();

  const productSelectedData = prices.find(
    (item) => item.label === selectedProduct
  );

  const shopSelectedData = productSelectedData?.data?.find(
    (item) => item.name === selectedShop
  );

  const handleOpenLink = () => {
    const url = prices
      .find((item) => item.label === product)
      ?.data.find((item) => item.name === selectedShop)?.link;
    if (url) {
      window.open(url);
    }
  };

  const handleUpdateShop = () => {
    navigation(
      getPath({
        path: 'UPDATE_WEBSITE',
        params: {
          productId: convertLabelToUrl(selectedProduct),
          shopId: convertLabelToUrl(selectedShop),
        },
      })
    );
  };

  const handleDelete = async () => {
    await deleteProduct();
  };

  const handleUpdateProduct = async () => {
    await updateProduct();
  };

  return (
    <Stack gap={2} paddingTop={2}>
      <Stack gap={2} direction={'row'}>
        <Stack
          sx={{
            width: undefined,
            aspectRatio: 1,
            height: 60,

            padding: '5px',
            borderRadius: 1,

            background: colors.border,
          }}
        >
          <img
            style={{ height: '100%', width: '100%' }}
            src={shopSelectedData?.avatar ?? DEFAULT_IMAGE}
          />
        </Stack>
        <Stack>
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
            {productSelectedData?.label ?? ' '}
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
            {shopSelectedData?.name ?? ' '}
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
        </Stack>
      </Stack>
      <ButtonGroup
        variant="outlined"
        aria-label="Basic button group"
        sx={{
          width: '100%',
          height: '40px',
          button: {
            // width: '100%',
            display: 'flex',
            flex: 1,
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: '500',
            color: colors.primary,
          },
        }}
      >
        <Button onClick={handleUpdateProduct}>Edit Product</Button>
        <Button onClick={handleUpdateShop}>Edit Shop</Button>
        <Button onClick={handleDelete}>Delete Shop</Button>
      </ButtonGroup>
      <Stack gap={1}>
        <Selector
          value={selectedProduct}
          onChange={(value) => {
            setSelectedProduct(value);
            const paramShop =
              prices.find((item) => item.label === value)?.data?.[0]?.name ??
              '';
            setSelectedShop(paramShop);
          }}
          label={'Products'}
          data={
            prices.map((item) => {
              return {
                label: item.label,
                value: item.label,
              };
            }) ?? []
          }
        />

        <Selector
          value={selectedShop}
          onChange={(value) => {
            setSelectedShop(value);
          }}
          label={'Shops'}
          data={
            productSelectedData?.data.map((item) => {
              return {
                label: item.name,
                value: item.name,
              };
            }) ?? []
          }
        />
      </Stack>
    </Stack>
  );
}
