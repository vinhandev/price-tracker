import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchBar from './components/SearchBar/SearchBar';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useUser } from '@/store';
import { useColors } from '@/hooks';
import { useState } from 'react';
import { logout } from '@/utils';
import { useNavigate } from 'react-router-dom';
export default function Header() {
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
    <Box
      sx={{
        width: '100%',
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 2,
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

        <IconButton>
          <Badge badgeContent={4} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
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
  );
}
