import { z, ZodType } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export type LoginFormData = {
  username: string;
  password: string;
  confirm: string;
};

export const LoginSchema: ZodType<LoginFormData> = z
  .object({
    username: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export function useSignIn() {
  const mutation = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  return { mutation, schema: LoginSchema };
}
