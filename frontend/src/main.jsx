import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Provider } from 'react-redux';
import Store from './Redux/Store/Store.jsx';

import './index.css'

// persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(Store)

import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    
  </React.StrictMode>,
)
