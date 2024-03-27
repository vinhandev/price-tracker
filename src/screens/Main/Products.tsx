import Tab from '@/HOCs/Tab';
import { useStore } from '../../store/useStore';
import { useUser } from '../../store/useUser';
import { updateFirebasePrices } from '../../utils/firebase';
import { showError } from '../../utils/helper';
import { Box, Fab, Zoom, useTheme } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useEffect, useState } from 'react';

export default function ProductsScreen() {
  const theme = useTheme();
  const user = useUser((state) => state.user);

  const [scrollPosition, setScrollPosition] = useState(0);

  const prices = useStore((state) => state.prices);
  const setLoading = useStore((state) => state.setLoading);

  const isActive = scrollPosition > 0;

  async function onDeleteAllRecords() {
    setLoading(true);
    try {
      const confirm = window.confirm('Are you sure?');
      if (confirm && user) {
        const tmpPrices = prices.map((item) => {
          const tmpProduct = item.data.map((subItem) => {
            return {
              ...subItem,
              data: [],
            };
          });
          return {
            ...item,
            data: tmpProduct,
          };
        });

        await updateFirebasePrices(user?.uid, {
          prices: tmpPrices,
          labels: [],
          lastUpdate: new Date().getTime(),
        });

        window.location.reload();
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }

  const onDeleteAllData = async () => {
    if (user) {
      setLoading(true);
      try {
        await updateFirebasePrices(user.uid, {
          prices: [],
          labels: [],
          lastUpdate: new Date().getTime(),
        });
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
  };

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
          <NavigationIcon sx={{ mr: 1,fontSize: 18 }} />
          Scroll to top
        </Fab>
      </Zoom>
    </Box>
  );
}
