/* eslint-disable @typescript-eslint/no-explicit-any */

import { Control, useController } from 'react-hook-form';
import TextInput from '../Inputs/TextInput/TextInput';
import { IconButton, InputAdornment } from '@mui/material';
import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Selector } from '../Inputs/Selector/Selector';

export type FormProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FormTextProps = FormProps;

export type FormDropdownProps = FormProps & {
  data: {
    label: string;
    value: string;
  }[];
};

type Props =
  | ({
      variant: 'text' | 'password';
    } & FormTextProps)
  | ({
      variant: 'dropdown';
    } & FormDropdownProps);

export const FormTextInput = ({
  control,
  name,
  disabled,
  label,
  placeholder,
}: FormTextProps) => {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  });

  return (
    <TextInput
      value={field.value}
      onChange={field.onChange}
      errorText={fieldState.error?.message ?? ''}
      isError={!!fieldState.error}
      label={label ?? ''}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export const FormDropdownInput = ({
  name,
  control,
  label,
  placeholder,
  disabled,
  data,
}: FormDropdownProps) => {
  const { field } = useController({
    control: control,
    name: name,
  });

  return (
    <Selector
      value={field.value}
      onChange={field.onChange}
      label={label ?? ''}
      disabled={disabled}
      placeholder={placeholder}
      data={data}
    />
  );
};

export const FormPasswordInput = ({
  control,
  name,
  disabled,
  label,
  placeholder,
}: FormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { field, fieldState } = useController({
    control: control,
    name: name,
  });

  return (
    <TextInput
      value={field.value}
      onChange={field.onChange}
      errorText={fieldState.error?.message ?? ''}
      isError={!!fieldState.error}
      label={label ?? ''}
      disabled={disabled}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default function FormInput(props: Props) {
  switch (props.variant) {
    case 'text':
      return <FormTextInput {...props} />;
    case 'password':
      return <FormPasswordInput {...props} />;
    case 'dropdown':
      return <FormDropdownInput {...props} />;
    default:
      break;
  }
}
