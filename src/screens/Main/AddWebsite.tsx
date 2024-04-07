import { useState } from 'react';
import { delay, extractDomainName, formatMoney } from '../../utils/helper';
import { GroupPriceProps } from '../../types/prices';
import { useStore } from '../../store/useStore';
import { updateFirebasePrices } from '../../utils/firebase';
import { useUser } from '../../store/useUser';
import { showError, showSuccess } from '@/utils';
import { previewWebsite } from '@/services';
import { FormWebsite } from '@/components/molecules';

export default function AddWebsite() {
  const [websiteLink, setWebsiteLink] = useState<string>('');
  const [activeStep, setActiveStep] = useState(1);
  const [image, setImage] = useState<string>('');
  const [selector, setSelector] = useState<string>('');

  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const [rawText, setRawText] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);
  const setLoading = useStore((state) => state.setLoading);

  async function handlePriceChange() {
    setLoading(true);
    try {
      const responseData = await previewWebsite({
        websiteLink,
        selector,
      });

      setPrice(responseData.price);
      setRawText(() => responseData.rawPrice);
      setImage(() => responseData.logo);

      setActiveStep(() => 2);
    } catch (error) {
      showError(error);
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
                  selector,
                  name: text,
                  avatar: image,
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

        showSuccess();
        await delay(1000);
        window.location.reload();
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }
  }

  return (
    <FormWebsite
      activeStep={activeStep}
      onAddNewProduct={handleAddNewProduct}
      onChangeProduct={setSelectedProduct}
      onPreview={handlePriceChange}
      onSubmit={handleAddWebsite}
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
