import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './userContext';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </UserContextProvider>
);
