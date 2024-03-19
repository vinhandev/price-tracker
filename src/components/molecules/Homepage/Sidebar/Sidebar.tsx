import {
  Sidebar as RNSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useStore } from '../../../../store/useStore';
import { Colors } from '@/assets/colors';
import { Box } from '@mui/material';

type Props = {
  navBarList: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }[][];
};
export default function Sidebar({ navBarList }: Props) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const openSidebar = useStore((state) => state.openSidebar);
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);
  return (
    <div>
      <RNSidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            color: isDarkMode ? 'white' : 'black',
          },
          borderWidth: 0,
        }}
        toggled={openSidebar}
        breakPoint="md"
        onBackdropClick={() => setOpenSidebar()}
      >
        <Menu
          menuItemStyles={{
            button: {
              marginLeft: 30,
              paddingLeft: 0,
              paddingRight: 30,
              height: 40,
              marginBottom: 10,

              fontWeight: '300',

              transition: 'all 0.3s ease',

              [`&.ps-active`]: {
                color: Colors.text,
                fontWeight: '500',
                borderBottom: '2px solid ' + Colors.primary,
              },
              [`&.ps-active:hover`]: {
                color: Colors.text,
                background: Colors.background2,
              },
              [`&:hover`]: {
                color: isDarkMode ? 'white' : 'black',
                background: Colors.background2,
                borderBottom: '2px solid ' + Colors.primary,
              },
            },
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
                      backgroundColor: Colors.border,
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
        </Menu>
      </RNSidebar>
    </div>
  );
}
