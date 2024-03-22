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
import { NotFound } from '@/screens/Helper';
import Tester from '@/screens/Helper/Tester';

export default function RouterProvider() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    onAuthStateChanged(auth, (paramUser) => {
      if (paramUser) {
        setUser(paramUser);
      } else {
        // User is signed out
        // ...
      }
    });
  });

  return (
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Main />}>
                <Route path="/" element={<NotFound />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/add" element={<AddWebsite />} />
                <Route path="/update" element={<UpdateWebsite />} />
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
  );
}
