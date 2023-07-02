import Layout from '../components/Layout';
import { navigate } from '../utils/helper';

export default function Introduction() {
  return (
    <Layout>
      <div
        style={{
          flex: 1,
          margin: 'auto',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          fontFamily: 'Roboto',
        }}
      >
        <h1>Price Checker</h1>
        <button className="btn" onClick={() => navigate('/home')}>
          View price
        </button>
      </div>
    </Layout>
  );
}
