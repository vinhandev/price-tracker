import { Selector } from '../Inputs/Selector/Selector';
import { Colors } from '../../assets/colors';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';

export default function ProductBar() {
  const product = useStore((state) => state.selectedProduct);
  const setProduct = useStore((state) => state.setSelectedProduct);
  const prices = useStore((state) => state.prices);

  useEffect(() => {
    if (prices && product === '') {
      setProduct(prices?.[0]?.label);
    }
  }, [prices, product, setProduct]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontWeight: '300',
          color: Colors.border,
        }}
      >
        Products
      </div>
      <Selector
        noBorder
        value={product}
        onChange={setProduct}
        data={
          prices?.map((item) => ({
            label: item.label,
            value: item.label,
          })) ?? []
        }
      />
    </div>
  );
}
