import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './css/index.css';
import App from './App';
import store from './utils/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);
