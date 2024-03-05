import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddWebsite from '../screens/AddWebsite';
import Introduction from '../screens/Introduction';
import Homepage from '../screens/Homepage';
import { Sidebar } from '../components';
import Loading from '../components/Loading/Loading';

export default function RouterProvider() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/add" element={<AddWebsite />} />
        </Routes>

        <Loading />
      </BrowserRouter>
    </div>
  );
}
