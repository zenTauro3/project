import React from 'react'
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux/es/exports';
import store from './redux/store.ts';

import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
