import { useStore } from '../../../store/useStore';

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  value: string;
  noBorder?: boolean;
};
export function Selector({ data, onChange, value, noBorder = false }: Props) {
  const isDarkMode = useStore((state) => state.isDarkMode);
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        borderWidth: noBorder ? 0 : 1,
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 1,
      }}
    >
      {data.map((d) => (
        <option key={d.value} value={d.value}>
          {d.label}
        </option>
      ))}
    </select>
  );
}
