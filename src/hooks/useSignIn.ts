import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export function useSignIn() {

 const mutation = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  return { mutation };
}
