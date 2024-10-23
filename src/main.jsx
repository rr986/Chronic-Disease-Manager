/* eslint-disable no-unused-vars */
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initializeApp } from "firebase/app";
import {BrowserRouter} from 'react-router-dom';
import fbconfig from './firebase/FirebaseConfig.js';

const app = initializeApp(fbconfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
