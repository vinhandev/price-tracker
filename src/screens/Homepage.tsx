import { Chart, DarkModeButton, IconButton, ProductBar } from '../components';
import HighLight from '../components/HighLight/HighLight';
import Layout from '../components/Layout';
import Records from '../components/Records/Records';
import Tabs from '../components/Tabs/Tabs';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { GroupPriceProps } from '../types/prices';
import { convertStringToNumber } from '../utils/helper';


export default function Homepage() {
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);

  const setPrices = useStore((state) => state.setPrices);
  const setProgressValue = useStore((state) => state.setProgressValue);
  const setLoading = useStore((state) => state.setLoading);

  const prices = useStore((state) => state.prices);

  async function handleFetch(paramPrices: GroupPriceProps[]) {
    setProgressValue(0);
    setLoading(true);
    try {
      for (let index = 0; index < paramPrices.length; index++) {
        const group = paramPrices[index];
        for (let i = 0; i < group?.data.length; i++) {
          const element = paramPrices[index].data[i];
          try {
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
            } else {
              throw new Error('no price');
            }
          } catch (error) {
            element.data?.push({
              price: -1,
              date: new Date().getTime(),
            });
          }

          setProgressValue(index + 1);
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
    <Layout>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',

            flexDirection: 'row',

            alignItems: 'center',
            justifyContent: 'space-between',

            padding: 20,
          }}
        >
          <IconButton onClick={setOpenSidebar} variant="menu" />

          <ProductBar />
          <DarkModeButton />
        </div>
        <div style={{}}>
          <Chart />
          <Tabs
            data={[
              {
                label: 'Hightlight',
                tab: (
                  <HighLight
                    data={[
                      {
                        label: 'Best price',
                        price: 4500000,
                        where: 'Thegioididong',
                      },
                      {
                        label: 'Best price',
                        price: 4500000,
                        where: 'Thegioididong',
                      },
                      {
                        label: 'Best price',
                        price: 4500000,
                        where: 'Thegioididong',
                      },
                    ]}
                  />
                ),
              },
              {
                label: 'Records',
                tab: <Records />,
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
}
