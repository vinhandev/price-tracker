import {
  Sidebar as RNSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useStore } from '../../store/useStore';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  const isDarkMode = useStore((state) => state.isDarkMode);
  const openSidebar = useStore((state) => state.openSidebar);
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);
  return (
    <div>
      <RNSidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: isDarkMode ? 'black' : 'white',
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
              borderRadius: 10,

              [`&.ps-active`]: {
                backgroundColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#000' : '#b6c8d9',
              },
              [`&.ps-active:hover`]: {
                backgroundColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#000' : '#b6c8d9',
              },
              [`&:hover`]: {
                backgroundColor: isDarkMode ? 'black' : 'white',
                color: isDarkMode ? 'white' : 'black',
              },
            },
          }}
        >
          <MenuItem
            active={pathname === '/home'}
            component={<Link to="/home" />}
          >
            Price Tracker
          </MenuItem>
          <MenuItem active={pathname === '/add'} component={<Link to="/add" />}>
            Add Shop
          </MenuItem>
        </Menu>
      </RNSidebar>
    </div>
  );
}
