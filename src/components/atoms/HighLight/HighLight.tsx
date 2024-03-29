import { Box, Typography } from '@mui/material';
import { HightLightType } from '@/screens/Main/Homepage';
import HighLightChart from '../HighLightChart/HighLightChart';
import { formatMoney } from '@/utils';
import { useColors } from '@/hooks';
import { useUser } from '@/store';
import { graphTheme } from '@/assets/colors';

type Props = {
  data: HightLightType[];
};
export default function HighLight({ data }: Props) {
  const colors = useColors();
  const theme = useUser((state) => state.themeIndex);
  const selectedTheme = graphTheme[theme];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '10px',
      }}
    >
      {data.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{ width: '100%', flex: 1, flexGrow: 1, display: 'flex' }}
          >
            <Box
              sx={{
                background: colors.background,
                transition: 'background 1s ease',
                borderRadius: 2,

                flex: 1,
                height: '130px',
                width: '100%',

                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: '20px',

                overflow: 'hidden',
                padding: '20px',
              }}
            >
              <Box
                sx={{
                  zIndex: 1,
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'calc(50% - 10px)',

                  // backdropFilter: 'blur(5px)',
                }}
              >
                <Typography
                  style={{
                    fontWeight: '700',
                    fontFamily: 'Roboto',
                    color: colors.text,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  style={{
                    fontSize: 25,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    color: colors.primary,
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
                    fontSize: 12,
                    fontWeight: '300',
                    fontFamily: 'Roboto',
                    color: colors.text,
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
                  width: 'calc(50% - 10px)',
                }}
              >
                <HighLightChart
                  colors={[selectedTheme[index]]}
                  data={item.data}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </div>
  );
}
