import React from 'react';
import ReactDOM from 'react-dom/client';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthModalProvider from './Context/AuthModalProvider'
import UserProvider from './Context/UserProvider';
import ServiceModalProvider from './Context/ServiceModalProvider'
import GlobalModalProvider from './Context/GlobalModalProvider';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GlobalModalProvider>
      <UserProvider>
        <AuthModalProvider>
          <ServiceModalProvider>
            <App />
          </ServiceModalProvider>
        </AuthModalProvider>
      </UserProvider>
  </GlobalModalProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
