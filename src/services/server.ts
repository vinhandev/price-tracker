// const url = 'http://localhost:3000/api';
const url = 'https://price-tracker-be.fly.dev/api';

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
  beforeCharacters: string;
  afterCharacters: string;
}) => {
  const response = await fetch(
    url +
      '/previewPrices?' +
      new URLSearchParams({
        websiteLink: params.websiteLink,
        beforeCharacters: params.beforeCharacters,
        afterCharacters: params.afterCharacters,
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
    websiteRemoveBeforeCharacters: string;
    websiteSourceCode: string;
    websiteRemoveAllCharacters: string;
  } = await response.json();
  return responseData;
};
