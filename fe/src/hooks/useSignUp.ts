import { auth } from '@/services';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function useSignUp() {
  const mutation = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  return { mutation };
}
