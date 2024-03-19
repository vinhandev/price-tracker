import { Colors } from '@/assets/colors';
import { useUser } from '@/store';
import { Box, Button, Typography } from '@mui/material';
export default function ContactUs() {
  const user = useUser((state) => state.user);
  const subject = `[price-tracker] User ${user?.email} need a support`;
  const body = ``;
  const handleSendMail = () => {
    window.open(`mailto:vinhan.dev@gmail.com?subject=${subject}&body=${body}`);
  };
  return (
    <Box
      className="shadow"
      sx={{
        backgroundImage:
          'url(https://images.pexels.com/photos/7223556/pexels-photo-7223556.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        aspectRatio: 3 / 4,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, ${Colors.text} 100%)`,
          height: '100%',
          padding: 4,

          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontWeight: '700',
            fontSize: 40,
            lineHeight: '50px',
          }}
        >
          NEED SUPPORT?
        </Typography>
        <Button
          sx={{
            background: `#FFFFFF55`,
            backdropFilter: 'blur(5px)',
            transition: 'all 0.5s ease',
          }}
          variant="contained"
          onClick={handleSendMail}
        >
          Contact us
        </Button>
      </Box>
    </Box>
  );
}
