import { useStore, useUser } from '@/store';
import { getPath, showError, updateFirebasePrices } from '@/utils';
import { useConfirmDialog } from './useConfirmDialog';

export function useDeleteProduct() {
  const { setOpen } = useConfirmDialog();
  const user = useUser((state) => state.user);
  const setLoading = useStore((state) => state.setLoading);
  const prices = useStore((state) => state.prices);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const labels = useStore((state) => state.labels);

  async function deleteProductInFirebase() {
    if (user) {
      setLoading(true);
      try {
        const tmpPrices = prices.filter(
          (item) => item.label !== selectedProduct
        );

        await updateFirebasePrices(user?.uid, {
          labels,
          prices: tmpPrices,
          lastUpdate: new Date().getTime(),
        });

        window.location.href = getPath({
          path: 'PRODUCTS',
        });
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
  }

  const deleteProduct = () => {
    setOpen(true, deleteProductInFirebase);
  };

  return { deleteProduct };
}
