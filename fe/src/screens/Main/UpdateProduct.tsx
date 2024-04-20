import { useEffect, useState } from 'react';
import { Selector } from '../../components/atoms/Inputs/Selector/Selector';
import { GroupPriceProps } from '../../types/prices';
import { useStore } from '../../store/useStore';
import { updateFirebasePrices } from '../../utils/firebase';
import { useUser } from '../../store/useUser';
import { Box, IconButton } from '@mui/material';
import Tab from '@/HOCs/Tab';
import AddIcon from '@mui/icons-material/Add';
import TextInput from '@/components/atoms/Inputs/TextInput/TextInput';
import { delay, showError, showSuccess } from '@/utils';
import { Button } from '@/components';
export default function UpdateProduct() {
  const [name, setName] = useState<string>('');

  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const labels = useStore((state) => state.labels);
  const setLoading = useStore((state) => state.setLoading);

  const handleDelete = async () => {
    if (user) {
      setLoading(true);
      try {
        const tmpPrices = prices.filter(
          (item) => item.label !== selectedProduct
        );

        await updateFirebasePrices(user?.uid, {
          labels,
          prices: tmpPrices,
          lastUpdate: new Date().getTime(),
        });
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
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  }
  async function handleUpdateProduct() {
    setLoading(true);
    try {
      const tmpPrices: GroupPriceProps[] = prices.map((item) => {
        console.log('hello', item, selectedProduct);

        if (item.label === selectedProduct) {
          return {
            label: name,
            data: item.data,
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

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct);
    }
  }, [selectedProduct]);

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
                  onChange={(value) => {
                    setSelectedProduct(value);
                  }}
                />
                <TextInput
                  label={'Name'}
                  value={name}
                  onChange={setName}
                  errorText=""
                  isError={false}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                  }}
                >
                  <Button
                    sx={{
                      height: '50px',
                    }}
                    variant="contained"
                    disabled={selectedProduct === ''}
                    onClick={handleUpdateProduct}
                  >
                    Update Website
                  </Button>
                  <Button
                    sx={{
                      height: '50px',
                    }}
                    variant="contained"
                    color="error"
                    disabled={selectedProduct === ''}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Tab>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
