import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from '../screens/Authentication';

import AddWebsite from '../screens/Main/AddWebsite';
import Homepage from '../screens/Main/Homepage';

import SettingScreen from '../screens/Main/Setting';
import UpdateWebsite from '../screens/Main/UpdateWebsite';
import Authentication from '../screens/Main/Authentication';

export default function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/add" element={<AddWebsite />} />
          <Route path="/update" element={<UpdateWebsite />} />
          <Route path="/setting" element={<SettingScreen />} />
          <Route path="/authentication" element={<Authentication />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
