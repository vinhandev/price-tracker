// components/PriceComponent.tsx
import { useEffect, useState } from 'react';

interface PriceData {
  price: string;
}

function PriceComponent() {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    // Make a client-side request to the API route
    fetch('/api/getPrice')
      .then((response) => response.json() as Promise<PriceData>)
      .then((data) => {
        if (data.price) {
          setPrice(data.price);
        } else {
          setPrice('Price not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>iPhone 13 Price</h2>
      <p>{price}</p>
    </div>
  );
}

export default PriceComponent;
