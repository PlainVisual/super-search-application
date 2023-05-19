import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext.jsx";
import DataContextProvider from "./Context/DataContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
        <AuthContextProvider>
              <DataContextProvider>
                   <App />
              </DataContextProvider>
        </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
