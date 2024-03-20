import { Box } from '@mui/material';
import { useColors } from '@/hooks';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colors = useColors();
  return (
    <Box
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        backgroundColor:colors.background,
        color: colors.text,
      }}
    >
      {children}
    </Box>
  );
}
