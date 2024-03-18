import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { GroupPriceProps } from '@/types';
import { convertStringToNumber, getFirebasePrices, isSameDay, showError, updateFirebasePrices } from '@/utils';
import { LogoHorizontal } from '@/components/atoms/Logos';
import { auth } from '@/services';
import { useStore, useUser } from '@/store';
import { Sidebar } from 'react-pro-sidebar';
import Loading from '../Helper/Loading';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentShop, setCurrentShop] = useState('');

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const setLoading = useStore((state) => state.setLoading);
  const initData = useStore((state) => state.initData);

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
      const lastDayLabels = paramLabels[paramLabels.length - 1];
      const isToday = isSameDay(new Date(lastDayLabels), new Date(lastUpdate));
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
                if (isToday) {
                  element.data.pop();
                }

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
            if (!isToday) {
              element.data?.push({
                price: -1,
                date: lastUpdate,
              });
            }

            setCount(
              (tmpCount) =>
                tmpCount + Math.round((1 / group?.data.length) * 100) / 100
            );
          }
        }
      }
      if (isHaveRecord) {
        if (isToday) {
          paramLabels.pop();
        }
        paramLabels.push(lastUpdate);

        initData(paramPrices, paramLabels, lastUpdate);

        if (user) {
          await updateFirebasePrices(user.uid, {
            prices: paramPrices,
            labels: paramLabels,
            lastUpdate,
          });
        }
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
        if (user) {
          const response = await getFirebasePrices(user.uid);
          console.log(response);

          if (response.prices) {
            initData(response.prices, response.labels ?? [], 0);
            await handleFetch(response.prices, response.labels ?? []);
          }
        }
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
    getData();
  }, []);
  return (
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
          height: '100vh',
          width: '20%',
        }}
      >
        <Box className="d-none d-md-block">
          <LogoHorizontal />
        </Box>
        <Sidebar />
        <div
          style={{
            paddingTop: 20,
          }}
        >
          <button
            disabled={!prices}
            onClick={async () => {
              if (user) {
                const response = await getFirebasePrices(user.uid);
                if (response.prices && response.labels) {
                  handleFetch(response.prices, response.labels);
                }
              }
            }}
            className="btn btn-primary"
          >
            Reload database
          </button>
        </div>
        <div
          style={{
            paddingTop: 20,
          }}
        >
          <button
            disabled={!prices}
            onClick={async () => {
              await auth.signOut();
              window.location.reload();
            }}
            className="btn btn-danger"
          >
            Sign Out
          </button>
        </div>
      </div>

      <Outlet />

      <Loading
        count={count}
        currentProduct={currentProduct}
        currentShop={currentShop}
      />
    </div>
  );
}
