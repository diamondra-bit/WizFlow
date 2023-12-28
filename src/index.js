import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './components/store/authContext';
import { NotifProvider } from './components/store/NotifContext';
import { UserProvider } from './components/store/UserContext';
import { IconeProvider } from './components/store/IconeContext';
//import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<AuthContextProvider>
  <NotifProvider>
    <UserProvider>
      <IconeProvider>
         <App />
      </IconeProvider>
    </UserProvider>
  </NotifProvider>
</AuthContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
