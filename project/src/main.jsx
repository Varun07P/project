import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import AuthState from './components/context/AuthState';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthState>
   <App />
   </AuthState>
  </React.StrictMode>
);