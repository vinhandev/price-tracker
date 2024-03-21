import { Box, InputLabel } from '@mui/material';
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
      <InputLabel
        htmlFor="darkmode-toggle"
        sx={{
          width: '60px',
          height: '30px',
          position: 'relative',
          display: 'block',
          background: isDarkMode ? '#242424' : '#ebebeb',
          borderRadius: '30px',
          boxShadow:
            'inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
          transition: '1s',
          '::after': {
            left: isDarkMode ? 'calc(100% - 5px)' : '5px',
            background: isDarkMode
              ? 'linear-gradient(180deg, #777, #3a3a3a)'
              : 'linear-gradient(180deg, #ffcc89, #d8860b)',
            transform: isDarkMode ? 'translateX(-100%)' : 'translateX(0)',

            content: "''",
            width: '26px',
            height: '26px',
            position: 'absolute',
            top: '2px',
            borderRadius: '18px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            transition: '0.5s',
          },
          ':active': {
            '::after': {
              width: '26px',
            },
          },
        }}
      />
    </Box>
  );
}

export default DarkModeButton;
