import { useColors } from '@/hooks';
import { Card, Typography } from '@mui/material';
import { SkeletonWrapper } from '.';

type Props = {
  title?: string;
  children: React.ReactNode;
  noPadding?: boolean;
};
export default function Tab({ title, children, noPadding = false }: Props) {
  const colors = useColors();
  return (
    <SkeletonWrapper>
      <Card
        elevation={0}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: colors.background,
          borderRadius: 3,
          padding: noPadding ? 0 : '20px',
          transition: 'background 1s ease',

          width: '100%',
          height: '100%',
        }}
      >
        {title ? (
          <Typography
            sx={{
              paddingTop: noPadding ? '20px' : 0,
              paddingX: noPadding ? '20px' : 0,
              fontFamily: 'Roboto',
              fontWeight: '700',
              color: colors.text,
            }}
          >
            {title}
          </Typography>
        ) : null}
        {children}
      </Card>
    </SkeletonWrapper>
  );
}
