import {
  createBrowserRouter,
  RouterProvider as RNRouterProvider,
} from 'react-router-dom';
import AddWebsite from '../screens/AddWebsite';
import Introduction from '../screens/Introduction';
import Homepage from '../screens/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Introduction />,
  },
  {
    path: '/home',
    element: <Homepage />,
  },
  {
    path: '/add',
    element: <AddWebsite />,
  },
]);

export default function RouterProvider() {
  return <RNRouterProvider router={router} />;
}
