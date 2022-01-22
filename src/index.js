import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './providers/UserProvider';

global.process = require('process/browser');

// eslint-disable-next-line no-undef
const { worker } = require('./mocks/browser');
worker.start();
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
