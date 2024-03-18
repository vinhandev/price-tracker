import { useForm } from 'react-hook-form';
import { Box, Link, Typography } from '@mui/material';

import { LoginFormData, useSignIn } from '@/hooks';
import { Colors } from '@/assets/colors';
import { Button, FormInput, Logo } from '@/components';

export default function Login() {
  const { mutation } = useSignIn();
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await mutation(data.username, data.password);
    window.location.href = '/';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        height: '100vh',

        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(0deg, ${Colors.primary}55 65%, white 100%)`,
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
          background: `linear-gradient(0deg, white 65%, ${Colors.primary}88 100%)`,
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
          <Box
            sx={{
              // background: 'red',
              borderRadius: 1000,

              width: 200,
              aspectRatio: 2,

              margin: 'auto',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo />
          </Box>
          <h3
            style={{
              fontFamily: 'Roboto',
            }}
          >
            Welcome back !
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
        </Box>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Sign in
        </Button>
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: '300',
              textAlign: 'center',
              fontFamily: 'Roboto',
            }}
          >
            Don&apos;t have an account?
            <Link
              onClick={() => {
                window.location.href = '/sign_up';
              }}
              sx={{
                cursor: 'pointer',
                fontWeight: '600',
                color: Colors.primary,
                textDecorationLine: 'none',
                ':hover': {
                  textDecorationLine: 'underline',
                },
              }}
            >
              {' '}
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
