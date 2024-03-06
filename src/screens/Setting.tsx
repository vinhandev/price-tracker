import { useStore } from '../store/useStore';
import { updateFirebasePrices } from '../utils/firebase';
import { showError } from '../utils/helper';

export default function SettingScreen() {
  const prices = useStore((state) => state.prices);
  const setLoading = useStore((state) => state.setLoading);

  async function onDeleteAllRecords() {
    setLoading(true);
    try {
      const confirm = window.confirm('Are you sure?');
      if (confirm) {
        const tmpPrices = prices.map((item) => {
          const tmpProduct = item.data.map((subItem) => {
            return {
              ...subItem,
              data: [],
            };
          });
          return {
            ...item,
            data: tmpProduct,
          };
        });

        await updateFirebasePrices({
          prices: tmpPrices,
          labels: [],
          lastUpdate: new Date().getTime(),
        });

        window.location.reload();
      }
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  }

  const onDeleteAllData = async () => {
    setLoading(true);
    try {
      await updateFirebasePrices({
        prices: [],
        labels: [],
        lastUpdate: new Date().getTime(),
      });
    } catch (error) {
      showError(error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        padding: 20,
        width: '100%',
      }}
    >
      <div className="fs-3">Setting</div>
      <div className="d-flex flex-row gap-3">
        <button onClick={onDeleteAllRecords} className="btn btn-danger">
          Delete all record
        </button>
        <button onClick={onDeleteAllData} className="btn btn-danger">
          Delete all data
        </button>
      </div>
    </div>
  );
}
