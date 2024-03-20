import { Box } from '@mui/material';
import { useStore } from '../../../../store/useStore';
import './DarkModeButton.css';

function DarkModeButton() {
  const setDarkMode = useStore((state) => state.setDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  console.log('isDarkMode', isDarkMode);

  return (
    <Box>
      <input
        className="input"
        value={isDarkMode ? 'checked' : undefined}
        onChange={() => setDarkMode()}
        type="checkbox"
        id="darkmode-toggle"
      />
      <label className='label' htmlFor="darkmode-toggle" />
    </Box>
  );
}

export default DarkModeButton;
