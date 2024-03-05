import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { formatMoney } from '../../utils/helper';

type RecordType = {
  label: string;
  price: number;
  date: number;
};

export default function Records() {
  const prices = useStore((state) => state.prices);
  const selectedProduct = useStore((state) => state.selectedProduct);

  const priceList = useMemo(() => {
    const tmpList: RecordType[] = [];
    prices
      ?.filter((item) => item.label === selectedProduct)
      .map((item) => {
        item.data.map((subItem) => {
          subItem?.data?.map((subSubItem) => {
            if (subSubItem.price !== -1) {
              tmpList.push({
                label: subItem.name,
                date: subSubItem.date,
                price: subSubItem.price,
              });
            }
          });
        });
      });
    return tmpList.sort((a, b) => b.date - a.date);
  }, [prices, selectedProduct]);
  return (
    <div>
      <table className='table' style={{ flex: 1 }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Shop</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((item, index) => (
            <tr>
              <th scope="row">{index}</th>
              <td>
                {new Date(item.date).toLocaleDateString('vi', {
                  day: 'numeric',
                  month: 'numeric',
                  year: '2-digit',
                })}
              </td>
              <td>{item.label}</td>
              <td>{formatMoney(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
