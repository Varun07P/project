import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthState from './components/context/AuthState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthState>
   <App />
   </AuthState>
  </StrictMode>
);