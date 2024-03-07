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
  const isDarkMode = useStore((state) => state.isDarkMode);
  const selectedProduct = useStore((state) => state.selectedProduct);

  const priceList = useMemo(() => {
    const tmpList: RecordType[] = [];
    prices
      ?.filter((item) => item.label === selectedProduct)
      .map((item) => {
        item.data.map((subItem) => {
          console.log(subItem.data);
          
          subItem?.data?.map((subSubItem) => {
            tmpList.push({
              label: subItem.name,
              date: subSubItem.date,
              price: subSubItem.price,
            });
          });
        });
      });
    return tmpList.sort((a, b) => b.date - a.date);
  }, [prices, selectedProduct]);

  console.log(priceList);
  
  return (
    <div>
      <table
        className="table"
        style={{
          flex: 1,
          background: isDarkMode ? '#000' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        <thead
          style={{
            flex: 1,
            background: isDarkMode ? '#000' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          }}
        >
          <tr
            style={{
              flex: 1,
              background: isDarkMode ? '#000' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            <th
              scope="col"
              style={{
                flex: 1,
                background: isDarkMode ? '#000' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              #
            </th>
            <th
              scope="col"
              style={{
                flex: 1,
                background: isDarkMode ? '#000' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              Date
            </th>
            <th
              scope="col"
              style={{
                flex: 1,
                background: isDarkMode ? '#000' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              Shop
            </th>
            <th
              scope="col"
              style={{
                flex: 1,
                background: isDarkMode ? '#000' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((item, index) => (
            <tr key={index}>
              <th
                scope="row"
                style={{
                  flex: 1,
                  background: isDarkMode ? '#000' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                }}
              >
                {index}
              </th>
              <td
                style={{
                  flex: 1,
                  background: isDarkMode ? '#000' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                }}
              >
                {new Date(item.date).toLocaleDateString('vi', {
                  day: 'numeric',
                  month: 'numeric',
                  year: '2-digit',
                })}
              </td>
              <td
                style={{
                  flex: 1,
                  background: isDarkMode ? '#000' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                }}
              >
                {item.label}
              </td>
              <td
                style={{
                  flex: 1,
                  background: isDarkMode ? '#000' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                }}
              >
                {item.price === -1 ? 'No data' : formatMoney(item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
