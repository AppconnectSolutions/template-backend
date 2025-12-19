import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/theme.min.css";


import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from "./components/users/hooks/useCart.jsx";




ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)
