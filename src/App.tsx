import RouterProvider from './routes/RouterProvider';
import FontProvider from './HOCs/FontProvider';
export default function App() {
  return (
    <FontProvider>
      <RouterProvider />
    </FontProvider>
  );
}
