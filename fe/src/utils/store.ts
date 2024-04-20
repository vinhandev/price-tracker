import { useStore } from '@/store';

export const showSuccess = (message?: string) => {
  useStore.getState().setSuccessMessage(message ?? 'Success !');
  useStore.getState().setSuccess(true);
};
