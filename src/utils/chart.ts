import { ScriptableContext } from 'chart.js';

export function getGradient(context: ScriptableContext<'line'>, color: string) {
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
  gradientBg.addColorStop(0, `${color}`);
  gradientBg.addColorStop(0.5, `${color}AA`);
  gradientBg.addColorStop(1, `${color}55`);
  return gradientBg;
}

export function getGradientMainChart(
  context: ScriptableContext<'line'>,
  colors: string[]
) {
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
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index];
    const part = Math.round((1 * 100) / colors.length) / 100;
    gradientBg.addColorStop(part * index, `${color}AA`);
  }
  return gradientBg;
}
