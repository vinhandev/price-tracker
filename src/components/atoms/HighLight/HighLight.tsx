import { Box, Typography } from '@mui/material';
import { HightLightType } from '@/screens/Main/Homepage';
import HighLightChart from '../HighLightChart/HighLightChart';
import { formatMoney } from '@/utils';
import { useColors } from '@/hooks';

type Props = {
  data: HightLightType[];
};
export default function HighLight({ data }: Props) {
  const colors = useColors();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        flex: 1,
      }}
    >
      {data.map((item) => {
        return (
          <Box sx={{ width: '100%', flex: 1, display: 'flex' }}>
            <Box
              sx={{
                background: colors.background,
                borderRadius: 2,

                flex: 1,
                width: '100%',

                position: 'relative',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  top: 0,
                  bottom: 0,
                  zIndex: 1,
                  borderRadius: 1,
                  // backdropFilter: 'blur(5px)',
                  padding: '20px',
                }}
              >
                <Typography
                  style={{
                    fontWeight: '700',
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}
                >
                  {formatMoney(item.price)}
                </Typography>
                <Typography
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link);
                    }
                  }}
                  sx={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color:colors.primary,
                    cursor: 'pointer',
                    ':hover': {
                      textDecoration: 'underline',
                    },

                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <HighLightChart colors={[item.color]} data={item.data} />
              </Box>
            </Box>
          </Box>
        );
      })}
    </div>
  );
}
