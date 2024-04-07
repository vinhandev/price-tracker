import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onPress: () => void;
};

export default function ConfirmDialog({ onPress, onClose, open }: Props) {
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <Typography>Are you sure you want to do this? </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onPress}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
