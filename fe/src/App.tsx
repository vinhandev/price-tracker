import { Box } from '@mui/material';
import { FontProvider, ToastProvider } from './HOCs';
import { useColors } from './hooks';
import RouterProvider from './routes/RouterProvider';

export default function App() {
  const colors = useColors();
  return (
    <Box
      sx={{
        backgroundColor: colors.background2,
        
      }}
    >
      <FontProvider>
        <ToastProvider>
          <RouterProvider />
        </ToastProvider>
      </FontProvider>
    </Box>
  );
}
