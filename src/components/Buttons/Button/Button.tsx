import { ButtonProps, Button as RButton } from '@mui/material';
import { Colors } from '../../../assets/colors';

export default function Button(props: ButtonProps) {
  return (
    <RButton
      {...props}
      variant="outlined"
      sx={{
        paddingY: 2,
        paddingX: 4,
        background: Colors.primary,
        color: 'white',
        fontSize: 14,
        ':hover': {
          color: Colors.primary,
        },
      }}
    />
  );
}
