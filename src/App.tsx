import { FontProvider, ToastProvider } from './HOCs';
import RouterProvider from './routes/RouterProvider';

export default function App() {
  return (
    <FontProvider>
      <ToastProvider>
        <RouterProvider />
      </ToastProvider>
    </FontProvider>
  );
}
