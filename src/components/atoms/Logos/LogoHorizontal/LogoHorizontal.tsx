import { useStore } from '@/store';
import { Box } from '@mui/material';
import logo_white from '@/assets/logo2.png';
import logo from '@/assets/logo.png';
export default function LogoHorizontal() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <Box>
      <img
        width="100%"
        height="100%"
        src={isDarkMode ? logo_white : logo}
        alt="price-tag-euro"
      />
    </Box>
  );
}
