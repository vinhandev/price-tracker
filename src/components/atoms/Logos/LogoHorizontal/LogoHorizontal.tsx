import { useStore } from '@/store';
import { Box } from '@mui/material';
export default function LogoHorizontal() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <Box>
      <img
        width="100%"
        height="100%"
        src={isDarkMode ? '/src/assets/logo2.png' : '/src/assets/logo.png'}
        alt="price-tag-euro"
      />
    </Box>
  );
}
