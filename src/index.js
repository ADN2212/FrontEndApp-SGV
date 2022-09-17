import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //StrictMode hace que los componetes se renderizen dos veces. 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);









