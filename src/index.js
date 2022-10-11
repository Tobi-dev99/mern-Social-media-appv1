import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./api/context/AuthProvider";
import { LoggedUserProvider } from "./api/context/LoggedUserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <LoggedUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggedUserProvider>
  </AuthProvider>
);
