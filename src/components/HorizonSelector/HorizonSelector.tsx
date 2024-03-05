import { useStore } from '../../store/useStore';

export default function HorizonSelector() {
  const prices = useStore((state) => state.prices);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const product = useStore((state) => state.selectedProduct);
  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
        }}
      >
        Products
      </div>

      <div
        style={{
          paddingTop: 5,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        {prices?.map((item) => (
          <div
            style={{
              color: product === item.label ? 'white' : 'black',
              cursor: 'pointer',
              padding: 10,
              borderRadius: 10,
              background: product === item.label ? '#7EB9FF' : '#F5F5F5',
            }}
            onClick={() => setSelectedProduct(item.label)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
