import Tab from '@/HOCs/Tab';
import { useStore } from '../../store/useStore';
import { useUser } from '../../store/useUser';
import { updateFirebasePrices, updateMetadata } from '../../utils/firebase';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Switch,
} from '@mui/material';
import { Label } from '@/components/atoms';
import RatingTab from '@/components/molecules/RatingTab/RatingTab';
import { alphaToHex, showError } from '@/utils';
import { Button } from '@/components';
import { graphTheme } from '@/assets/colors';
import { useMemo } from 'react';
import { updateAllData } from '@/services';

export default function SettingScreen() {
  const user = useUser((state) => state.user);

  const themeIndex = useStore((state) => state.themeIndex);
  const setThemeIndex = useStore((state) => state.setThemeIndex);

  const opacity = useStore((state) => state.opacity);
  const setOpacity = useStore((state) => state.setOpacity);

  const prices = useStore((state) => state.prices);
  const setLoading = useStore((state) => state.setLoading);

  const isShowBreadcrumb = useStore((state) => state.isShowBreadcrumb);
  const setIsShowBreadcrumb = useStore((state) => state.setIsShowBreadcrumb);

  const isUseDrawer = useStore((state) => state.isUseDrawer);
  const setIsUseDrawer = useStore((state) => state.setIsUseDrawer);

  const isUseBiggerNavigation = useStore((state) => state.isUsePagePagination);
  const setIsUseBiggerNavigation = useStore(
    (state) => state.setIsUsePagePagination
  );

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

  const handleUpdateData = async () => {
    setLoading(true);
    try {
      await updateAllData();
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };

  const handleUpdateShowBreadcrumb = async (param: boolean) => {
    setLoading(true);
    try {
      await updateMetadata(user?.uid ?? '', {
        themeIndex,
        opacity,
        isShowBreadcrumb: param,
        isUseDrawer,
        isUseBiggerPagination: isUseBiggerNavigation,
      });
      setIsShowBreadcrumb(param);
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };
  const handleUpdateUseDrawer = async (param: boolean) => {
    setLoading(true);
    try {
      await updateMetadata(user?.uid ?? '', {
        themeIndex,
        opacity,
        isShowBreadcrumb,
        isUseDrawer: param,
        isUseBiggerPagination: isUseBiggerNavigation,
      });
      setIsUseDrawer(param);
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };
  const handleUpdateUseBiggerNavigation = async (param: boolean) => {
    setLoading(true);
    try {
      await updateMetadata(user?.uid ?? '', {
        themeIndex,
        opacity,
        isShowBreadcrumb,
        isUseDrawer,
        isUseBiggerPagination: param,
      });
      setIsUseBiggerNavigation(param);
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };

  const linearGradient = useMemo(() => {
    return `linear-gradient(180deg ${graphTheme[themeIndex].reduce(
      (item, result) => {
        return ` ${item}, ${result}${alphaToHex(opacity)}`;
      },
      ''
    )})`;
  }, [opacity, themeIndex]);

  console.log(linearGradient, alphaToHex(opacity), opacity);

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
        <Box>
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
            <Button onClick={handleUpdateData} variant="contained">
              Update all user data
            </Button>
          </Box>
          <FormControl>
            <FormControlLabel
              checked={isShowBreadcrumb}
              onChange={async (_, checked) => {
                await handleUpdateShowBreadcrumb(checked);
              }}
              label="Show breadcrumb"
              control={<Switch />}
            />
            <FormControlLabel
              checked={isUseDrawer}
              onChange={async (_, checked) =>
                await handleUpdateUseDrawer(checked)
              }
              label="Use Drawer"
              control={<Switch />}
            />
            <FormControlLabel
              checked={isUseBiggerNavigation}
              onChange={async (_, checked) =>
                handleUpdateUseBiggerNavigation(checked)
              }
              label="Use bigger pagination"
              control={<Switch />}
            />
          </FormControl>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: 1,
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
            <FormControl>
              <Label label="Opacity" />
              <Slider
                aria-label="Volume"
                value={opacity}
                onChange={(_, value) => {
                  setOpacity(Number(value));
                  console.log(value);
                }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                background: linearGradient,
              }}
            />
          </Box>
        </Box>
      </Tab>
      <RatingTab />
    </Box>
  );
}
