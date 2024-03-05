import { Colors } from '../../../assets/colors';
import Icon, { IconVariants } from '../../Icon/Icon';
import './IconButton.css';
type Props = {
  onClick?: () => void;
  variant: IconVariants;
};
export default function IconButton({ variant, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="icon_wrapper"
      style={{
        width: '50px',
        height: '50px',

        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        border: 'solid 1px',
        borderColor: Colors.border,
        borderRadius: 10,
      }}
    >
      <Icon variant={variant} size={20} />
    </div>
  );
}
