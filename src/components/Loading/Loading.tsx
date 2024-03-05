import { useStore } from '../../store/useStore';

export default function Loading({
  count,
  currentProduct,
  currentShop,
}: {
  count: number;
  currentProduct: string;
  currentShop: string;
}) {
  const isLoading = useStore((state) => state.isLoading);
  const prices = useStore((state) => state.prices);
  if (!prices) return null;
  return (
    <div
      style={{
        display: isLoading ? 'flex' : 'none',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
      }}
    >
      <div className="spinner-border" role="status" />
      <div>{currentProduct}</div>
      <div>{currentShop}</div>
      <div>{((count * 100) / prices?.length).toFixed(2)}%</div>
    </div>
  );
}
