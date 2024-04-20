import { useStore } from '@/store';

export function useConfirmDialog() {
  const open = useStore((state) => state.isOpenConfirmDialog);
  const onConfirm = useStore((state) => state.callbackConfirmDialog);
  const setOpen = useStore((state) => state.setIsOpenConfirmDialog);

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    onConfirm,
    onClose,
    setOpen,
  };
}
