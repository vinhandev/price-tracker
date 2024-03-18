import { IconButton } from '..';
import { useStore } from '../../../../store/useStore';

export default function DarkModeButton() {
  const setDarkMode = useStore((state) => state.setDarkMode);
  return <IconButton onClick={setDarkMode} variant="dark" />;
}
