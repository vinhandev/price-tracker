import { useForm } from 'react-hook-form';
import { Box, IconButton, Link, Typography } from '@mui/material';

import { LoginFormData, useColors, useSignIn, useSignInGoogle } from '@/hooks';
import { Button, FormInput } from '@/components';

export default function Login() {
  const colors = useColors();
  const { mutation } = useSignIn();
  const { mutation: loginGoogle } = useSignInGoogle();
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await mutation(data.username, data.password);
    const token = await response.user.getIdToken();
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  const onLoginGoogle = async () => {
    const response = await loginGoogle();
    const token = (await response.token) ?? '';
    localStorage.setItem('token', token);
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
            md: 'solid 1px' + colors.border,
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
            Price Tracker
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
                color: colors.primary,
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <IconButton onClick={onLoginGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="30px"
              height="30px"
            >
              <path d="M23 21.5v5c0 .828.671 1.5 1.5 1.5h10.809c-.499 1.416-1.256 2.698-2.205 3.805l6.033 5.229C42.159 33.529 44 28.98 44 24c0-.828-.064-1.688-.202-2.702C43.697 20.555 43.062 20 42.312 20H24.5C23.671 20 23 20.672 23 21.5zM12.612 27.761C12.22 26.577 12 25.314 12 24s.22-2.577.612-3.761l-6.557-5.014C4.752 17.878 4 20.849 4 24s.752 6.122 2.056 8.775L12.612 27.761zM30.865 33.835C28.906 35.204 26.532 36 24 36c-4.212 0-7.917-2.186-10.059-5.478l-6.362 4.865C11.195 40.585 17.202 44 24 44c4.968 0 9.508-1.832 13.009-4.84L30.865 33.835zM37.515 9.297C33.813 5.881 29.013 4 24 4c-6.798 0-12.805 3.415-16.421 8.614l6.362 4.865C16.083 14.186 19.788 12 24 12c2.944 0 5.776 1.081 7.974 3.043.593.53 1.498.504 2.06-.059l3.525-3.524c.289-.288.447-.683.439-1.091C37.99 9.961 37.815 9.574 37.515 9.297z" />
            </svg>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
