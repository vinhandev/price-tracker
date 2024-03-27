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

export function extractDomainName(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const domainParts = parsedUrl.hostname.split('.');
    if (domainParts.length >= 2) {
      // The domain should be the second-level domain (e.g., "openai" in "chat.openai.com")
      return domainParts[0];
    } else {
      // If the URL doesn't have a valid domain structure, return null
      return null;
    }
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}
export const isSameDay = (date1: Date, date2: Date) => {
  const isSameDayTime = date1.getDate() === date2.getDate();
  const isSameMonth = date1.getMonth() === date2.getMonth();
  const isSameYear = date1.getFullYear() === date2.getFullYear();
  return isSameDayTime && isSameMonth && isSameYear;
};

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
