type Props = {
  data: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  value: string;
};
export function Selector({ data, onChange, value }: Props) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {data.map((d) => (
        <option key={d.value} value={d.value}>
          {d.label}
        </option>
      ))}
    </select>
  );
}
