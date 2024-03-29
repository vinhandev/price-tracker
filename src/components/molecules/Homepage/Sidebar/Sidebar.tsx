import {
  Sidebar as RNSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useStore } from '../../../../store/useStore';
import { Box, Grid } from '@mui/material';
import { DarkModeButton } from '@/components';
import { ContactUs } from '../..';
import { useColors } from '@/hooks';
import ReloadButton from '@/components/atoms/Buttons/ReloadButton/ReloadButton';

type Props = {
  onReload: () => void;
  navBarList: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }[][];
};
export default function Sidebar({ navBarList, onReload }: Props) {
  const colors = useColors();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const openSidebar = useStore((state) => state.openSidebar);
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%',
        background: colors.background2,
        transition: 'background 1s ease',
      }}
    >
      <RNSidebar
        rootStyles={{
          height: '100%',
          width: '100%',
          background: colors.transparent,

          borderWidth: 0,

          [`.${sidebarClasses.container}`]: {
            background: colors.transparent,
            margin: 0,
            padding: 0,

            color: colors.text,
          },
        }}
        toggled={openSidebar}
        breakPoint="md"
        onBackdropClick={() => setOpenSidebar()}
      >
        <Box
          sx={{
            background: colors.transparent,
            height: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Menu
            menuItemStyles={{
              button: {
                background: colors.transparent,

                paddingLeft: 0,
                paddingRight: '30px',
                paddingBottom: '5px',
                marginBottom: 10,
                height: 'auto',
                fontFamily: 'Roboto',
                fontWeight: '300',
                fontSize: '15px',
                borderBottom: '2px solid #00000000',
                transition: 'all 0.3s ease',

                [`&.ps-active`]: {
                  color: colors.text,
                  fontWeight: '500',
                },
                [`&.ps-active:hover`]: {
                  color: colors.text,
                  background: colors.background2,
                },
                [`&:hover`]: {
                  color: isDarkMode ? 'white' : 'black',
                  background: colors.background2,
                  paddingLeft: '5px',
                },
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {navBarList.map((item, index) => {
                return (
                  <div>
                    {index !== 0 && (
                      <Box
                        sx={{
                          height: '1px',
                          backgroundColor: colors.border,
                          marginY: 1,
                          marginRight:'30px',
                        }}
                      />
                    )}

                    {item.map((item) => {
                      return (
                        <MenuItem
                          active={item.isActive}
                          component={<div onClick={item.onClick} />}
                        >
                          {item.label}
                          {
                            <Box
                              sx={{
                                width: item.isActive ? '100%' : 0,
                                height: '2px',
                                background: colors.primary,
                                transition: 'width 0.3s ease',
                              }}
                            />
                          }
                        </MenuItem>
                      );
                    })}
                  </div>
                );
              })}
            </Box>
          </Menu>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '10px',
                paddingRight: '30px',
              }}
            >
              <DarkModeButton key={new Date().toString()} />
              <ReloadButton onClick={onReload} />
            </Box>
            <Box
              sx={{
                paddingRight: '30px',
              }}
            >
              <ContactUs />
            </Box>
          </Grid>
        </Box>
      </RNSidebar>
    </Box>
  );
}
