import { useStore } from '../../store/useStore';
import { formatMoney } from '../../utils/helper';

type Props = {
  data: {
    label: string;
    price: number;
    where: string;
    link: string;
  }[];
};
export default function HighLight({ data }: Props) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const onPress = (link: string) => {
    if (link) {
      window.open(link, '_blank');
    }
  };
  return (
    <div
      className="flex-column flex-md-row"
      style={{
        display: 'flex',
        gap: 10,
      }}
    >
      {data.map((item) => {
        return (
          <div
            key={item.label}
            onClick={() => onPress(item.link)}
            style={{
              flexGrow: 1,
              borderRadius: 10,
              background: isDarkMode ? '#191919' : '#EEEEEE',
              padding: 20,
            }}
          >
            <div>{item.label}</div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              {formatMoney(item.price)}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#7EB9FF',
              }}
            >
              {item.where}
            </div>
          </div>
        );
      })}
    </div>
  );
}
