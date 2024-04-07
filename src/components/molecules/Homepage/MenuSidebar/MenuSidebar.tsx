import { Menu, MenuItem } from 'react-pro-sidebar';
import { useStore } from '../../../../store/useStore';
import { Box, Grid, Tooltip } from '@mui/material';
import { DarkModeButton } from '@/components';
import { ContactUs } from '../..';
import { useColors } from '@/hooks';
import ReloadButton from '@/components/atoms/Buttons/ReloadButton/ReloadButton';
import { LogoHorizontal } from '@/components/atoms/Logos';

type Props = {
  onReload: () => void;
  navBarList: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }[][];
};
export default function MenuSidebar({ navBarList, onReload }: Props) {
  const colors = useColors();
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <Box
      sx={{
        background: colors.transparent,
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <Box
          sx={{
            width: 200,
          }}
        >
          <LogoHorizontal />
        </Box>
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
                        marginRight: '30px',
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
      </Box>
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
          <Tooltip title="Dark Mode">
            <DarkModeButton key={new Date().toString()} />
          </Tooltip>
          <Tooltip title="Reload">
            <ReloadButton onClick={onReload} />
          </Tooltip>
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
  );
}
