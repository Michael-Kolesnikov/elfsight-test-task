import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DataProvider } from './components';
import { PopupProvider } from './components/popup';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </DataProvider>
  </React.StrictMode>
);
