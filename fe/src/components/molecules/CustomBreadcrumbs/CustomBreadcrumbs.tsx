import { useStore } from '@/store';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function CustomBreadcrumbs() {
  const pathname = useLocation().pathname;
  const paths = pathname.replace('/', '').split('/');
  const selectedProduct = useStore((state) => state.selectedProduct);
  const selectedShop = useStore((state) => state.selectedShop);
  const isShowBreadcrumb = useStore((state) => state.isShowBreadcrumb);

  const getBreadCrumbsPath = (paths: string[], index: number) => {
    let path = '';
    for (let i = 0; i <= index; i++) {
      path += `/${paths[i]}`;
    }
    return path;
  };

  return (
    <Box
      sx={{
        paddingY: '10px',
        display: isShowBreadcrumb ? 'block' : 'none',
        transition: 'all 1s ease',
      }}
    >
      <Breadcrumbs>
        {paths.map((path, index) => {
          const customPath = path
            .replace(':productId', selectedProduct)
            .replace(':shopId', selectedShop);
          const customUrl = `${getBreadCrumbsPath(paths, index)}`;
          console.log(customUrl);
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={customUrl}
              sx={{
                fontSize: '12px',
                fontFamily: 'Roboto',
                fontWeight: '300',
                textTransform: 'capitalize',
              }}
            >
              {customPath}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
