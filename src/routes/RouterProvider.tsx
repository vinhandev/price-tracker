import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useUser } from '../store/useUser';

import { Main, Login, SignUp } from '@/screens/Authentication';

import {
  Homepage,
  AddWebsite,
  UpdateWebsite,
  SettingScreen,
} from '@/screens/Main';
import { Init, NotFound } from '@/screens/Helper';
import Tester from '@/screens/Helper/Tester';
import { Box } from '@mui/material';
import { useStore } from '@/store';
import UpdateProduct from '@/screens/Main/UpdateProduct';
import ProductsScreen from '@/screens/Main/Products';
import ShopsScreen from '@/screens/Main/Shops';
import ShopScreen from '@/screens/Main/Shop';

export default function RouterProvider() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const setIsInit = useStore((state) => state.setIsInit);

  useEffect(() => {
    onAuthStateChanged(auth, (paramUser) => {
      if (paramUser) {
        setUser(paramUser);
      } else {
        // User is signed out
        // ...
      }
      setIsInit(false);
    });
  });

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Main />}>
                <Route path="/" element={<NotFound />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/add" element={<AddWebsite />} />
                <Route path="/update_shop" element={<UpdateWebsite />} />
                <Route path="/update_product" element={<UpdateProduct />} />
                <Route path="/products" element={<ProductsScreen />} />
                <Route path="/shops" element={<ShopsScreen />} />
                <Route path="/shop" element={<ShopScreen />} />
                <Route path="/setting" element={<SettingScreen />} />
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
