import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from 'react-cookie';
import App from "./App";
import {UserContextProvider} from "./components/userContext";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
