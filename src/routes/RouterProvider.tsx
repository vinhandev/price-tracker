import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useUser } from '../store/useUser';

import { Main, Login, SignUp } from '@/screens/Authentication';

import {
  Homepage,
  AddWebsite,
  UpdateWebsite,
  SettingScreen,
  Profile,
} from '@/screens/Main';
import { Init, NotFound } from '@/screens/Helper';
import Tester from '@/screens/Helper/Tester';
import { Box } from '@mui/material';
import { useStore } from '@/store';
import UpdateProduct from '@/screens/Main/UpdateProduct';
import ProductsScreen from '@/screens/Main/Products';
import ShopsScreen from '@/screens/Main/Shops';
import ShopScreen from '@/screens/Main/Shop';
import { auth } from '@/services';
import { useColors } from '@/hooks';

export const routes = {
  HOME: '/home',
  PRODUCTS: '/products',
  PRODUCT: '/products/:productId',
  SHOPS: '/shops',
  SHOP: '/products/:productId/shop/:shopId',
  ADD_WEBSITE: '/products/:productId/add',
  UPDATE_WEBSITE: '/products/:productId/shop/:shopId/update',
  UPDATE_PRODUCT: '/products/:productId/update',
  SETTING: '/setting',
  PROFILE: '/profile',
  TESTER: '/tester',
};

export type RouteNeedParams = keyof typeof routes;

export default function RouterProvider() {
  const colors = useColors();
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const setIsInit = useStore((state) => state.setIsInit);

  useEffect(() => {
    onAuthStateChanged(auth, async (paramUser) => {
      if (paramUser) {
        setUser(paramUser);
        const token = await paramUser.getIdToken();
        localStorage.setItem('token', token);
      } else {
        // User is signed out
        // ...
      }
      setIsInit(false);
    });
  });

  return (
    <Box
      sx={{
        background: colors.background2,
      }}
    >
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Main />}>
                <Route path="/" element={<NotFound />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/products/*" element={<ProductsScreen />} />
                <Route
                  path="/products/:productId/add"
                  element={<AddWebsite />}
                />
                <Route
                  path="/products/:productId/update"
                  element={<UpdateProduct />}
                />
                <Route path="/products/:productId/*" element={<ShopsScreen />} />
                <Route
                  path="/products/:productId/shop/:shopId/*"
                  element={<ShopScreen />}
                />
                <Route
                  path="/products/:productId/shop/:shopId/update"
                  element={<UpdateWebsite />}
                />
                <Route path="/setting" element={<SettingScreen />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/sign_up" element={<SignUp />} />
             
            </>
          )}
          <Route path="/test" element={<Tester />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Init />
    </Box>
  );
}
