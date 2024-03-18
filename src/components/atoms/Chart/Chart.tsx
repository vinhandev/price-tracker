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
import { colors } from '../../../assets/colors';
import { formatDate } from '../../../utils/helper';

export default function Chart() {
  const labels = useStore((state) => state.labels);
  const prices = useStore((state) => state.prices);
  const product = useStore((state) => state.selectedProduct);
  const item = prices?.find((item) => item.label === product);

  if (!item)
    return (
      <div
        style={{
          width: '100%',
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        No data
      </div>
    );

  return (
    <div
      style={{
        width: '100%',
        height: 500,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Line
        options={{
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
            borderColor: colors[subIndex],
            backgroundColor: `${colors[subIndex]}55`,
          })),
        }}
      />
    </div>
  );
}
