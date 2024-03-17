import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export function useSignUp() {
  const mutation = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  return { mutation };
}
