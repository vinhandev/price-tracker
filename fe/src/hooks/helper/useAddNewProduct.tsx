import { useStore, useUser } from '@/store';
import { showSuccess, updateFirebasePrices } from '@/utils';
import { useInputDialog } from './useInputDialog';
import { AddNewProductBody } from '@/components/atoms';

export function useAddNewProduct() {
  const user = useUser((state) => state.user);
  const setLoading = useStore((state) => state.setLoading);
  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);

  const { setOpen } = useInputDialog();

  function onChangeLabel(paramLabel: string) {
    setOpen(true, {
      inputDialogTexts: {
        title: 'Add New Product',
        description: 'Please enter new product name',
        confirm: 'Add new product',
        cancel: 'Cancel',
      },
      bodyInputDialog: renderAddItem(paramLabel),
      onConfirm: () => uploadProductToFirebase(paramLabel),
    });
  }

  const renderAddItem = (paramLabel: string) => {
    return <AddNewProductBody name={paramLabel} onChangeName={onChangeLabel} />;
  };

  const uploadProductToFirebase = async (paramLabel: string) => {
    if (!paramLabel) {
      return;
    }
    if (user) {
      setLoading(true);
      try {
        prices.push({
          label: paramLabel,
          data: [],
        });
        await updateFirebasePrices(user?.uid, {
          prices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        showSuccess();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const addProduct = () => {
    setOpen(true, {
      inputDialogTexts: {
        title: 'Add New Product',
        description: 'Please enter new product name',
        confirm: 'Add new product',
        cancel: 'Cancel',
      },
      bodyInputDialog: renderAddItem(''),
      onConfirm: () => uploadProductToFirebase(''),
    });
  };

  return { addProduct };
}
