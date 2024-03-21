import RouterProvider from './routes/RouterProvider';
import FontProvider from './HOCs/FontProvider';
import './App.css'
export default function App() {
  return (
    <FontProvider>
      <RouterProvider />
    </FontProvider>
  );
}
