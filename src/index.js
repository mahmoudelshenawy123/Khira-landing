import Loading from 'components/Global/Elements/Loading/Loading';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'reduxStore/store';
import App from './App';
import './utils/i18nInit.js'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const root = ReactDOM.createRoot(document.getElementById('root'));
  if(localStorage.getItem('darkmode')){
    document.querySelector('body').classList.add('dark-mode')
  }
root.render(

  <Suspense fallback={<Loading/>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);


