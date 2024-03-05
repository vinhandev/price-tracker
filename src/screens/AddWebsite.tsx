import React, { useEffect, useState } from 'react';
import { convertStringToNumber, formatMoney } from '../utils/helper';
import { Selector } from '../components/Inputs/Selector/Selector';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { GroupPriceProps } from '../types/prices';

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
      alert('success');
    }
  }
  async function handleAddWebsite() {
    const text = prompt(
      `Add new name for website:  \n + Website: ${value} \n + Product: ${selector} \n + Price: ${formatMoney(
        price
      )}`
    );
    if (text) {
      const tmpPrices: GroupPriceProps[] = prices.map((item) => {
        if (item.label === selector) {
          return {
            ...item,
            data: [
              ...item.data,
              {
                color: '',
                link: value,
                first: from,
                last: to,
                name: text,
                data: [],
              },
            ],
          };
        }
        return item;
      });
      await setDoc(doc(db, 'Prices', 'vinhan'), { data: tmpPrices });
      setPrices(tmpPrices);
      alert('success');
      window.location.href = 'home';
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await getDoc(doc(db, 'Prices', 'vinhan'));
      console.log('prices', response.data());
      if (response.exists()) {
        if (response.data().data?.length > 0) {
          console.log('prices', response.data().data);

          setPrices(response.data().data as GroupPriceProps[]);
        }
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (prices.length > 0) {
      setDoc(doc(db, 'Prices', 'vinhan'), { data: prices });
    }
  }, [prices]);

  return (
    <div
      className="row d-flex justify-content-center"
      style={{
        padding: 20,
        height: '100vh',
        width: '100%',
      }}
    >
      <div
        className="col-4 gap-3"
        style={{
          gap: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>Products</div>
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

        <button onClick={handlePriceChange} className="btn btn-primary">
          Preview Website
        </button>
      </div>
      <div className="col-8 gap-3 d-flex flex-column">
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
        <div
          style={{
            border: 'solid 1px black',
            height: 100,
            marginTop: 10,
            overflowY: 'auto',
            padding: 10,
          }}
        >
          {formatMoney(price)}
        </div>
        <button onClick={handleAddWebsite} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}
