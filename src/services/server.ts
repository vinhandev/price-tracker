const url = 'https://localhost:3000';
// const url = 'https://price-tracker-be.fly.dev';
export const updateUserPrices = async () => {
  const response = await fetch(url + 'updatePrices', {
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
      'previewPrices?' +
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
