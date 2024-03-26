import { useColors } from '@/hooks';
import { Box, TextField, TextFieldProps } from '@mui/material';
import { Label } from '../..';

export type TextInputProps = Omit<TextFieldProps, 'label' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  label: string;
  isError: boolean;
  errorText: string;
};

export default function TextInput({
  value,
  onChange,
  errorText,
  isError,
  label,
  ...props
}: TextInputProps) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Label label={label} />
      <TextField
        sx={{
          '.MuiInputBase-root': {
            borderColor: 'rgba(228, 219, 233, 0.25)',
          },
          color: colors.text,
          fontSize: '14px',
          fontFamily: 'Roboto',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(228, 219, 233, 0.25)',
          },
          '.MuiSelect-icon': {
            color: colors.text,
          },
          input: {
            background: colors.transparent,
          },
          borderColor: colors.text,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={isError}
        helperText={errorText}
        variant="outlined"
        {...props}
      />
    </Box>
  );
}
