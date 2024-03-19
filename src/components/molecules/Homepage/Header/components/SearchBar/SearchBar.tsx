import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function SearchBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: 10,
        width: '50%',
        border: '1.5px solid black',
        paddingY: '10px',
        paddingX: '20px',
        justifyContent: 'space-between',
      }}
    >
      Search Bar
      <SearchIcon />
    </Box>
  );
}
