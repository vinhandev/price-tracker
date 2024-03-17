import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from '../screens/Authentication';

import AddWebsite from '../screens/Main/AddWebsite';
import Homepage from '../screens/Main/Homepage';

import SettingScreen from '../screens/Main/Setting';
import UpdateWebsite from '../screens/Main/UpdateWebsite';
import Authentication from '../screens/Main/Authentication';
import SignUp from '../screens/Authentication/SignUp';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useUser } from '../store/useUser';

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
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/add" element={<AddWebsite />} />
              <Route path="/update" element={<UpdateWebsite />} />
              <Route path="/setting" element={<SettingScreen />} />
              <Route path="/authentication" element={<Authentication />} />
            </Route>
            <Route path="*" element={<Homepage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
