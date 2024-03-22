import { Box, Typography } from '@mui/material';
import SearchBar from './components/SearchBar/SearchBar';
import { useUser } from '@/store';
import { useColors } from '@/hooks';

export default function Header() {
  const colors = useColors();
  const user = useUser((state) => state.user);

  return (
    <Box
      sx={{
        width: '100%',
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
          gap: 4,
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
        <Box
          sx={{
            borderRadius: 1000,
            width: '50px',
            height: '50px',
          }}
        >
          <img
            style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            src="https://images.pexels.com/photos/4656102/pexels-photo-4656102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </Box>
      </Box>
    </Box>
  );
}
