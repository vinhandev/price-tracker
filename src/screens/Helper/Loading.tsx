import { Backdrop, Box, Typography } from '@mui/material';
import { useStore } from '../../store/useStore';

export default function Loading({
  count,
  currentProduct,
  currentShop,
}: {
  count: number;
  currentProduct: string;
  currentShop: string;
}) {
  const isLoading = useStore((state) => state.isLoading);
  const prices = useStore((state) => state.prices);
  if (!prices) return null;
  return (
    <Backdrop
      open={isLoading}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box>
        {currentShop && (
          <Typography
            textAlign={'center'}
            sx={{
              fontWeight: '300',
            }}
          >
            {currentProduct}
          </Typography>
        )}
        {currentProduct && (
          <Typography
            textAlign={'center'}
            sx={{
              fontSize: '40px',
            }}
          >
            {currentShop}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div className="spinner-border" role="status" />
        {prices.length > 0 && count > 0 && (
          <div>{((count * 100) / prices?.length).toFixed(2)}%</div>
        )}
      </Box>
    </Backdrop>
  );
}
