import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { RestaurantsProvider } from 'contexts/RestaurantsContext';

// * ---- Styles for some Packages------ * //
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// -------------------------------- //

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <RestaurantsProvider>
        <App />
      </RestaurantsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
