import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useColors } from '@/hooks';
export default function SearchBar() {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: 10,
        width: '50%',
        border: `1.5px solid ${colors.text}`,
        color: colors.text,
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
