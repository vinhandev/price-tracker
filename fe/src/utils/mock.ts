import { ScriptableContext } from 'chart.js';
import { getGradientMainChart } from './chart';
import { chartColors } from '@/assets/colors';
import { formatDate } from './helper';

export function generateMockData(
  numRecords: number,
  numDatasets: number,
  graphColors: string[],
  isShowAll: boolean
) {
  const result: {
    labels: string[];
    datasets: {
      label: string;
      data: (number | undefined)[];
      backgroundColor: (
        context: ScriptableContext<'line'>
      ) => CanvasGradient | undefined;
      borderColor: string;
      borderWidth: number;
      fill: boolean;
    }[];
  } = {
    labels: [],
    datasets: [],
  };

  for (let i = 0; i < numDatasets; i++) {
    const mockData = [120000, 90000, 400000, 300000, 800000, 300000, 200000];
    const data: number[] = [];

    for (let index = 0; index < numRecords; index++) {
      const randomIndex = Math.floor(Math.random() * mockData.length);

      data.push(mockData[randomIndex]);
    }
    result.labels.push(
      formatDate(new Date(new Date().getTime() - i * 1000 * 60 * 60 * 24))
    );
    result.datasets.push({
      label: `Dataset ${i + 1}`,
      data,
      backgroundColor: (context) => getGradientMainChart(context, graphColors),
      borderColor: !isShowAll
        ? graphColors[0]
        : chartColors[i % chartColors.length],
      borderWidth: 2,
      fill: !isShowAll ? true : false,
    });
  }

  return result;
}
