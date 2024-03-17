import { Control, useController } from 'react-hook-form';
import TextInput from '../Inputs/TextInput/TextInput';

export type Props = {
  variant: 'text';
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FormProps = Omit<Props, 'variant'>;

export const FormTextInput = ({
  control,
  name,
  disabled,
  label,
  placeholder,
}: FormProps) => {
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

export default function FormInput({ variant, ...props }: Props) {
  switch (variant) {
    case 'text':
      return <FormTextInput {...props} />;

    default:
      break;
  }
}
