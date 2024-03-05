import {
  Sidebar as RNSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from 'react-pro-sidebar';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';

export default function Sidebar() {
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
        }}
        toggled={openSidebar}
        breakPoint="md"
        onBackdropClick={() => setOpenSidebar()}
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem component={<Link to="/home" />}> Price Tracker</MenuItem>
          <MenuItem component={<Link to="/add" />}> Add Product </MenuItem>
          <MenuItem component={<Link to="/add" />}> Add Website </MenuItem>
          <MenuItem component={<Link to="/setting" />}> Setting </MenuItem>
        </Menu>
      </RNSidebar>
    </div>
  );
}
