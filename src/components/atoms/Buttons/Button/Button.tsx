import { ButtonProps, Button as RButton } from '@mui/material';

export default function Button(props: ButtonProps) {
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
