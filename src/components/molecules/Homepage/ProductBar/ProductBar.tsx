import { Selector } from '../../../atoms/Inputs/Selector/Selector';
import { useStore } from '../../../../store/useStore';
import { useLocation } from 'react-router-dom';
import { useColors } from '@/hooks';

export default function ProductBar() {
  const colors = useColors();
  const product = useStore((state) => state.selectedProduct);
  const setProduct = useStore((state) => state.setSelectedProduct);
  const prices = useStore((state) => state.prices);
  const location = useLocation();

  return (
    <div
      style={{
        display: location.pathname === '/home' ? 'flex' : 'none',
        flexDirection: 'column',
        
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontWeight: '300',
          color: colors.border,
        }}
      >
        Products
      </div>
      <Selector
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
