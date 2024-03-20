import { useColors } from '@/hooks';
import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;
  noPadding?: boolean;
};
export default function Tab({ title, children, noPadding = false }: Props) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: colors.background,
        borderRadius: 2,
        padding: noPadding ? 0 : '20px',

        flex: 1,
        width: '100%',
        overflow: 'scroll',
      }}
    >
      <Typography
        sx={{
          paddingTop: noPadding ? '20px' : 0,
          paddingX: noPadding ? '20px' : 0,
          fontWeight: '700',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
