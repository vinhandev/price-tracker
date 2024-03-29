import { ButtonProps, Button as RButton } from '@mui/material';
import { useColors } from '@/hooks';

export default function Button(props: ButtonProps) {
  const colors = useColors();
  return (
    <RButton
      {...props}
      disableElevation
      sx={{
        height: '40px',
        fontSize: 14,
        textTransform: 'capitalize',
        fontWeight: '300',
        ':hover': {
        },
      }}
    />
  );
}
