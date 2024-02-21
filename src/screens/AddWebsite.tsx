import React, { useEffect, useState } from 'react';
import { convertStringToNumber } from '../utils/helper';
import { Selector } from '../components/inputs/Selector/Selector';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { GroupPriceProps } from '../App';

export default function AddWebsite() {
  const [value, setValue] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [selector, setSelector] = React.useState('');
  const [to, setTo] = React.useState('');
  const [price1, setPrice1] = React.useState('');
  const [price2, setPrice2] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [prices, setPrices] = useState<GroupPriceProps[]>([]);

  async function handlePriceChange() {
    setLoading(true);
    try {
      const response = await fetch(value);
      const data = (await response.text())
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\t/g, ' ')
        .split('=""')
        .join('')
        .split(' ')
        .join('');

      const tmpPrice = data?.split(from.split(' ').join(''))[1] ?? '0';
      const price1 = tmpPrice?.split(to.split(' ').join(''))[0] ?? '0';
      const number = convertStringToNumber(price1) ?? 0;
      console.log('price', from, to, price, price1, number);

      setPrice(number);
      setPrice1(() => tmpPrice);
      setPrice2(() => price1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function handleAddNewProduct() {
    const text = prompt('Input new product');
    if (text) {
      setPrices((prev) => [
        ...prev,
        {
          label: text,
          data: [],
        },
      ]);
    }
  }
  function handleAddWebsite() {}

  useEffect(() => {
    async function getData() {
      const response = await getDoc(doc(db, 'Prices', 'vinhan'));

      if (response.exists()) {
        if (response.data().data?.length > 0) {
          setPrices(response.data().data as GroupPriceProps[]);
        }
      }
    }
    getData();
  }, []);

  useEffect(() => {
    setDoc(doc(db, 'Prices', 'vinhan'), { data: prices });
  }, [prices]);

  return (
    <div
      style={{
        padding: 20,
        gap: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>Website</div>
      <input
        className="form-control"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>First</div>
      <input
        className="form-control"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <div>Last</div>
      <input
        className="form-control"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <div>Selector</div>
      <Selector
        data={prices.map((item) => ({
          label: item.label,
          value: item.label,
        }))}
        value={selector}
        onChange={setSelector}
      />
      <button onClick={handleAddNewProduct} className="btn btn-primary">
        Add New Product
      </button>
      <button onClick={handlePriceChange} className="btn btn-primary">
        Add New Website
      </button>
      {isLoading && <div>Loading</div>}
      <div>Price</div>
      <div
        style={{
          border: 'solid 1px black',
          height: 100,
          marginTop: 10,
          overflowY: 'auto',
          padding: 10,
        }}
      >
        {price1}
      </div>
      <div
        style={{
          border: 'solid 1px black',
          height: 100,
          marginTop: 10,
          overflowY: 'auto',
          padding: 10,
        }}
      >
        {price2}
      </div>
      <div
        style={{
          border: 'solid 1px black',
          height: 100,
          marginTop: 10,
          overflowY: 'auto',
          padding: 10,
        }}
      >
        {price}
      </div>
      <button onClick={handleAddWebsite} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}
