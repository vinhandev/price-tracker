import { useEffect, useState } from 'react';
import { delay, formatMoney } from '../../utils/helper';
import { GroupPriceProps } from '../../types/prices';
import { useStore } from '../../store/useStore';
import { updateFirebasePrices } from '../../utils/firebase';
import { useUser } from '../../store/useUser';
import { showError, showSuccess } from '@/utils';
import { previewWebsite } from '@/services';
import { FormWebsite } from '@/components/molecules';
export default function UpdateWebsite() {
  const [websiteLink, setWebsiteLink] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [selector, setSelector] = useState<string>('');

  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const selectedShop = useStore((state) => state.selectedShop);

  const [rawText, setRawText] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);
  const setLoading = useStore((state) => state.setLoading);

  async function handlePreview() {
    setLoading(true);
    try {
      const responseData = await previewWebsite({
        websiteLink,
        selector,
      });

      setPrice(responseData.price);
      setRawText(() => responseData.rawPrice);
      setImage(() => responseData.logo);
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }
  const handleDelete = async () => {
    if (user) {
      setLoading(true);
      try {
        const tmpPrices = prices.map((item) => {
          if (item.label === selectedProduct) {
            const tmpShop = item.data.filter((subItem) => {
              return subItem.name !== selectedShop;
            });

            return {
              label: item.label,
              data: tmpShop,
            };
          }
          return item;
        });

        await updateFirebasePrices(user?.uid, {
          labels,
          prices: tmpPrices,
          lastUpdate: new Date().getTime(),
        });
        showSuccess();
        await delay(1000);
        window.location.reload();
      } catch (error) {
        showError(error);
      }
      setLoading(false);
    }
  };

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
        await delay(1000);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  }
  async function handleUpdate() {
    const defaultText = prices
      .find((item) => item.label === selectedProduct)
      ?.data.find((subItem) => subItem.name === selectedShop)?.name;
    const text = prompt(
      `Update information website:  \n + Website: ${websiteLink} \n + Product: ${selectedProduct} \n + Price: ${formatMoney(
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
              data: item.data.map((subItem) => {
                if (subItem.name === selectedShop) {
                  return {
                    color: '',
                    link: websiteLink,
                    selector,
                    name: text,
                    avatar: image,
                    data: subItem.data,
                  };
                }
                return subItem;
              }),
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

        showSuccess();
        await delay(1000);
        window.location.reload();
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (selectedShop) {
      const shop = prices
        ?.find((item) => item.label === selectedProduct)
        ?.data.find((subItem) => subItem.name === selectedShop);

      setWebsiteLink(() => shop?.link ?? '');
      setImage(() => shop?.avatar ?? '');
      setSelector(() => shop?.selector ?? '');
    }
  }, [selectedProduct, selectedShop]);

  useEffect(() => {
    if (websiteLink) {
      handlePreview();
    }
  }, [websiteLink]);

  return (
    <FormWebsite
      activeStep={2}
      onAddNewProduct={handleAddNewProduct}
      onChangeProduct={setSelectedProduct}
      onPreview={handlePreview}
      onSubmit={handleUpdate}
      onDeleteWebsite={handleDelete}
      prices={prices}
      product={selectedProduct}
      requestParams={{
        link: websiteLink,
        logo: image,
        selector,
        onChangeLogo: setImage,
        onChangeSelector: setSelector,
        onChangeWebsiteLink: setWebsiteLink,
      }}
      responseData={{
        price,
        rawText,
      }}
    />
  );
}
