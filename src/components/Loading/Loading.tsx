import { useStore } from '../../store/useStore';

export default function Loading() {
  const isLoading = useStore((state) => state.isLoading);
  const progressValue = useStore((state) => state.progressValue);
  const prices = useStore((state) => state.prices);
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
      <div>
        {Math.round((progressValue / (prices ? prices.length + 1 : 5)) * 100)}%
      </div>
    </div>
  );
}
