import Layout from '../components/Layout';
import { navigate } from '../utils/helper';

export default function Introduction() {
  return (
    <Layout>
      <div
        style={{
          background:
            'url(https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2) no-repeat center center fixed',
        }}
      >
        <div
          style={{
            flex: 1,
            margin: 'auto',
            backgroundColor: '#35374BDD',
            backdropFilter: 'blur(5px)',
            width: '100vw',
            height: '100vh',
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
      </div>
    </Layout>
  );
}
