import {
  Sidebar as RNSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useStore } from '../../../../store/useStore';
import { Box } from '@mui/material';
import { DarkModeButton } from '@/components';
import { ContactUs } from '../..';
import { useColors } from '@/hooks';

type Props = {
  navBarList: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }[][];
};
export default function Sidebar({ navBarList }: Props) {
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
      }}
    >
      <RNSidebar
        rootStyles={{
          height: '100%',
          width: '100%',
          paddingRight: '30px',
          background: colors.background2,

          borderWidth: 0,

          [`.${sidebarClasses.container}`]: {
            margin: 0,
            padding: 0,

            color: colors.text,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        toggled={openSidebar}
        breakPoint="md"
        onBackdropClick={() => setOpenSidebar()}
      >
        <Menu
          menuItemStyles={{
            button: {
              background: colors.background2,
              marginLeft: 30,
              paddingLeft: 0,
              paddingRight: 30,
              height: 40,
              marginBottom: 10,

              fontWeight: '300',

              transition: 'all 0.3s ease',

              [`&.ps-active`]: {
                color: colors.text,
                fontWeight: '500',
                borderBottom: '2px solid ' + colors.primary,
              },
              [`&.ps-active:hover`]: {
                color: colors.text,
                background: colors.background2,
              },
              [`&:hover`]: {
                color: isDarkMode ? 'white' : 'black',
                background: colors.background2,
                borderBottom: '2px solid ' + colors.primary,
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
                        marginLeft: '30px',
                        height: '1px',
                        width: '100%',
                        backgroundColor: colors.border,
                        marginY: 1,
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
                      </MenuItem>
                    );
                  })}
                </div>
              );
            })}
          </Box>
        </Menu>
        <Box>
          <Box sx={{ paddingLeft: '30px' }}>
            <DarkModeButton key={new Date().toString()} />
          </Box>
          <Box sx={{ paddingLeft: '30px', paddingTop: '20px' }}>
            <ContactUs />
          </Box>
        </Box>
      </RNSidebar>
    </Box>
  );
}
