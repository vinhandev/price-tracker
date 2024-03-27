import Tab from '@/HOCs/Tab';
import { useStore } from '../../store/useStore';
import { useUser } from '../../store/useUser';
import { updateFirebasePrices } from '../../utils/firebase';
import { showError } from '../../utils/helper';
import { Box, Button } from '@mui/material';

export default function SettingScreen() {
  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const setLoading = useStore((state) => state.setLoading);

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

  return (
    <div
      style={{
        padding: 20,
        width: '100%',
      }}
    >
      <Tab title="Setting">
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          paddingTop:'20px'
        }}>
          <Button
            onClick={onDeleteAllRecords}
            color="error"
            variant="contained"
          >
            Delete all record
          </Button>
          <Button onClick={onDeleteAllData} color="error" variant="contained">
            Delete all data
          </Button>
        </Box>
      </Tab>
    </div>
  );
}
