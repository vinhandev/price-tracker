import { useColors } from '@/hooks';
import { DialogProps, Dialog as RNDialog } from '@mui/material';

type Props = DialogProps;
export default function Dialog(props: Props) {
  const colors = useColors();
  return (
    <RNDialog
      {...props}
      sx={{
        h2: {
          paddingX: 0,
          paddingBottom: 1,

          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Roboto',

          color: colors.text,
        },
        '.MuiDialogContentText-root': {
          paddingY: 1,

          fontSize: '14px',
          fontWeight: '400',
          fontFamily: 'Roboto',

          color: colors.text,
        },
        '.MuiPaper-root': {
          width: 500,
          padding: 3,
          borderRadius: 3,
          backgroundColor: colors.background,
        },
        '.MuiDialogActions-root': {
          paddingX: 0,
          paddingY: 1,
        },
        '.MuiDialogContent-root': {
          paddingX: 0,
          paddingY: 1,
        },
        button: {
          paddingX: 2,
          paddingY: 1,

          border: '1px solid',
          borderRadius: 10,

          fontSize: '14px',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          textTransform: 'capitalize',

          color: colors.text,

          boxShadow: 'none',
        },
      }}
    />
  );
}
