import { Box, Typography } from '@mui/material';
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
    <div
      style={{
        display: isLoading ? 'flex' : 'none',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        backdropFilter:
          prices.length > 0 && count > 0
            ? `blur(${50 - (50 * count) / prices.length}px)`
            : 'blur(50px)',
        transition: 'all 0.3s ease',
      }}
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
    </div>
  );
}
