import React, { useEffect } from 'react';
import {
  convertStringToNumber,
  extractDomainName,
  formatMoney,
  showSuccess,
} from '../../utils/helper';
import { Selector } from '../../components/Inputs/Selector/Selector';
import { GroupPriceProps } from '../../types/prices';
import { useStore } from '../../store/useStore';
import { updateFirebasePrices } from '../../utils/firebase';
import { IconButton } from '../../components';
import { useUser } from '../../store/useUser';

export default function AddWebsite() {
  const [websiteLink, setWebsiteLink] = React.useState('');
  const [beforeCharacters, setBeforeCharacters] = React.useState('<body><');
  const [afterCharacters, setAfterCharacters] = React.useState('<');

  const [selectedProduct, setSelectedProduct] = React.useState('');

  const [websiteSourceCode, setWebsiteSourceCode] = React.useState('');
  const [websiteRemoveBeforeCharacters, setWebsiteRemoveBeforeCharacters] =
    React.useState('');
  const [websiteRemoveAllCharacters, setWebsiteRemoveAllCharacters] =
    React.useState('');
  const [price, setPrice] = React.useState(0);

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);
  const setLoading = useStore((state) => state.setLoading);
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);

  async function handlePriceChange() {
    setLoading(true);
    try {
      const response = await fetch(websiteLink);
      const data = (await response.text())
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\t/g, ' ')
        .split('=""')
        .join('')
        .split(' ')
        .join('');

      const tmpRemoved =
        data?.split(beforeCharacters.split(' ').join(''))[0] ?? '0';
      const tmpPrice =
        data?.split(beforeCharacters.split(' ').join(''))[1] ?? '0';
      const price1 =
        tmpPrice?.split(afterCharacters.split(' ').join(''))[0] ?? '0';
      const number = convertStringToNumber(price1) ?? 0;

      setPrice(number);
      setWebsiteRemoveBeforeCharacters(() => tmpRemoved);
      setWebsiteSourceCode(() => tmpPrice);
      setWebsiteRemoveAllCharacters(() => price1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handleAddNewProduct() {
    const text = prompt('Add new product');
    if (text && user) {
      setLoading(true);
      try {
        prices.push({
          label: text,
          data: [],
        });
        await updateFirebasePrices(user?.uid, {
          prices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        showSuccess();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  }
  async function handleAddWebsite() {
    const defaultText = extractDomainName(websiteLink);
    const text = prompt(
      `Add new name for website:  \n + Website: ${websiteLink} \n + Product: ${selectedProduct} \n + Price: ${formatMoney(
        price
      )}`,
      defaultText ?? ''
    );
    if (text) {
      setLoading(true);
      try {
        const tmpPrices: GroupPriceProps[] = prices.map((item) => {
          console.log('hello', item, selectedProduct);

          if (item.label === selectedProduct) {
            return {
              ...item,
              data: [
                ...item.data,
                {
                  color: '',
                  link: websiteLink,
                  first: beforeCharacters,
                  last: afterCharacters,
                  name: text,
                  data: labels.map((date) => ({
                    price: -1,
                    date,
                  })),
                },
              ],
            };
          }
          return item;
        });
        console.log(
          'tmpPrices',
          tmpPrices[0].data,
          prices[0].data,
          tmpPrices[0].data
        );

        if (user) {
          await updateFirebasePrices(user.uid, {
            prices: tmpPrices,
            labels,
            lastUpdate: new Date().getTime(),
          });
        }
        setLoading(false);

        alert('success');
        window.location.reload();
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (prices && selectedProduct === '') {
      setSelectedProduct(prices[0]?.label ?? '');
    }
  }, [prices]);

  return (
    <div
      style={{
        padding: 20,
        overflow: 'hidden',
      }}
      className="container-fluid"
    >
      <div>
        <IconButton onClick={setOpenSidebar} variant="menu" />
      </div>
      <div className="row">
        <div
          className="item col-12 col-lg-4 gap-3"
          style={{
            padding: 10,
            gap: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="fs-5">Products</div>
          <div className="d-flex flex-row gap-3">
            <Selector
              data={
                prices?.map((item) => ({
                  label: item.label,
                  value: item.label,
                })) ?? []
              }
              value={selectedProduct}
              onChange={setSelectedProduct}
            />
            <button onClick={handleAddNewProduct} className="btn btn-primary">
              +
            </button>
          </div>
          <div className="fs-5">Website</div>
          <input
            className="form-control"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
          />
          <div className="fs-5">First</div>
          <input
            className="form-control"
            value={beforeCharacters}
            onChange={(e) => setBeforeCharacters(e.target.value)}
          />
          <div className="fs-5">Last</div>
          <input
            className="form-control"
            value={afterCharacters}
            onChange={(e) => setAfterCharacters(e.target.value)}
          />

          <button onClick={handlePriceChange} className="btn btn-primary">
            Preview Website
          </button>
        </div>
        <div
          className="item col-12 col-lg-8 gap-3 d-flex flex-column"
          style={{
            padding: 10,
          }}
        >
          <div className="fs-5">Removed before characters</div>
          <div
            className="form-control"
            style={{
              height: 100,
              overflow: 'auto',
              padding: 10,
            }}
          >
            <div>{websiteRemoveBeforeCharacters}</div>
          </div>
          <div className="fs-5">Price remove before characters</div>
          <div
            className="form-control"
            style={{
              height: 100,
              overflow: 'auto',
              padding: 10,
            }}
          >
            <div>{websiteSourceCode}</div>
          </div>
          <div className="fs-5">Price remove after characters</div>
          <div
            className="form-control"
            style={{
              height: 100,
              overflowY: 'auto',
              width: '100%',

              padding: 10,
            }}
          >
            {websiteRemoveAllCharacters}
          </div>
          <div className="fs-5">Price only numbers</div>
          <div
            className="form-control"
            style={{
              height: 100,
              overflowY: 'auto',
              width: '100%',

              padding: 10,
            }}
          >
            {price}
          </div>
          <div className="fs-5">Formatted file</div>
          <div
            className="form-control"
            style={{
              height: 100,
              overflowY: 'auto',
              width: '100%',
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
    </div>
  );
}
