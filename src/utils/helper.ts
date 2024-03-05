export function convertStringToNumber(str: string) {
  const numericStr = str.replace(/[^0-9]/g, '');

  const number = parseFloat(numericStr);

  return isNaN(number) ? null : number;
}

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};
export function formatNumberText(num: number) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const numLength = Math.floor(Math.log10(num)) + 1;
  const index = Math.max(0, Math.floor((numLength - 1) / 3));
  const suffix = suffixes[index];
  const shortNum = num / Math.pow(10, index * 3);
  return shortNum.toFixed(1) + suffix;
}
export const navigate = (path: string) => {
  window.location.href = path;
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
};
