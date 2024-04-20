import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useColors } from '@/hooks';
import { useStore } from '@/store';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPath } from '@/utils';
export default function SearchBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const colors = useColors();
  const prices = useStore((state) => state.prices);
  const setProduct = useStore((state) => state.setSelectedProduct);
  const setShop = useStore((state) => state.setSelectedShop);
  const options: { title: string; onClick: () => void }[] = useMemo(() => {
    const tempOptions: { title: string; onClick: () => void }[] = [];
    if (prices) {
      prices.map((item) => {
        tempOptions.push({
          title: item.label,
          onClick: () => {
            setProduct(item.label);
            setShop(item.data[0].name);
            if (pathname !== '/home') {
              const path = getPath({
                path: 'HOME',
              });
              navigate(path);
            }
          },
        });
        item.data.map((subItem) => {
          tempOptions.push({
            title: subItem.name,
            onClick: () => {
              setProduct(item.label);
              setShop(subItem.name);
              if (pathname !== '/home') {
                navigate(getPath({ path: 'HOME' }));
              }
            },
          });
        });
        return null;
      });
    }
    return tempOptions;
  }, [prices]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '50%',
        color: colors.text,
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          top: 0,
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
        }}
      >
        <SearchIcon />
      </Box>
      <Autocomplete
        sx={{
          flex: 1,
          svg: {
            display: 'none',
          },
        }}
        getOptionLabel={(option) => option.title}
        options={options}
        renderOption={(props, option) => (
          <Box onClick={option.onClick}>
            <Typography
              sx={{ fontFamily: 'Roboto', fontWeight: '300' }}
              component="li"
              {...props}
            >
              {option.title}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            placeholder="Search Product"
            sx={{
              flex: 1,
              borderWidth: 2,
              borderColor: colors.text,
              color: colors.text,
              input: {
                color: colors.text,
                '::placeholder': {
                  color: colors.text3,
                },
              },
              '.MuiInputBase-root': {
                borderColor: colors.text,
              },
              '.MuiOutlinedInput-root': {
                width: '100%',
                background: colors.transparent,
                borderRadius: '20px',
                '& fieldset': {
                  borderColor: colors.text,
                },
                '&:hover fieldset': {
                  borderColor: colors.text3,
                },
              },
              '.Mui-focused': {
                transition: 'all 1s ease',
                background: colors.background,
              },
            }}
            {...params}
          />
        )}
      />
    </Box>
  );
}
