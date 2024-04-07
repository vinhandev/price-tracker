import { useStore } from '@/store';
import { Skeleton } from '@mui/material';

export default function SkeletonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useStore((state) => state.isLoading);

  return isLoading ? <Skeleton animation='wave' variant='rounded' width={'100%'} height={'100%'} /> : children;
}
