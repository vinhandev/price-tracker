import Records from '@/components/molecules/Homepage/Records/Records';
import { Box } from '@mui/material';

export default function Tester() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',

        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          flex: 1,
          background: 'red',
          overflow: 'auto',
        }}
      >
        <Records />
      </Box>
      <Box
        sx={{
          flex: 1,
          background: 'blue',
        }}
      >
        2
      </Box>
    </Box>
  );
}
