import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./useAuth";
import './index.css';


ReactDOM.render(
  <div className="Wrapper">
  <React.StrictMode>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>

  </React.StrictMode>
  </div>,
  document.getElementById('root')

);
