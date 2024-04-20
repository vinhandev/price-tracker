import { useStore } from '@/store';

export function useInputDialog() {
  const open = useStore((state) => state.isOpenInputDialog);
  const onConfirmInStore = useStore((state) => state.callbackInputDialog);
  const body = useStore((state) => state.bodyInputDialog);
  const texts = useStore((state) => state.inputDialogTexts);
  const setOpen = useStore((state) => state.setIsOpenInputDialog);

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    if (!onConfirmInStore) return;
    onClose();
    await onConfirmInStore();
  };

  return {
    open,
    texts,
    body,
    onConfirm,
    onClose,
    setOpen,
  };
}
