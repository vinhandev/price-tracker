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
      name: 'APPLE: iPhone 13 128GB',
      date: new Date(),
      link: 'https://www.apple.com/vn/shop/buy-iphone/iphone-13',
      price: '0',
      first: `<spanclass="dimensionCapacity">128<small>GB<spanclass="visuallyhidden">Chúthích</span>²</small></span><spanclass="dimensionColor">Hồng</span><spanclass="carrier-logos">Unlocked</span><spanclass="price"><spanclass="current_price">`,
      last: `<`,
      color: '#FF8911',
    },
    {
      name: 'FPT: iPhone 13 128GB | Chính hãng VN/A',
      date: new Date(),
      link: 'https://fptshop.com.vn/dien-thoai/iphone-13',
      price: '0',
      first: `iPhone13128GB</a></span><p>`,
      last: `<`,
      color: '#CDFADB',
    },
    {
      name: 'THEGIOIDIDONG: iPhone 13 128GB | Chính hãng VN/A',
      date: new Date(),
      link: 'https://www.thegioididong.com/dtdd/iphone-13',
      price: '0',
      first: `<p class="box-price-present">`,
      last: `&#x2`,
      color: '#CDFADB',
    },
    {
      name: 'CELLPHONES: iPhone 13 128GB | Chính hãng VN/A',
      date: new Date(),
      link: 'https://cellphones.com.vn/iphone-13.html',
      price: '0',
      first: `<div data-v-da80e888><strong>128GB</strong></div><span data-v-da80e888>`,
      last: `</span>`,
      color: '#CDFADB',
    },
    {
      name: 'HOANGHAMOBILE: Điện thoại iPhone 13 (128GB) - Chính hãng VN/A',
      date: new Date(),
      link: 'https://hoanghamobile.com/dien-thoai-di-dong/apple-iphone-13-128gb-chinh-hang-vn-a',
      price: '0',
      first: `<span><label><strong>128GB</strong></label></span><strong>`,
      last: `</strong>`,
      color: '#CDFADB',
    },
    {
      name: 'SHOPDUNK: Điện thoại iPhone 13 (128GB) - Chính hãng VN/A',
      date: new Date(),
      link: 'https://shopdunk.com/iphone-13',
      price: '0',
      first: `<span id="price-value-59" class="new-price price-value-59">`,
      last: `</span>`,
      color: '#CDFADB',
    },
    {
      name: 'VIETTEL: iPhone 13 128GB',
      date: new Date(),
      link: 'https://viettelstore.vn/dien-thoai/iphone-13-128gb-pid288660.html',
      price: '0',
      first: `<div class="version-product active">iPhone 13 128GB<span class="txt-price" data-id="288660">`,
      last: `<span`,
      color: '#CDFADB',
    },
    {
      name: '2TMOBILE: iPhone 13 128GB Chính hãng',
      date: new Date(),
      link: 'https://2tmobile.com/iphone-13-128gb-chinh-hang-vn-a/',
      price: '0',
      first: `<span class="woocommerce-Price-amount amount"><bdi>`,
      last: `&nbsp`,
      color: '#CDFADB',
    },
    {
      name: 'DIENMAYCHOLON: iPhone 13 128GB Chính Hãng (VN/A)',
      date: new Date(),
      link: 'https://dienmaycholon.vn/dien-thoai-di-dong/iphone-13-128gb-chinh-hang-vna',
      price: '0',
      first: `<span class="price-pro">`,
      last: `</span>`,
      color: '#CDFADB',
    },
    {
      name: 'PHUCKHANGMOBILE: iPhone 13 128GB Quốc Tế (Zin - 99%)',
      date: new Date(),
      link: 'https://phuckhangmobile.com/iphone-13-128gb-quoc-te-zin-99-6085.html',
      price: '0',
      first: `<span class="value">Zin - 99%</span><span class="price">`,
      last: `</span>`,
      color: '#EBD9B4',
    },
    {
      name: 'XTMOBILE: iPhone 13 128GB (Cũ 99%)',
      date: new Date(),
      link: 'https://www.xtmobile.vn/iphone-13-128gb-cu-likenew',
      price: '0',
      first: `<span class="price" id="price" itemprop="price" content="11999000">`,
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
      name: 'DIDONGVIET: iPhone 13 128GB (Likenew)',
      date: new Date(),
      link: 'https://didongviet.vn/may-cu-gia-re/iphone-13-128gb-likenew.html',
      price: '0',
      first: `{"@type":"Offer","price":"`,
      last: `"`,
      color: '#EBD9B4',
    },
    {
      name: 'PHUCKHANGMOBILE: iPhone 13 128GB Quốc Tế (Likenew - 98%)',
      date: new Date(),
      link: 'https://phuckhangmobile.com/iphone-13-128gb-quoc-te-likenew-98-6102.html',
      price: '0',
      first: `<span class="value">Likenew - 98%</span><span class="price">`,
      last: `</span>`,
      color: '#EBD9B4',
    },
    {
      name: 'CLICKBUY: iPhone 13 128GB Cũ đẹp 99%',
      date: new Date(),
      link: 'https://clickbuy.com.vn/apple-iphone-13-128gb-chinh-hang-cu.html',
      price: '0',
      first: `<p class="price">`,
      last: `<`,
      color: '#EBD9B4',
    },
    {
      name: 'CLICKBUY: iPhone 13 Lock 128GB Cũ đẹp 99%',
      date: new Date(),
      link: 'https://clickbuy.com.vn/iphone-13-128gb-lock-cu-dep-99.html',
      price: '0',
      first: `<p class="price">`,
      last: `<`,
      color: '#E78895',
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
      name: 'DIENTHOAIHAY: Xiaomi Redmi Note 13 Pro 5G 12gb/256gb',
      date: new Date(),
      link: 'https://dienthoaihay.vn/xiaomi/xiaomi-redmi-note-13-pro-5g-p706.html?mau=tim&bonho=12gb-256gb',
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
    {
      name: 'TRUNGTRAN.VN: Macbook Pro 14 M1 Pro RAM 16GB SSD 512GB Retina 2021',
      date: new Date(),
      link: 'https://trungtran.vn/macbook-pro-14-m1-pro-2021/',
      price: '0',
      first: `<span class="_price">`,
      last: `<`,
      color: '#CDFADB',
    },
  ];
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [data, setData] = useState<Props[]>(initData);

  async function handleFetch() {
    setProgressValue(0);
    setLoading(true);
    try {
      for (let index = 0; index < initData.length; index++) {
        const element = initData[index];
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
        console.log(index, data);

        const price =
          data
            .split(element.first.split(' ').join(''))[1]
            ?.split(element.last.split(' ').join(''))[0] ?? '0';
        if (price !== '0') {
          initData[index].price = price;
        }
      }
      setData(initData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setCount(count + 1);
  }

  useEffect(() => {
    handleFetch();
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
            paddingTop: 10,
          }}
        >
          {Math.round((progressValue / initData.length) * 100)} %
        </h6>
      </div>
    );

  return (
    <div
      style={{
        width: '100%',
        padding: 50,
      }}
    >
      <h3>Reload count:{count}</h3>
      <div
        style={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            await handleFetch();
          }}
        >
          Reload
        </button>
      </div>
      <div
        style={{
          borderRadius: 10,
        }}
      >
        {data.map((item) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
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
    </div>
  );
}

export default App;
