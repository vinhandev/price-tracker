import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseType } from '../types/prices';
import { db } from '../services/firebase';

export const updateFirebasePrices = async (
  uid: string,
  props: FirebaseType
) => {
  await setDoc(doc(db, 'Prices', uid), props);
};

export const getFirebasePrices = async (uid: string) => {
  const docSnap = await getDoc(doc(db, 'Prices', uid));
  if (docSnap.exists()) {
    return docSnap.data() as Partial<FirebaseType>;
  } else {
    return {};
  }
};
