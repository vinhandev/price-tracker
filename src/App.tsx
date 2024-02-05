import { useEffect, useState } from 'react';
import './App.css';

type Props = {
  name: string;
  date: Date;
  price: string;
  link: string;
  first: string;
  last: string;
  color: string;
};
function App() {
  const initData: Props[] = [
    {
      name: 'CLICKBUY: iPhone 13 128GB Cũ đẹp 99% 128Gb',
      date: new Date(),
      link: 'https://clickbuy.com.vn/apple-iphone-13-128gb-chinh-hang-cu.html',
      price: '0',
      first: `<span>Black <br> <span class="font-normal">`,
      last: `</span>`,
      color: '#EBD9B4',
    },
    {
      name: 'CLICKBUY: iPhone 13 Lock 128GB Cũ đẹp 99%',
      date: new Date(),
      link: 'https://clickbuy.com.vn/iphone-13-128gb-lock-cu-dep-99.html',
      price: '0',
      first: `<span>Black <br> <span class="font-normal">`,
      last: `</span>`,
      color: '#EBD9B4',
    },
    {
      name: '2TMOBILE: iPhone 13 128GB 99%',
      date: new Date(),
      link: 'https://2tmobile.com/iphone-13-128gb-cu-dep-99/',
      price: '0',
      first: `<span class="woocommerce-Price-amount amount"><bdi>`,
      last: `&nbsp`,
      color: '#EBD9B4',
    },
    {
      name: '2TMOBILE: iPhone 13 128GB Chính hãng',
      date: new Date(),
      link: 'https://2tmobile.com/iphone-13-128gb-chinh-hang-vn-a/',
      price: '0',
      first: `<span class="woocommerce-Price-amount amount"><bdi>`,
      last: `&nbsp`,
      color: '#EBD9B4',
    },
    {
      name: 'MOBILECITY: Điện thoại Xiaomi Redmi Note 12 Turbo (Snapdragon 7+ Gen 2) 8-128gb',
      date: new Date(),
      link: 'https://mobilecity.vn/dien-thoai/xiaomi-redmi-note-12-turbo-edition.html',
      price: '0',
      first: `<div class="price-product"> <p class="price">`,
      last: `</p>`,
      color: '#7FC7D9',
    },
    {
      name: 'DIENTHOAIHAY: Xiaomi Redmi Note 12 Turbo Edition 12gb/256gb',
      date: new Date(),
      link: 'https://dienthoaihay.vn/xiaomi/xiaomi-redmi-note-12-turbo-edition-p601.html?bonho=12gb-256gb&mau=xanh',
      price: '0',
      first: `<div class="extend_name"> 12GB / 256GB</div><div class="extend_price">`,
      last: `</div>`,
      color: '#7FC7D9',
    },
    {
      name: 'DIENTHOAIHAY: Realme GT Neo5 SE 5G 12/256gb',
      date: new Date(),
      link: 'https://dienthoaihay.vn/realme/realme-gt-neo-5-se-5g-p572.html?mau=xanh-da-sac&bonho=12gb-256gb',
      price: '0',
      first: `<div class="extend_name"> 12GB / 256GB</div><div class="extend_price">`,
      last: `</div>`,
      color: '#7FC7D9',
    },
    {
      name: 'CELLPHONES: Macbook Pro 14 M1 Pro 10 CPU - 16 GPU 16GB 1TB 2021 | Chính hãng Apple Việt Nam',
      date: new Date(),
      link: 'https://cellphones.com.vn/macbook-pro-14-inch-2021-1tb.html',
      price: '0',
      first: `<span data-v-da80e888>`,
      last: `</span>`,
      color: '#CDFADB',
    },
    {
      name: 'MAC24H:【USED】Macbook Pro 14 inch 2021 【Apple M1 Pro 10-core CPU, 16-core GPU】16GB 1TB',
      date: new Date(),
      link: 'https://mac24h.vn/macbook-pro-14-inch-2021-apple-m1-pro-10-core-cpu-16-core-gpu16gb-1tb-like-new-cha-active.html',
      price: '0',
      first: `<span id="sec_discounted_price_41803" class="ty-price-num">`,
      last: `</span>`,
      color: '#CDFADB',
    },
    {
      name: 'MAC24H: Macbook Pro 14 inch 2021 【Apple M1 Pro 8-core CPU, 14-core GPU】16GB 512GB',
      date: new Date(),
      link: 'https://mac24h.vn/macbook-pro-14-inch-2021-apple-m1-pro-8-core-cpu-14-core-gpu16gb-512gb.html',
      price: '0',
      first: `<span id="sec_discounted_price_41626" class="ty-price-num">`,
      last: `</span>`,
      color: '#CDFADB',
    },
    {
      name: '2TMOBILE: MacBook Pro 14 2021 M1 Pro 16GB 1TB 99%',
      date: new Date(),
      link: 'https://2tmobile.com/macbook-pro-14-2021-m1-pro-10-cpu-16-gpu-16gb-1tb-cu-99/',
      price: '0',
      first: `<span class="woocommerce-Price-amount amount"><bdi>`,
      last: `&nbsp`,
      color: '#CDFADB',
    },
  ];
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<Props[]>(initData);
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

  useEffect(() => {
    async function handleFetch() {
      for (let index = 0; index < initData.length; index++) {
        const element = initData[index];
        const response = await fetch(corsAnywhereUrl + element.link.replace('https://', ''), {
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Methods':'PUT, GET, HEAD, POST, DELETE, OPTIONS'
          // },
        });
        const data = (await response.text())
          .replace(/\n/g, ' ')
          .replace(/\r/g, ' ')
          .replace(/\t/g, ' ')
          .split(' ')
          .join('');
        console.log(index, data);

        const price =
          data
            .split(element.first.split(' ').join(''))[1]
            ?.split(element.last.split(' ').join(''))[0] ?? '0';
        initData[index].price = price;
      }
      setData(initData);
    }
    setInterval(async () => {
      console.log('reload');
      await handleFetch();
      setCount((prev) => prev + 1);
    }, 10000);
  }, []);

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <h3>Reload count:{count}</h3>
      {data.map((item) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            margin: 'auto',
            backgroundColor: item.color,
          }}
          key={item.link}
        >
          <div
            style={{
              borderWidth: 1,
              width: '70%',
              fontWeight: 'bold',
              border: '1px solid black',
              padding: 20,
            }}
          >
            <a href={item.link}>{item.name}</a>
          </div>
          <div
            style={{
              width: '30%',
              border: '1px solid black',
              padding: 20,
            }}
          >
            {item.price}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
