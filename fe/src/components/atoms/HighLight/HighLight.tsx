import { Stack, Typography } from '@mui/material';
import { HightLightType } from '@/screens/Main/Homepage';
import HighLightChart from '../HighLightChart/HighLightChart';
import { formatMoney } from '@/utils';
import { useColors } from '@/hooks';
import { useStore } from '@/store';
import { graphTheme } from '@/assets/colors';
import { SkeletonWrapper } from '@/HOCs';

type Props = {
  data: HightLightType[];
};
export default function HighLight({ data }: Props) {
  const colors = useColors();
  const theme = useStore((state) => state.themeIndex);
  const selectedTheme = graphTheme[theme];
  return (
    <Stack gap={2} flex={1}>
      {data.map((item, index) => {
        return (
          <SkeletonWrapper>
            <Stack
              gap={4}
              direction={'row'}
              sx={{
                flex: 1,
                width: '100%',
                transition: 'background 1s ease',

                padding: '20px',

                background: colors.background,
                borderRadius: 2,
              }}
            >
              <Stack flex={1}>
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
              </Stack>
              <HighLightChart
                colors={[selectedTheme[index]]}
                data={item.data}
              />
            </Stack>
          </SkeletonWrapper>
        );
      })}
    </Stack>
  );
}
