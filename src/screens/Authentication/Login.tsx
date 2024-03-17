import { Box, Link, Typography } from '@mui/material';
import FormInput from '../../components/FormInput/FormInput';
import { useForm } from 'react-hook-form';
import Logo from '../../components/Logo/Logo';
import { Button } from '../../components/Buttons';
import { Colors } from '../../assets/colors';

export default function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        // background: 'red',

        display: 'flex',
        flexDirection: 'column',

        height: '100vh',

        justifyContent: 'center',
        // padding: 2,

        background: `linear-gradient(0deg, white 65%, ${Colors.primary}88 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          justifyContent: 'center',

          flex: 1,

          gap: 6,
          paddingY: 2,
          paddingX: 6,
          // backdropFilter: 'blur(200px)',
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
            variant="text"
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
                window.location.href = '/signup';
              }}
              sx={{
                cursor: 'pointer',
                fontWeight: '600',
                color: Colors.primary,
                textDecorationLine: 'none',
                ":hover":{
                  textDecorationLine: 'underline',
                }
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
