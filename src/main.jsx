import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import UtilitiesProvider from './provider/UtilitiesProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UtilitiesProvider>
      <RouterProvider router={router} />
    </UtilitiesProvider>
  </StrictMode>
);
