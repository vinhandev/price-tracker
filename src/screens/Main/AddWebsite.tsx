import { useState } from 'react';
import { delay, extractDomainName, formatMoney } from '../../utils/helper';
import { Selector } from '../../components/atoms/Inputs/Selector/Selector';
import { GroupPriceProps } from '../../types/prices';
import { useStore } from '../../store/useStore';
import { updateFirebasePrices } from '../../utils/firebase';
import { useUser } from '../../store/useUser';
import { Box, IconButton } from '@mui/material';
import TextInput from '@/components/atoms/Inputs/TextInput/TextInput';
import Tab from '@/HOCs/Tab';
import AddIcon from '@mui/icons-material/Add';
import { Label } from '@/components/atoms';
import { showError, showSuccess } from '@/utils';
import { Button } from '@/components';
import { previewWebsite } from '@/services';
export default function AddWebsite() {
  const [websiteLink, setWebsiteLink] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [beforeCharacters, setBeforeCharacters] = useState<string>('<!');
  const [afterCharacters, setAfterCharacters] = useState<string>('</html>');

  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const [websiteSourceCode, setWebsiteSourceCode] = useState<string>('');
  const [websiteRemoveBeforeCharacters, setWebsiteRemoveBeforeCharacters] =
    useState<string>('');
  const [websiteRemoveAllCharacters, setWebsiteRemoveAllCharacters] =
    useState<string>('');
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
        beforeCharacters,
        afterCharacters,
      });

      setPrice(responseData.price);
      setWebsiteRemoveBeforeCharacters(
        () => responseData.websiteRemoveBeforeCharacters
      );
      setWebsiteSourceCode(() => responseData.websiteSourceCode);
      setWebsiteRemoveAllCharacters(
        () => responseData.websiteRemoveAllCharacters
      );
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
                  first: beforeCharacters,
                  last: afterCharacters,
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
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            width: '400px',

            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
            }}
          >
            <Tab title="Select Product">
              <IconButton
                onClick={handleAddNewProduct}
                sx={{
                  position: 'absolute',
                  right: '20px',
                  top: '20px',
                  zIndex: 9999,

                  width: '30px',
                  height: '30px',
                }}
              >
                <AddIcon />
              </IconButton>
              <Box
                sx={{
                  paddingTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <Selector
                  label="Product"
                  data={
                    prices?.map((item) => ({
                      label: item.label,
                      value: item.label,
                    })) ?? []
                  }
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                />
              </Box>
            </Tab>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 2,
            }}
          >
            <Tab title="Input New Website">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',

                  flex: 1,

                  paddingTop: '20px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  <TextInput
                    disabled={selectedProduct === ''}
                    label={'Website'}
                    value={websiteLink}
                    onChange={(value) => {
                      setWebsiteLink(value);
                    }}
                    errorText=""
                    isError={false}
                  />
                  <TextInput
                    disabled={selectedProduct === ''}
                    label={'Logo'}
                    value={image}
                    onChange={(value) => setImage(value)}
                    errorText=""
                    isError={false}
                  />
                  <TextInput
                    disabled={selectedProduct === ''}
                    label={'First'}
                    value={beforeCharacters}
                    onChange={(value) => setBeforeCharacters(value)}
                    errorText=""
                    isError={false}
                  />
                  <TextInput
                    disabled={selectedProduct === ''}
                    label={'Last'}
                    value={afterCharacters}
                    onChange={(value) => setAfterCharacters(value)}
                    errorText=""
                    isError={false}
                  />
                </Box>
                <Button
                  sx={{
                    height: '50px',
                  }}
                  variant="contained"
                  disabled={selectedProduct === ''}
                  onClick={handlePriceChange}
                >
                  Preview Website
                </Button>
              </Box>
            </Tab>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <Tab title="Preview">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',

                flex: 1,

                paddingTop: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Label label={'Photo'} />
                  <Box
                    sx={{
                      borderRadius: '10px',
                      height: '150px',
                      width: undefined,
                      aspectRatio: 1,
                      border: `1px solid rgba(228, 219, 233, 0.25)`,
                    }}
                  >
                    <img
                      src={image}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,

                    gap: '10px',
                  }}
                >
                  <TextInput
                    disabled={selectedProduct === ''}
                    label={'Price only numbers'}
                    value={`${price}`}
                    onChange={() => {}}
                    errorText=""
                    isError={false}
                  />
                  <TextInput
                    disabled={selectedProduct === ''}
                    label={'Formatted price'}
                    value={formatMoney(price)}
                    onChange={() => {}}
                    errorText=""
                    isError={false}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <TextInput
                  multiline
                  rows={3}
                  disabled={selectedProduct === ''}
                  label={'Removed before characters'}
                  value={websiteRemoveBeforeCharacters}
                  onChange={() => {}}
                  errorText=""
                  isError={false}
                />
                <TextInput
                  multiline
                  rows={3}
                  disabled={selectedProduct === ''}
                  label={'Price remove before characters'}
                  value={websiteSourceCode}
                  onChange={() => {}}
                  errorText=""
                  isError={false}
                />
                <TextInput
                  multiline
                  rows={3}
                  disabled={selectedProduct === ''}
                  label={'Price remove after characters'}
                  value={websiteRemoveAllCharacters}
                  onChange={() => {}}
                  errorText=""
                  isError={false}
                />
              </Box>
              <Button
                sx={{
                  height: '50px',
                }}
                variant="contained"
                disabled={selectedProduct === ''}
                onClick={handleAddWebsite}
              >
                Submit Website
              </Button>
            </Box>
          </Tab>
        </Box>
      </Box>
    </div>
  );
}
