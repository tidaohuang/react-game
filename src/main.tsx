import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/style.css';
import './styles/style-lottie.css';
import './styles/style-navbar.css';
import './styles/style-5seconds.css';
import './styles/style-homepage.css';
import './styles/style-modal.css';
import './styles/style-slideshow.css';
import './styles/style-bomb.css';
import './styles/style-heart-connection.css';


import { StoreContext, store } from './stores/store.ts';
import App from './App.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Route.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
