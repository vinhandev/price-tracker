import { useStore } from '../../../../store/useStore';
import { Box, SwipeableDrawer } from '@mui/material';
import { useColors } from '@/hooks';
import MenuSidebar from '../MenuSidebar/MenuSidebar';

type Props = {
  onReload: () => void;
  navBarList: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }[][];
};
export default function Sidebar({ navBarList, onReload }: Props) {
  const colors = useColors();
  const openSidebar = useStore((state) => state.openSidebar);
  const setOpenSidebar = useStore((state) => state.setOpenSidebar);
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%',
        background: colors.background2,
        transition: 'background 1s ease',
      }}
    >
      <MenuSidebar navBarList={navBarList} onReload={onReload} />
      <SwipeableDrawer
        variant="temporary"
        open={openSidebar}
        anchor="left"
        onOpen={() => setOpenSidebar()}
        onClose={() => setOpenSidebar()}
        PaperProps={{
          sx: { width: '50%', padding: '20px' },
        }}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <MenuSidebar navBarList={navBarList} onReload={onReload} />
      </SwipeableDrawer>
    </Box>
  );
}
