import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseType } from '../types/prices';
import { FeedbackProps } from '@/types/rating';
import { db } from '@/services';

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

export const addRating = async (
  uid: string,
  rating: number,
  description: string
) => {
  if (uid) {
    const docRef = doc(db, 'Ratings', uid);
    const docSnap = await getDoc(docRef);
    const feedbacks = docSnap.data()?.feedbacks ?? [];
    await setDoc(docRef, {
      feedbacks: [
        ...feedbacks,
        {
          rating,
          description,
          time: new Date().getTime(),
        },
      ],
    });
  }
};

export const getRating = async (uid: string) => {
  const docSnap = await getDoc(doc(db, 'Ratings', uid));
  if (docSnap.exists()) {
    return (docSnap.data().feedbacks?.[docSnap.data().feedbacks.length - 1] as FeedbackProps) ?? null;
  } else {
    return null;
  }
};
