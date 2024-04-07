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
  Stack,
  Switch,
} from '@mui/material';
import { Label } from '@/components/atoms';
import RatingTab from '@/components/molecules/RatingTab/RatingTab';
import { alphaToHex, showError } from '@/utils';
import { Button, ConfirmDialog } from '@/components';
import { graphTheme } from '@/assets/colors';
import { useMemo, useState } from 'react';
import { updateAllData } from '@/services';
import { useColors } from '@/hooks';

export default function SettingScreen() {
  const colors = useColors();
  const [open, setOpen] = useState(false);
  const [onPress, setOnPress] = useState<() => void>(() => {});
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

  const isDarkMode = useStore((state) => state.isDarkMode);

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
        isDarkMode,
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
        isDarkMode,
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
        isDarkMode,
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

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMetadata(user?.uid ?? '', {
        themeIndex,
        opacity,
        isShowBreadcrumb,
        isUseDrawer,
        isUseBiggerPagination: isUseBiggerNavigation,
        isDarkMode,
      });
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}
    >
      <Tab title="Setting">
        <Stack sx={{ paddingTop: '20px' }} spacing={3}>
          <Stack spacing={1} direction={'row'}>
            <Button
              onClick={onDeleteAllRecords}
              color="error"
              variant="contained"
            >
              Delete all record
            </Button>
            <Button
              onClick={() => {
                setOnPress(() => onDeleteAllData);
                setOpen(() => true);
              }}
              color="error"
              variant="contained"
            >
              Delete all data
            </Button>
            <Button
              onClick={() => {
                setOnPress(() => handleUpdateData);
                setOpen(() => true);
              }}
              variant="contained"
            >
              Update all user data
            </Button>
          </Stack>
          <Stack spacing={1}>
            <FormControlLabel
              checked={isShowBreadcrumb}
              onChange={async (_, checked) => {
                await handleUpdateShowBreadcrumb(checked);
              }}
              label="Show breadcrumb"
              sx={{
                '.MuiTypography-root': {
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  color: colors.text,
                },
              }}
              control={<Switch />}
            />
            <FormControlLabel
              checked={isUseDrawer}
              onChange={async (_, checked) =>
                await handleUpdateUseDrawer(checked)
              }
              label="Use Drawer"
              sx={{
                '.MuiTypography-root': {
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  color: colors.text,
                },
              }}
              control={<Switch />}
            />
            <FormControlLabel
              checked={isUseBiggerNavigation}
              onChange={async (_, checked) =>
                handleUpdateUseBiggerNavigation(checked)
              }
              label="Use bigger pagination"
              sx={{
                '.MuiTypography-root': {
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  color: colors.text,
                },
              }}
              control={<Switch />}
            />
          </Stack>
        </Stack>
      </Tab>
      <Tab title="Graph Theme">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: '20px',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              width: '100%',
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
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Peace"
                  />
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
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Tab>
      <RatingTab />
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onPress={onPress}
      />
    </Box>
  );
}
