const url = 'http://localhost:3000/api';
// const url = 'https://price-tracker-be.fly.dev/api';

const priceUrl = url + '/price';
export const updateUserPrices = async () => {
  const response = await fetch(priceUrl + '/updatePrices', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return response.json();
};

export const updateAllData = async () => {
  const response = await fetch(priceUrl + '/updateAllPrices', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return response.json();
};

export const previewWebsite = async (params: {
  websiteLink: string;
  selector: string;
}) => {
  const response = await fetch(
    priceUrl +
      '/previewPrices?' +
      new URLSearchParams({
        websiteLink: params.websiteLink,
        selector: params.selector,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
  );
  const responseData: {
    price: number;
    logo: string;
    rawPrice: string;
  } = await response.json();
  return responseData;
};
