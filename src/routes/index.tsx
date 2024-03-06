import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddWebsite from '../screens/AddWebsite';
import Homepage from '../screens/Homepage';
import { Sidebar } from '../components';
import Loading from '../components/Loading/Loading';
import { useStore } from '../store/useStore';
import Logo from '../components/Logo/Logo';

import { useEffect, useState } from 'react';
import { GroupPriceProps } from '../types/prices';
import { convertStringToNumber, showError } from '../utils/helper';
import { getFirebasePrices, updateFirebasePrices } from '../utils/firebase';

export default function RouterProvider() {
  const [count, setCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentShop, setCurrentShop] = useState('');
  const labels = useStore((state) => state.labels);
  const prices = useStore((state) => state.prices);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setLoading = useStore((state) => state.setLoading);
  const initData = useStore((state) => state.initData);
  const setPrices = useStore((state) => state.setPrices);

  async function handleFetch(
    paramPrices: GroupPriceProps[],
    paramLabels: number[]
  ) {
    const lastUpdate = new Date().getTime();
    let isHaveRecord = false;

    setCount(0);
    setLoading(true);
    try {
      if (paramPrices?.length === 0) throw new Error('Prices not found');
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
                    date: lastUpdate,
                  },
                ];
              } else {
                element.data?.push({
                  price: number,
                  date: lastUpdate,
                });
              }
              if (!isHaveRecord) {
                isHaveRecord = true;
              }
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
              date: lastUpdate,
            });
            setCount(
              (tmpCount) =>
                tmpCount + Math.round((1 / group?.data.length) * 100) / 100
            );
          }
        }
      }
      if (isHaveRecord) {
        paramLabels.push(lastUpdate);

        initData(paramPrices, paramLabels, lastUpdate);

        await updateFirebasePrices({
          prices: paramPrices,
          labels: paramLabels,
          lastUpdate,
        });
      } else {
        throw new Error('No record to fetch');
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await getFirebasePrices();
        console.log(response);

        if (response.prices) {
          setPrices(response.prices);
          await handleFetch(response.prices, response.labels ?? []);
        }
      } catch (error) {
        showError(error);
      }
      setLoading(false);
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
                    handleFetch(prices, labels);
                  }
                }}
                className="btn btn-primary"
              >
                Reload database
              </button>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Homepage />} />
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
