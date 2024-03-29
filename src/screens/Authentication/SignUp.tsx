import { Box } from '@mui/material';
import FormInput from '../../components/atoms/FormInput/FormInput';
import { useForm } from 'react-hook-form';
import { useColors, useSignUp } from '../../hooks';
import { Button } from '@/components';

export default function SignUp() {
  const colors = useColors()
  const { mutation } = useSignUp();
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirm: '',
    },
  });

  const onSubmit = async (data: {
    username: string;
    password: string;
    confirm: string;
  }) => {
    if (data.password === data.confirm) {
      await mutation(data.username, data.password);
    } else {
      setError('confirm', {
        type: 'confirm',
        message: 'Passwords do not match',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        height: '100vh',

        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(0deg, ${colors.primary}55 65%, white 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          justifyContent: 'center',

          borderRadius: {
            xs: 0,
            md: 4,
          },

          border: {
            xs: 0,
            md: 'solid 5px #fff',
          },

          width: {
            xs: '100%',
            md: 600,
          },

          flex: {
            xs: 1,
            md: 0,
          },

          transition: 'all 0.3s ease',

          gap: 6,
          paddingY: {
            xs: 2,
            md: 10,
          },
          paddingX: {
            xs: 6,
            md: 8,
          },
          background: `linear-gradient(0deg, white 65%, ${colors.primary}88 100%)`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',

            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'Roboto',
            }}
          >
            Sign up
          </h3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <FormInput
            variant="text"
            name="username"
            placeholder="Enter email"
            control={control}
            label="Username"
          />
          <FormInput
            variant="password"
            name="password"
            placeholder="Enter password"
            control={control}
            label="Password"
          />
          <FormInput
            variant="password"
            name="confirm"
            placeholder="Enter password again"
            control={control}
            label="Confirm Password"
          />
        </Box>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
