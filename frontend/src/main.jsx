import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PracticeProvider } from "./context/PracticeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
       <PracticeProvider>
            <App />
        </PracticeProvider>
    </AuthProvider>
  </BrowserRouter>
);
