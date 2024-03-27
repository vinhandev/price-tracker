import { Box, Fab, Zoom, useTheme } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useEffect, useState } from 'react';

export default function ProductsScreen() {
  const theme = useTheme();

  const [scrollPosition, setScrollPosition] = useState(0);

  const isActive = scrollPosition > 0;

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        height: '200vh',
        width: '100%',
        background: 'red',
      }}
    >
      <Zoom
        in={isActive}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${isActive ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab
          sx={{
            padding: '10px',
            position: 'fixed',
            bottom: '30px',
            right: '30px',
          }}
          variant="extended"
          size="medium"
          color="primary"
          onClick={handleScrollToTop}
        >
          <NavigationIcon sx={{ mr: 1, fontSize: 18 }} />
          Scroll to top
        </Fab>
      </Zoom>
    </Box>
  );
}
