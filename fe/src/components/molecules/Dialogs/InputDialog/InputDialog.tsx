import { useInputDialog } from '@/hooks';
import {
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import Dialog from '../Dialog/Dialog';

export default function InputDialog() {
  const { open, body, texts, onConfirm, onClose } = useInputDialog();
  const { cancel, confirm, description, title } = texts ?? {};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || 'Input Dialog'}</DialogTitle>
      <Divider />

      {description ? (
        <DialogContentText>{description}</DialogContentText>
      ) : null}
      {body ? <DialogContent>{body}</DialogContent> : null}
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          {cancel || 'Cancel'}
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          {confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
