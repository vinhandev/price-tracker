import { Link } from 'react-router-dom';
import { useStore } from '../../../../store/useStore';
import { updateFirebasePrices } from '../../../../utils/firebase';
import { showError } from '../../../../utils/helper';
import { useUser } from '../../../../store/useUser';

export default function HorizonShopSelector() {
  const user = useUser((state) => state.user);
  const prices = useStore((state) => state.prices);
  const product = useStore((state) => state.selectedProduct);
  const labels = useStore((state) => state.labels);
  const setSelectedShop = useStore((state) => state.setSelectedShop);
  const selectedShop = useStore((state) => state.selectedShop);
  const setLoading = useStore((state) => state.setLoading);

  const shopList = prices
    .find((item) => item.label === product)
    ?.data.map((item) => item.name);
  return (
    <div
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
        }}
      >
        Shops
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
        {shopList?.map((item) => (
          <div
            key={item}
            style={{
              color: selectedShop === item ? 'white' : 'black',
              cursor: 'pointer',
              padding: 10,
              borderRadius: 10,
              background: selectedShop === item ? '#7EB9FF' : '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              transition: 'width 0.2s ease-in-out',
            }}
            onClick={() => setSelectedShop(item)}
          >
            {item}
            {selectedShop === item && (
              <Link
                to="/update"
                style={{
                  color: 'black',
                  borderRadius: 5,
                  marginLeft: 10,
                  textDecoration: 'underline',
                }}
              >
                Edit Link
              </Link>
            )}
            {selectedShop === item && (
              <div
                onClick={handleOpenLink}
                style={{
                  color: 'black',
                  borderRadius: 5,
                  marginLeft: 10,
                  textDecoration: 'underline',
                }}
              >
                Open Link
              </div>
            )}
            {selectedShop === item && (
              <div
                onClick={handleChangeShopName}
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
            {selectedShop === item && (
              <div
                onClick={handleDelete}
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