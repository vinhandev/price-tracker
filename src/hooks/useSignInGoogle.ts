import { signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export function useSignInGoogle() {
  const mutation = async () => {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { user, token };
  };
  return { mutation };
}
