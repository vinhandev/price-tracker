import { useStore } from '../../../../store/useStore';
import { useUser } from '../../../../store/useUser';
import { updateFirebasePrices } from '../../../../utils/firebase';
import { showError } from '../../../../utils/helper';

export default function HorizonSelector() {
  const user = useUser((state) => state.user);

  const prices = useStore((state) => state.prices);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const setSelectedShop = useStore((state) => state.setSelectedShop);
  const product = useStore((state) => state.selectedProduct);
  const setLoading = useStore((state) => state.setLoading);
  const labels = useStore((state) => state.labels);

  const handleChangeProductName = async () => {
    const text = prompt('Change product name', product);
    setLoading(true);
    try {
      if (text && user) {
        const tmpPrices = prices.map((item) => {
          if (item.label === product) {
            return {
              ...item,
              label: text,
            };
          }
          return item;
        });
        await updateFirebasePrices(user?.uid, {
          prices: tmpPrices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        window.location.reload();
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };
  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      if (user) {
        const tmpPrices = prices.filter((item) => {
          return item.label !== product;
        });
        await updateFirebasePrices(user?.uid, {
          prices: tmpPrices,
          labels,
          lastUpdate: new Date().getTime(),
        });
        window.location.reload();
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
        }}
      >
        Products
      </div>

      <div
        style={{
          paddingTop: 5,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        {prices?.map((item) => (
          <div
            key={item.label}
            style={{
              color: product === item.label ? 'white' : 'black',
              cursor: 'pointer',
              padding: 10,
              borderRadius: 10,
              background: product === item.label ? '#7EB9FF' : '#F5F5F5',
              display: 'flex',
              justifyContent: 'space-between',
              transition: 'width 0.2s ease-in-out',
            }}
            onClick={() => {
              setSelectedProduct(item.label);
              setSelectedShop(item.data[0].name);
            }}
          >
            {item.label}
            {product === item.label && (
              <div
                onClick={handleChangeProductName}
                style={{
                  color: 'black',
                  borderRadius: 5,
                  marginLeft: 10,
                  textDecoration: 'underline',
                }}
              >
                Edit name
              </div>
            )}
            {product === item.label && (
              <div
                onClick={handleDeleteProduct}
                style={{
                  color: 'black',
                  borderRadius: 5,
                  marginLeft: 10,
                  textDecoration: 'underline',
                }}
              >
                Delete
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
