import { useStore } from '../store/useStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',

        paddingBottom: 20,
        backgroundColor: isDarkMode ? '#000' : '#ffffff',
        color: isDarkMode ? '#F6F5F5' : '#000000',
      }}
    >
      {children}
    </div>
  );
}
