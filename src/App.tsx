import { useEffect, useState } from 'react';
import './App.css';
import { convertStringToNumber } from './utils/helper';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './services/firebase';
import { colors } from './assets/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type PriceProps = {
  name: string;
  data?: {
    price: number;
    date: number;
  }[];
  link: string;
  first: string;
  last: string;
  color: string;
};

export type GroupPriceProps = {
  label: string;
  data: PriceProps[];
};

function App() {
  const initData: GroupPriceProps[] = [
    {
      label: 'Iphone 13 Chính Hãng',
      data: [
        {
          name: 'Apple',
          link: 'https://www.apple.com/vn/shop/buy-iphone/iphone-13',
          first: `<spanclass="dimensionCapacity">128<small>GB<spanclass="visuallyhidden">Chúthích</span>²</small></span><spanclass="dimensionColor">Hồng</span><spanclass="carrier-logos">Unlocked</span><spanclass="price"><spanclass="current_price">`,
          last: `<`,
          color: '#FF8911',
        },
        {
          name: 'FPT',
          link: 'https://fptshop.com.vn/dien-thoai/iphone-13',
          first: `iPhone13128GB</a></span><p>`,
          last: `<`,
          color: '#CDFADB',
        },
        {
          name: 'The gioi di dong',
          link: 'https://www.thegioididong.com/dtdd/iphone-13',
          first: `<p class="box-price-present">`,
          last: `&#x2`,
          color: '#CDFADB',
        },
        {
          name: 'Cellphones',
          link: 'https://cellphones.com.vn/iphone-13.html',
          first: `<div data-v-da80e888><strong>128GB</strong></div><span data-v-da80e888>`,
          last: `</span>`,
          color: '#CDFADB',
        },
        {
          name: 'HoanghaMobile',

          link: 'https://hoanghamobile.com/dien-thoai-di-dong/apple-iphone-13-128gb-chinh-hang-vn-a',

          first: `<span><label><strong>128GB</strong></label></span><strong>`,
          last: `</strong>`,
          color: '#CDFADB',
        },
        {
          name: 'ShopDunk',

          link: 'https://shopdunk.com/iphone-13',

          first: `<span id="price-value-59" class="new-price price-value-59">`,
          last: `</span>`,
          color: '#CDFADB',
        },
        {
          name: 'Viettel',

          link: 'https://viettelstore.vn/dien-thoai/iphone-13-128gb-pid288660.html',

          first: `<div class="version-product active">iPhone 13 128GB<span class="txt-price" data-id="288660">`,
          last: `<span`,
          color: '#CDFADB',
        },
        {
          name: '2TMobile',

          link: 'https://2tmobile.com/iphone-13-128gb-chinh-hang-vn-a/',

          first: `<span class="woocommerce-Price-amount amount"><bdi>`,
          last: `&nbsp`,
          color: '#CDFADB',
        },
        {
          name: 'Dien may cho lon',

          link: 'https://dienmaycholon.vn/dien-thoai-di-dong/iphone-13-128gb-chinh-hang-vna',

          first: `<span class="price-pro">`,
          last: `</span>`,
          color: '#CDFADB',
        },
      ],
    },
    {
      label: 'Iphone 13 Cũ',
      data: [
        {
          name: 'Phuc Khang Mobile',

          link: 'https://phuckhangmobile.com/iphone-13-128gb-quoc-te-zin-99-6085.html',

          first: `<span class="value">Zin - 99%</span><span class="price">`,
          last: `</span>`,
          color: '#EBD9B4',
        },
        {
          name: 'XTMobile',

          link: 'https://www.xtmobile.vn/iphone-13-128gb-cu-likenew',

          first: `<span class="price" id="price" itemprop="price" content="11999000">`,
          last: `</span>`,
          color: '#EBD9B4',
        },
        {
          name: '2TMobile',

          link: 'https://2tmobile.com/iphone-13-128gb-cu-dep-99/',

          first: `<span class="woocommerce-Price-amount amount"><bdi>`,
          last: `&nbsp`,
          color: '#EBD9B4',
        },
        {
          name: 'Di Dong Viet',

          link: 'https://didongviet.vn/may-cu-gia-re/iphone-13-128gb-likenew.html',

          first: `{"@type":"Offer","price":"`,
          last: `"`,
          color: '#EBD9B4',
        },
        {
          name: 'Phuc Khang Mobile',

          link: 'https://phuckhangmobile.com/iphone-13-128gb-quoc-te-likenew-98-6102.html',

          first: `<span class="value">Likenew - 98%</span><span class="price">`,
          last: `</span>`,
          color: '#EBD9B4',
        },
        {
          name: 'Click Buy',

          link: 'https://clickbuy.com.vn/apple-iphone-13-128gb-chinh-hang-cu.html',

          first: `<p class="price">`,
          last: `<`,
          color: '#EBD9B4',
        },
        {
          name: 'Click Buy',

          link: 'https://clickbuy.com.vn/iphone-13-128gb-lock-cu-dep-99.html',

          first: `<p class="price">`,
          last: `<`,
          color: '#E78895',
        },
      ],
    },
    {
      label: 'Android phone',
      data: [
        {
          name: 'MobileCity',

          link: 'https://mobilecity.vn/dien-thoai/xiaomi-redmi-note-12-turbo-edition.html',

          first: `<div class="price-product"> <p class="price">`,
          last: `</p>`,
          color: '#7FC7D9',
        },
        {
          name: 'DienThoaiHay',

          link: 'https://dienthoaihay.vn/xiaomi/xiaomi-redmi-note-12-turbo-edition-p601.html?bonho=12gb-256gb&mau=xanh',

          first: `<div class="extend_name"> 12GB / 256GB</div><div class="extend_price">`,
          last: `</div>`,
          color: '#7FC7D9',
        },
        {
          name: 'DienThoaiHay',

          link: 'https://dienthoaihay.vn/xiaomi/xiaomi-redmi-note-13-pro-5g-p706.html?mau=tim&bonho=12gb-256gb',

          first: `<div class="extend_name"> 12GB / 256GB</div><div class="extend_price">`,
          last: `</div>`,
          color: '#7FC7D9',
        },
        {
          name: 'DienThoaiHay',

          link: 'https://dienthoaihay.vn/realme/realme-gt-neo-5-se-5g-p572.html?mau=xanh-da-sac&bonho=12gb-256gb',

          first: `<div class="extend_name"> 12GB / 256GB</div><div class="extend_price">`,
          last: `</div>`,
          color: '#7FC7D9',
        },
      ],
    },
    {
      label: ' Macbook Pro M1',
      data: [
        {
          name: 'Cellphones',
          link: 'https://cellphones.com.vn/macbook-pro-14-inch-2021-1tb.html',
          first: `<span data-v-da80e888>`,
          last: `</span>`,
          color: '#CDFADB',
        },
        {
          name: 'Mac24h',
          link: 'https://mac24h.vn/macbook-pro-14-inch-2021-apple-m1-pro-10-core-cpu-16-core-gpu16gb-1tb-like-new-cha-active.html',
          first: `<span id="sec_discounted_price_41803" class="ty-price-num">`,
          last: `</span>`,
          color: '#CDFADB',
        },
        {
          name: 'Mac24h',

          link: 'https://mac24h.vn/macbook-pro-14-inch-2021-apple-m1-pro-8-core-cpu-14-core-gpu16gb-512gb.html',

          first: `<span id="sec_discounted_price_41626" class="ty-price-num">`,
          last: `</span>`,
          color: '#CDFADB',
        },
        {
          name: '2TMobile',

          link: 'https://2tmobile.com/macbook-pro-14-2021-m1-pro-10-cpu-16-gpu-16gb-1tb-cu-99/',

          first: `<span class="woocommerce-Price-amount amount"><bdi>`,
          last: `&nbsp`,
          color: '#CDFADB',
        },
        {
          name: 'Trungtran.vn',

          link: 'https://trungtran.vn/macbook-pro-14-m1-pro-2021/',

          first: `<span class="_price">`,
          last: `<`,
          color: '#CDFADB',
        },
      ],
    },
  ];

  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [prices, setPrices] = useState<GroupPriceProps[]>([]);

  async function handleFetch(paramPrices: GroupPriceProps[]) {
    setProgressValue(0);
    setLoading(true);
    try {
      for (let index = 0; index < paramPrices.length; index++) {
        const group = paramPrices[index];
        for (let i = 0; i < group?.data.length; i++) {
          const element = paramPrices[index].data[i];
          const response = await fetch(element.link, {
            // headers: {
            //   'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Methods':'PUT, GET, HEAD, POST, DELETE, OPTIONS'
            // },
          });
          setProgressValue(index + 1);
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
          if (price !== '0') {
            const number = convertStringToNumber(price);
            if (number !== null) {
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
            }
          } else {
            element.data?.push({
              price: 0,
              date: new Date().getTime(),
            });
          }
        }
      }
      setPrices(paramPrices);
      await setDoc(doc(db, 'Prices', 'vinhan'), { data: paramPrices });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setCount(count + 1);
  }

  useEffect(() => {
    async function getData() {
      const response = await getDoc(doc(db, 'Prices', 'vinhan'));

      if (response.exists()) {
        if (response.data().data?.length > 0) {
          setPrices(response.data().data as GroupPriceProps[]);
          await handleFetch(response.data().data as GroupPriceProps[]);
        } else {
          setPrices(initData);
          await handleFetch(initData);
        }
      }
    }
    getData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="spinner-border" role="status" />
        <h6
          style={{
            paddingTop: 20,
          }}
        >
          {Math.round((progressValue / (initData.length + 1)) * 100)} %
        </h6>
      </div>
    );

  return (
    <div
      style={{
        width: '100%',
        padding: 10,
      }}
    >
      <h3>Reload count:{count}</h3>
      <div
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          display: 'flex',
          gap: 20,
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            await handleFetch(prices);
          }}
        >
          Reload
        </button>
        {/* <button
          type="button"
          className="btn btn-danger"
          onClick={async () => {
            await deleteDoc(doc(db, 'Prices', 'vinhan'));
            await setPrices(initData);
            await handleFetch(initData);
          }}
        >
          Delete
        </button> */}
      </div>
      <div
        style={{
          borderRadius: 10,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {prices?.map((item) => (
          <div
            key={item.label}
            style={{
              width: '100%',
              paddingBottom: 20,
              height: '100vh',
            }}
          >
            <div>{item.label}</div>
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,

                onClick: (_, elements) => {
                  if (elements.length > 0) {
                    const clickedElement = elements[0];
                    const datasetIndex = clickedElement.datasetIndex;
                    const selectedData = item?.data?.[datasetIndex];
                    if (selectedData?.link) {
                      window.open(selectedData.link, '_blank');
                    }
                  }
                },
              }}
              data={{
                labels:
                  item?.data?.[1]?.data?.map(
                    (item) =>
                      `${new Date(item.date).getHours()}:${new Date(
                        item.date
                      ).getMinutes()} ${new Date(item.date).toDateString()}`
                  ) ?? [],
                datasets: item?.data?.map((subItem, subIndex) => ({
                  label: subItem.name,
                  data:
                    subItem?.data?.map((subItem) => {
                      if (subItem.price === noPrice) {
                        return undefined;
                      }
                      return subItem.price;
                    }) ?? [],
                  borderColor: colors[subIndex],
                  backgroundColor: `${colors[subIndex]}55`,
                })),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
