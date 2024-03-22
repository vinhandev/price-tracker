import { ButtonProps, Button as RButton } from '@mui/material';
import { useColors } from '@/hooks';

export default function Button(props: ButtonProps) {
  const colors = useColors();
  return (
    <RButton
      {...props}
      variant="outlined"
      sx={{
        paddingY: 2,
        paddingX: 4,
        background: colors.primary,
        color: colors.text2,
        fontSize: 14,
        ':hover': {
          color: colors.primary,
        },
      }}
    />
  );
}
