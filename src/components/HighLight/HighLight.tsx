import { useStore } from '../../store/useStore';
import { formatMoney } from '../../utils/helper';

type Props = {
  data: {
    label: string;
    price: number;
    where: string;
  }[];
};
export default function HighLight({ data }: Props) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {data.map((item) => {
        return (
          <div
            style={{
              borderRadius: 10,
              background: isDarkMode ? '#191919' : '#FAFAFA',
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
