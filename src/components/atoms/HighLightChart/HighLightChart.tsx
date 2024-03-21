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
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Line
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
              border: {
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
              backgroundColor: (context) => {
                const { ctx, chartArea } = context.chart;
                if (!chartArea) {
                  // This case happens on initial chart load
                  return;
                }
                const gradientBg = ctx.createLinearGradient(
                  0,
                  chartArea.top,
                  0,
                  chartArea.bottom
                );
                gradientBg.addColorStop(0, `${colors[0]}`);
                gradientBg.addColorStop(0.5, `${colors[0]}AA`);
                gradientBg.addColorStop(0.75, `${colors[0]}55`);
                gradientBg.addColorStop(1, '#ffffff00');
                return gradientBg;
              },
              borderColor: colors,
              borderWidth: 2,
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
}
