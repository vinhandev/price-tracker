import { useColors, useConfirmDialog } from '@/hooks';
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import Dialog from '../Dialog/Dialog';

export default function ConfirmDialog() {
  const colors = useColors();
  const { open, onClose, onConfirm: onConfirmFromHook } = useConfirmDialog();

  const onConfirm = async () => {
    if (!onConfirmFromHook) return;
    onClose();
    await onConfirmFromHook();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Confirm </DialogTitle>
      <Divider />
      <DialogContentText>Are you sure you want to do this?</DialogContentText>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
