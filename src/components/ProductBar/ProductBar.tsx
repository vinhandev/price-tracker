import { Selector } from '../Inputs/Selector/Selector';
import { Colors } from '../../assets/colors';
import { useStore } from '../../store/useStore';
import { useLocation } from 'react-router-dom';

export default function ProductBar() {
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
