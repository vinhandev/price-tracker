import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import { useStore } from '../../store/useStore';

export default function Logo() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <div
      className="d-none d-md-block"
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 2,
        paddingLeft: 20,
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        src={isDarkMode ? logo2 : logo}
      />
    </div>
  );
}
