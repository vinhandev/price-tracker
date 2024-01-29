import Image from 'next/image';
import styles from './page.module.css';
import { useEffect } from 'react';
import PriceComponent from './components/PriceComponent';

async function getData() {
  const res = await fetch(
    'https://www.thegioididong.com/dtdd/iphone-13?code=0131491002653'
  );

  if (!res.ok) {
    console.error('Error fetching data:', res.status);
  }
  console.log('hell', res);
  return res.body;
}
export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <PriceComponent />
    </main>
  );
}
