import { Colors } from '@/assets/colors';
import { useStore } from '../../../store/useStore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',

        paddingBottom: 20,
        backgroundColor: isDarkMode ? '#000' : Colors.background2,
        color: isDarkMode ? '#F6F5F5' : '#000000',
      }}
    >
      {children}
    </div>
  );
}
