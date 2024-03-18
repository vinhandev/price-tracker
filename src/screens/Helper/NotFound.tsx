import { useUser } from '@/store';
import { Navigate } from 'react-router-dom';

export default function NotFound() {
  const user = useUser((state) => state.user);

  return <Navigate to={user ? '/home' : '/login'} replace={true} />;
}
