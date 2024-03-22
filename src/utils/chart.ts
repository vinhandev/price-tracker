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

export function getGradientMainChart(context: ScriptableContext<'line'>) {
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
  gradientBg.addColorStop(0, '#FF204EAA');
  gradientBg.addColorStop(0.25, '#A0153EAA');
  gradientBg.addColorStop(0.75, '#5D0E41AA');
  gradientBg.addColorStop(1, '#00224D');
  return gradientBg;
}
