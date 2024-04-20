import { useColors } from '@/hooks';
import { Card, SxProps, Theme, Typography } from '@mui/material';
import { SkeletonWrapper } from '.';

type Props = {
  title?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  style?: SxProps<Theme> | undefined;
};
export default function Tab({
  title,
  children,
  noPadding = false,
  style,
}: Props) {
  const colors = useColors();
  return (
    <SkeletonWrapper>
      <Card
        elevation={0}
        sx={{
          flexDirection: 'column',
          background: colors.background,
          borderRadius: 3,
          padding: noPadding ? 0 : '20px',
          transition: 'background 1s ease',
          display: 'flex',
          ...style,
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
