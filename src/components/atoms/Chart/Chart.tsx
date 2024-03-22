import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Line } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { formatDate } from '../../../utils/helper';
import { useColors } from '@/hooks';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { getGradientMainChart } from '@/utils';

export default function Chart() {
  const [isShowAll, setIsShowAll] = React.useState(true);
  const colors = useColors();
  const labels = useStore((state) => state.labels);
  const prices = useStore((state) => state.prices);
  const product = useStore((state) => state.selectedProduct);
  const shop = useStore((state) => state.selectedShop);
  const item = prices?.find((item) => item.label === product);

  if (!item)
    return (
      <Box
        style={{
          width: '100%',
          height: '100%',

          background: colors.background,
          borderRadius: 3,
          padding: '20px',

          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
        }}
      >
        No data
      </Box>
    );

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',

        transition: 'background 1s ease',
        background: colors.background,
        borderRadius: 10,
        overflow: 'hidden',

        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        paddingBottom: '40px',

        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          sx={{
            fontWeight: '700',
            color: colors.text,
          }}
        >
          Chart
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  transform: 'scale(0.8)',
                  color: colors.primary,
                  '&.Mui-checked': {
                    color: colors.primary,
                  },
                }}
                defaultChecked
                checked={isShowAll}
                onChange={() => {
                  setIsShowAll(!isShowAll);
                }}
              />
            }
            label="All"
            sx={{
              '.MuiTypography-root': {
                color: colors.text3,
                fontSize: '14px',
                fontWeight: '300',
              },
            }}
          />
        </FormGroup>
      </Box>
      <Line
        style={{ paddingBottom: '20px' }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 2,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          onClick: (_, elements) => {
            if (elements.length > 0) {
              const clickedElement = elements[0];
              const datasetIndex = clickedElement.datasetIndex;
              const selectedData = item?.data?.[datasetIndex];
              if (selectedData?.link) {
                window.open(selectedData.link, '_blank');
              }
            }
          },
        }}
        data={{
          labels:
            labels.map((item) => {
              return formatDate(new Date(item));
            }) ?? [],
          datasets: item?.data
            ?.filter((item) => (isShowAll ? true : item.name === shop))
            .map((subItem, subIndex) => ({
              label: subItem.name,
              data:
                subItem?.data?.map((subItem) => {
                  if (subItem.price === -1) {
                    return undefined;
                  }
                  return subItem.price;
                }) ?? [],

              backgroundColor: (context) => getGradientMainChart(context),
              borderColor: colors.chartColors[subIndex],
              borderWidth: 2,
              fill: !isShowAll ? true : false,
            })),
        }}
      />
    </Box>
  );
}
