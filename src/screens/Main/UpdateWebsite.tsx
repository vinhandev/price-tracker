import React, { useEffect } from 'react';
import {
  convertStringToNumber,
  extractDomainName,
  formatMoney,
} from '../../utils/helper';
import { GroupPriceProps } from '../../types/prices';
import { useStore } from '../../store/useStore';
import { updateFirebasePrices } from '../../utils/firebase';
import { useUser } from '../../store/useUser';

export default function UpdateWebsite() {
  const [beforeCharacters, setBeforeCharacters] = React.useState('');
  const [afterCharacters, setAfterCharacters] = React.useState('<');

  const [websiteRemoveBeforeCharacters, setWebsiteRemoveBeforeCharacters] =
    React.useState('');
  const [websiteSourceCode, setWebsiteSourceCode] = React.useState('');
  const [websiteRemoveAllCharacters, setWebsiteRemoveAllCharacters] =
    React.useState('');
  const [price, setPrice] = React.useState(0);

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);

  const selectedShop = useStore((state) => state.selectedShop);
  const selectedProduct = useStore((state) => state.selectedProduct);

  const selectedProductProps = prices.find(
    (item) => item.label === selectedProduct
  );
  const selectedShopProps = selectedProductProps?.data.find(
    (item) => item.name === selectedShop
  );
  const websiteLink = selectedShopProps?.link;
  const labels = useStore((state) => state.labels);
  const setLoading = useStore((state) => state.setLoading);

  async function handlePreview() {
    setLoading(true);
    try {
      if (!websiteLink) return;
      const response = await fetch(websiteLink);
      const data = (await response.text())
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\t/g, ' ')
        .split('=""')
        .join('')
        .split(' ')
        .join('');

      const beforeRemoveCharacters =
        data?.split(beforeCharacters.split(' ').join(''))[0] ?? '0';
      const tmpPrice =
        data?.split(beforeCharacters.split(' ').join(''))[1] ?? '0';
      const price1 =
        tmpPrice?.split(afterCharacters.split(' ').join(''))[0] ?? '0';
      const number = convertStringToNumber(price1) ?? 0;

      setPrice(number);
      setWebsiteRemoveBeforeCharacters(() => beforeRemoveCharacters);
      setWebsiteSourceCode(() => tmpPrice);
      setWebsiteRemoveAllCharacters(() => price1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handleUpdateWebsite() {
    if (!websiteLink) return;
    const defaultText = extractDomainName(websiteLink);
    const text = prompt(
      `Add new name for website:  \n + Website: ${websiteLink} \n + Product: ${selectedProduct} \n + Price: ${formatMoney(
        price
      )}`,
      defaultText ?? ''
    );
    if (text && user) {
      setLoading(true);
      try {
        const tmpPrices: GroupPriceProps[] = prices.map((item) => {
          if (item.label === selectedProduct) {
            return {
              label: item.label,
              data: item.data.map((subItem) => {
                if (subItem.name === selectedShop) {
                  return {
                    ...subItem,
                    first: beforeCharacters,
                    last: afterCharacters,
                  };
                }
                return subItem;
              }),
            };
          }
          return item;
        });

        await updateFirebasePrices(user.uid, {
          prices: tmpPrices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        setLoading(false);

        alert('success');
        window.location.href = '/home';
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (selectedProduct && selectedShop) {
      setAfterCharacters(selectedShopProps?.last ?? '<');
      setBeforeCharacters(selectedShopProps?.first ?? '');
    }
  }, [selectedProduct, selectedShop]);

  useEffect(() => {
    handlePreview();
  }, [beforeCharacters, afterCharacters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        height: '100%',
        overflow: 'auto',
      }}
      className="container-fluid"
    >
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
            <input className="form-control" value={selectedProduct} disabled />
          </div>
          <div className="fs-5">Website</div>
          <input className="form-control" value={websiteLink} disabled />
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

          <button onClick={handlePreview} className="btn btn-primary">
            Preview Website
          </button>
        </div>
        <div
          className="item col-12 col-lg-8 gap-3 d-flex flex-column"
          style={{
            padding: 10,
          }}
        >
          <div className="fs-5">Removed characters</div>
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
          <button onClick={handleUpdateWebsite} className="btn btn-primary">
            Update Website Link
          </button>
        </div>
      </div>
    </div>
  );
}
