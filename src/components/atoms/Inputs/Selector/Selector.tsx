import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useColors } from '@/hooks';

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  value: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};
export function Selector({
  data,
  onChange,
  value,
  label,
  disabled,
  placeholder,
}: Props) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: '300',
            lineHeight: '20px',
            color: colors.text,
            fontFamily: 'Roboto',
          }}
        >
          {label}
        </Typography>
      )}

      <Select
        disabled={disabled}
        placeholder={placeholder}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        sx={{
          color: colors.text,
          fontSize: '12px',
          fontFamily: 'Roboto',
          height: '40px',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border,
          },
          '.MuiSelect-icon': {
            color: colors.text,
          },
          borderColor: colors.text,
        }}
      >
        {data?.map((item) => {
          return (
            <MenuItem
              key={item.label}
              value={item.label}
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
