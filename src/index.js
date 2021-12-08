import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { RestaurantsProvider } from 'contexts/RestaurantsContext';
import { ToastContainer } from 'react-toastify';

// * ---- Styles for some Packages------ * //
import 'react-toastify/dist/ReactToastify.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { MenusProvider } from 'contexts/MenusContext';
// -------------------------------- //

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <RestaurantsProvider>
        <MenusProvider>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MenusProvider>
      </RestaurantsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
