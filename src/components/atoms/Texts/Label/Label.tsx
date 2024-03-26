import { useColors } from '@/hooks';
import { Typography } from '@mui/material';

type Props = {
  label: string;
};
export default function Label({ label }: Props) {
  const colors = useColors();
  return (
    <Typography
      sx={{
        fontSize: '12px',
        fontWeight: '300',
        lineHeight: '20px',
        color: colors.text,
        fontFamily: 'Roboto',
      }}
    >
      {label}
    </Typography>
  );
}
