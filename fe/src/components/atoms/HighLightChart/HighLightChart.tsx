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
import { getGradient } from '@/utils';
import { Stack } from '@mui/material';

type Props = {
  colors: string[];
  data: {
    date: number;
    price: number;
  }[];
};
export default function HighLightChart({ data, colors }: Props) {
  const labels = useStore((state) => state.labels);

  if (data.length === 0) return null;

  return (
    <Stack
      sx={{
        canvas: {
          height: '100% !important',
          width: '100% !important',

        },
      }}
    >
      {/* <Line
        style={{
          display: 'flex',
          flex: 1,
        }}
        options={{
          layout: {
            padding: -10,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
        data={{
          labels:
            labels.map((item) => {
              return formatDate(new Date(item));
            }) ?? [],
          datasets: [
            {
              label: '',
              data:
                data?.map((subItem) => {
                  if (subItem.price === -1) {
                    return undefined;
                  }
                  return subItem.price;
                }) ?? [],
              backgroundColor: (context) => getGradient(context, colors[0]),
              borderColor: colors,
              borderWidth: 2,
              fill: true,
            },
          ],
        }}
      /> */}
    </Stack>
  );
}
