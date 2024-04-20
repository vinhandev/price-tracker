import { Box, Typography } from '@mui/material';
import { useStore } from '../../store/useStore';

export default function Init() {
  const isLoading = useStore((state) => state.isInit);
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
        backdropFilter: 'blur(50px)',
        color: '#ffffff',
        transition: 'all 0.3s ease',
      }}
    >
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
      </Box>
      <Box>
        <Typography
          textAlign={'center'}
          sx={{
            fontWeight: '300',
          }}
        >
          loading data...
        </Typography>
      </Box>
    </div>
  );
}
