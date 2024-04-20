import { Stack } from '@mui/material';
import TextInput from '../Inputs/TextInput/TextInput';

type Props = {
  name: string;
  onChangeName: (name: string) => void;
};
const AddNewProductBody = ({ name, onChangeName }: Props) => {
  
  return (
    <Stack>
      <TextInput
        value={name}
        onChange={onChangeName}
        placeholder="Enter new product"
        autoComplete='off'
        autoCorrect='off'
      />
    </Stack>
  );
};

export default AddNewProductBody;
