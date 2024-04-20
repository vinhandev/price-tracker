import { useStore, useUser } from '@/store';
import {
  convertLabelToUrl,
  getPath,
  showSuccess,
  updateFirebasePrices,
} from '@/utils';
import { useInputDialog } from './useInputDialog';
import { AddNewProductBody } from '@/components/atoms';

export function useEditProduct() {
  const user = useUser((state) => state.user);
  const setLoading = useStore((state) => state.setLoading);
  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);
  const selectedProduct = useStore((state) => state.selectedProduct);

  const { setOpen } = useInputDialog();

  function onChangeLabel(paramLabel: string) {
    setOpen(true, {
      inputDialogTexts: {
        title: 'Update Product',
        description: 'Please enter new name for product',
        confirm: 'Update',
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
        const tempPrices = prices.map((item) => {
          if (item.label === selectedProduct) {
            return {
              ...item,
              label: paramLabel,
            };
          }
          return item;
        });
        await updateFirebasePrices(user?.uid, {
          prices: tempPrices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        showSuccess();
        window.location.href = getPath({
          path: 'PRODUCT',
          params: {
            productId: convertLabelToUrl(paramLabel),
          },
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const updateProduct = () => {
    setOpen(true, {
      inputDialogTexts: {
        title: 'Update Product',
        description: 'Please enter new name for product',
        confirm: 'Update',
        cancel: 'Cancel',
      },
      bodyInputDialog: renderAddItem(selectedProduct),
      onConfirm: () => uploadProductToFirebase(selectedProduct),
    });
  };

  return { updateProduct };
}
