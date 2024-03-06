import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseType } from '../types/prices';
import { db } from '../services/firebase';

export const updateFirebasePrices = async (props: FirebaseType) => {
  await setDoc(doc(db, 'Prices', 'vinhan'), props);
};

export const getFirebasePrices = async () => {
  const docSnap = await getDoc(doc(db, 'Prices', 'vinhan'));
  if (docSnap.exists()) {
    return docSnap.data() as Partial<FirebaseType>;
  }else{
    return {}
  }
};
