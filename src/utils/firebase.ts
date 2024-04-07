import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseType, GroupPriceProps } from '../types/prices';
import { FeedbackProps } from '@/types/rating';
import { db } from '@/services';
import { useStore } from '@/store';

export const updateFirebasePrices = async (
  uid: string,
  props: {
    prices: GroupPriceProps[];
    labels: number[];
    lastUpdate: number;
  }
) => {
  const params: FirebaseType = {
    prices: props.prices,
    labels: props.labels,
    lastUpdate: props.lastUpdate,
    metadata: {
      isShowBreadcrumb: useStore.getState().isShowBreadcrumb,
      isUseBiggerPagination: useStore.getState().isUsePagePagination,
      isUseDrawer: useStore.getState().isUseDrawer,
      isDarkMode: useStore.getState().isDarkMode,
      opacity: useStore.getState().opacity,
      themeIndex: useStore.getState().themeIndex,
    },
  };
  await setDoc(doc(db, 'Prices', uid), params);
};

export const updateMetadata = async (
  uid: string,
  metadata: {
    isShowBreadcrumb: boolean;
    isUseBiggerPagination: boolean;
    isUseDrawer: boolean;
    isDarkMode: boolean;
    opacity: number;
    themeIndex: number;
  }
) => {
  const params: FirebaseType = {
    prices: useStore.getState().prices,
    labels: useStore.getState().labels,
    lastUpdate: new Date().getTime(),
    metadata,
  };
  await setDoc(doc(db, 'Prices', uid), params);
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
    return (
      (docSnap.data().feedbacks?.[
        docSnap.data().feedbacks.length - 1
      ] as FeedbackProps) ?? null
    );
  } else {
    return null;
  }
};
