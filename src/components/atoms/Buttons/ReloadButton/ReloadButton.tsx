import { Box } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useColors } from '@/hooks';
import React from 'react';

type Props = {
  onClick: () => void;
};
function ReloadButton({ onClick }: Props) {
  const [isClicked, setIsClicked] = React.useState(false);
  const colors = useColors();
  return (
    <Box
      onMouseDown={() => setIsClicked(true)}
      onMouseLeave={() => setIsClicked(false)}
      onMouseUp={() => setIsClicked(false)}
      onClick={() => {
        setIsClicked(true);
        onClick();
      }}
      className={!isClicked ? 'shadow' : ''}
      sx={{
        padding: '5px',
        borderRadius: '50%',
        aspectRatio: 1,
        cursor: 'pointer',
        transition: 'all 1s ease',
        background: colors.background2,

        boxShadow: isClicked
          ? 'inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4)'
          : 'inset 0px 5px 15px rgba(255, 255, 255, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4)',
      }}
    >
      <ReplayIcon />
    </Box>
  );
}

export default ReloadButton;
