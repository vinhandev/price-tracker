import { Box, TextField, TextFieldProps, Typography } from '@mui/material';

export type TextInputProps = TextFieldProps & {
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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: '400',
          fontSize: 14,
        }}
      >
        {label}
      </Typography>
      <TextField
        sx={{
          '.MuiInputBase-root': {
            background: 'white',
            borderRadius: 2,
          },
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
