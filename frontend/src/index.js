
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Instead of rendering App, check if a user has confirmed their age... Allow them on or redirect to google.com
// import AgeConfirmation from './components/AgeConfirmation/AgeConfirmation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AgeConfirmation /> */}
    <App />
  </React.StrictMode>
);


