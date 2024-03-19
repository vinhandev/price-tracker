import { Box } from '@mui/material';
import { useStore } from '../../../../store/useStore';
import './DarkModeButton.css';
export default function DarkModeButton() {
  const setDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <Box>
      <input
        value={isDarkMode === true ? 'checked' : ''}
        onChange={() => setDarkMode()}
        type="checkbox"
        id="darkmode-toggle"
      />
      <label htmlFor="darkmode-toggle" />
    </Box>
  );
}
