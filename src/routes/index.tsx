import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddWebsite from '../screens/AddWebsite';
import Introduction from '../screens/Introduction';
import Homepage from '../screens/Homepage';
import { Sidebar } from '../components';
import Loading from '../components/Loading/Loading';
import { useStore } from '../store/useStore';
import Logo from '../components/Logo/Logo';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { GroupPriceProps } from '../types/prices';
import { convertStringToNumber } from '../utils/helper';

export default function RouterProvider() {
  const [count, setCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentShop, setCurrentShop] = useState('');
  const prices = useStore((state) => state.prices);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setPrices = useStore((state) => state.setPrices);
  const setLoading = useStore((state) => state.setLoading);

  async function handleFetch(paramPrices: GroupPriceProps[]) {
    setCount(0);
    setLoading(true);
    try {
      for (let index = 0; index < paramPrices.length; index++) {
        const group = paramPrices[index];
        setCurrentProduct(() => group.label);
        for (let i = 0; i < group?.data.length; i++) {
          const element = paramPrices[index].data[i];
          try {
            setCurrentShop(() => element.name);

            const response = await fetch(element.link);
            const data = (await response.text())
              .replace(/\n/g, ' ')
              .replace(/\r/g, ' ')
              .replace(/\t/g, ' ')
              .split('=""')
              .join('')
              .split(' ')
              .join('');

            const price =
              data
                .split(element.first.split(' ').join(''))[1]
                ?.split(element.last.split(' ').join(''))[0] ?? '0';
            const number = convertStringToNumber(price);
            if (number !== null && number !== 0) {
              if (!element?.data) {
                element.data = [
                  {
                    price: number,
                    date: new Date().getTime(),
                  },
                ];
              } else {
                element.data?.push({
                  price: number,
                  date: new Date().getTime(),
                });
              }
              console.log(
                group.label,
                element.name,
                count,
                1 / group?.data.length,
                count + Math.round((1 / group?.data.length) * 100) / 100
              );
              setCount(
                (tmpCount) =>
                  tmpCount + Math.round((1 / group?.data.length) * 100) / 100
              );
            } else {
              throw new Error('no price');
            }
          } catch (error) {
            element.data?.push({
              price: -1,
              date: new Date().getTime(),
            });
            setCount(
              (tmpCount) =>
                tmpCount + Math.round((1 / group?.data.length) * 100) / 100
            );
          }
        }
      }
      setPrices(paramPrices);
      await setDoc(doc(db, 'Prices', 'vinhan'), { data: paramPrices });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function getData() {
      const response = await getDoc(doc(db, 'Prices', 'vinhan'));

      if (response.exists()) {
        if (response.data().data?.length > 0) {
          setPrices(response.data().data as GroupPriceProps[]);
          await handleFetch(response.data().data as GroupPriceProps[]);
        } else {
          setPrices([]);
          await handleFetch([]);
        }
      }
    }
    getData();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <div
          style={{
            backgroundColor: isDarkMode ? '#000' : '#ffffff',
          }}
          className="d-flex flex-row"
        >
          <div className="d-block d-md-none">
            <Sidebar />
          </div>
          <div
            className="d-none d-md-block"
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              borderRight: '1px solid #ccc',
              width: '20%',
            }}
          >
            <Logo />
            <Sidebar />
            <div
              style={{
                paddingTop: 20,
              }}
            >
              <button
                disabled={!prices}
                onClick={() => {
                  if (prices) {
                    handleFetch(prices);
                  }
                }}
                className="btn btn-primary"
              >
                Reload database
              </button>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/add" element={<AddWebsite />} />
          </Routes>

          <Loading
            count={count}
            currentProduct={currentProduct}
            currentShop={currentShop}
          />
        </div>
      </BrowserRouter>
    </div>
  );
}
