import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';
import { useStore } from '../../../store/useStore';
import { formatDate } from '../../../utils/helper';
import { useColors } from '@/hooks';
import { Box, Typography } from '@mui/material';

export default function Chart() {
  const colors = useColors();
  const labels = useStore((state) => state.labels);
  const prices = useStore((state) => state.prices);
  const product = useStore((state) => state.selectedProduct);
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

        background: colors.background,
        borderRadius: 10,
        overflow: 'hidden',
        padding: '20px',

        display: 'flex',
        flex: 1,
        flexDirection: 'column',
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
          datasets: item?.data?.map((subItem, subIndex) => ({
            label: subItem.name,
            data:
              subItem?.data?.map((subItem) => {
                if (subItem.price === -1) {
                  return undefined;
                }
                return subItem.price;
              }) ?? [],
            borderColor: colors.chartColors[subIndex],
            backgroundColor: `${colors.chartColors[subIndex]}55`,
          })),
        }}
      />
    </Box>
  );
}
