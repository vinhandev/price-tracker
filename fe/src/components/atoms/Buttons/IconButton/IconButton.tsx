import Icon, { IconVariants } from '../../Icon/Icon';
import './IconButton.css';
import { useColors } from '@/hooks';
type Props = {
  onClick?: () => void;
  variant: IconVariants;
};
export default function IconButton({ variant, onClick }: Props) {
  const colors = useColors();
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
        borderColor: colors.border,
        borderRadius: 10,
      }}
    >
      <Icon variant={variant} size={20} color={colors.text} />
    </div>
  );
}
