import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  IconButton as MuiIconButton
} from '@mui/material';
import SearchBar from './components/SearchBar/SearchBar';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useStore, useUser } from '@/store';
import { useColors } from '@/hooks';
import { useState } from 'react';
import { logout } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components';
export default function Header() {
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);
  const navigation = useNavigate();
  const colors = useColors();
  const user = useUser((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setOpenSidebar();
  };

  const profileMenuProps = [
    {
      title: 'Profile',
      onClick: () => {
        navigation('/profile');
      },
    },
    {
      title: 'Log out',
      onClick: async () => {
        await logout();
        window.location.reload();
      },
    },
  ];

  return (
    <Stack sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 2,
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <SearchBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: colors.text,
              fontWeight: '300',
            }}
          >
            {user?.email}
          </Typography>

          <MuiIconButton>
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon />
            </Badge>
          </MuiIconButton>
          <Tooltip title="Account settings">
            <Avatar
              onClick={handleClick}
              alt="User"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcM04W6diLQBzw4Y4pXDhPgovRf7l1cBF0Q&usqp=CAU"
              sx={{
                ':hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{
              marginTop: '10px',
              '.MuiPaper-root': {
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                borderRadius: '10px',
              },
            }}
          >
            {profileMenuProps.map((item) => (
              <MenuItem
                sx={{
                  width: '100px',

                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontWeight: '600',

                  '&.Mui-focusVisible': {
                    background: colors.background,
                  },

                  '&:hover': {
                    background: colors.background2,
                  },
                }}
                key={item.title}
                onClick={item.onClick}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <AppBar
        elevation={0}
        sx={{
          background: colors.background2,
          display: {
            xs: 'flex',
            md: 'none',
          },
          '.MuiToolbar-root': {
            padding: 0,
          },
        }}
        position="static"
      >
        <Toolbar>
          <IconButton onClick={toggleSidebar} variant="menu" />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: colors.text,
                fontWeight: '300',
              }}
            >
              {user?.email}
            </Typography>

            <MuiIconButton>
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </MuiIconButton>
            <Tooltip title="Account settings">
              <Avatar
                onClick={handleClick}
                alt="User"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcM04W6diLQBzw4Y4pXDhPgovRf7l1cBF0Q&usqp=CAU"
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{
                marginTop: '10px',
                '.MuiPaper-root': {
                  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                },
              }}
            >
              {profileMenuProps.map((item) => (
                <MenuItem
                  sx={{
                    width: '100px',

                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    fontWeight: '600',

                    '&.Mui-focusVisible': {
                      background: colors.background,
                    },

                    '&:hover': {
                      background: colors.background2,
                    },
                  }}
                  key={item.title}
                  onClick={item.onClick}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
