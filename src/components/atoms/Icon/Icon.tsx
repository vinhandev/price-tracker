import { HiOutlineMenu } from 'react-icons/hi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export type IconVariants = 'menu' | 'dark' | 'light';

type Props = {
  variant: IconVariants;
  size?: string | number;
  color?: string;
};

export default function Icon({ variant, ...props }: Props) {
  switch (variant) {
    case 'menu':
      return <HiOutlineMenu {...props} />;
    case 'dark':
      return <MdDarkMode {...props} />;
    case 'light':
      return <MdLightMode {...props} />;
    default:
      break;
  }
}
