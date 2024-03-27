import Tab from '@/HOCs/Tab';
import { useStore } from '../../store/useStore';
import { useUser } from '../../store/useUser';
import { updateFirebasePrices } from '../../utils/firebase';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Label } from '@/components/atoms';
import RatingTab from '@/components/molecules/RatingTab/RatingTab';
import { showError } from '@/utils';

export default function SettingScreen() {
  const user = useUser((state) => state.user);

  const themeIndex = useUser((state) => state.themeIndex);
  const setThemeIndex = useUser((state) => state.setThemeIndex);

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        height: '100%',
      }}
    >
      <Tab title="Setting">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            paddingTop: '20px',
          }}
        >
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
      <Tab title="Graph Theme">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            paddingTop: '20px',
          }}
        >
          <FormControl>
            <Label label="Theme" />
            <RadioGroup
              value={themeIndex}
              onChange={(e) => setThemeIndex(Number(e.target.value))}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Night Volcano"
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Deep Sea"
              />
              <FormControlLabel value="2" control={<Radio />} label="Peace" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Tab>
      <RatingTab />
    </Box>
  );
}
