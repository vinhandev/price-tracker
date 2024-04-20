import { Colors, chartColors } from '@/assets/colors';
import { useStore } from '@/store';

export function useColors() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return {
    background: isDarkMode ? Colors.black2 : Colors.white,
    background2: isDarkMode ? Colors.black : Colors.white2,
    text: isDarkMode ? Colors.white : Colors.black,
    text2: isDarkMode ? Colors.black : Colors.white,
    text3: isDarkMode ? Colors.grey : Colors.grey2,
    primary: isDarkMode ? Colors.blue2 : Colors.blue,
    border: Colors.grey,
    chartColors,
    ...Colors,
  };
}
