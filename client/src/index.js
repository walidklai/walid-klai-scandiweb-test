import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/style.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { EcommerceContextProvider } from "./components/context/EcommerceContext";
import GlobalErrorBoudaries from "./components/errorBoundaries/GlobalErrorBoudaries";

ReactDOM.render(
  <GlobalErrorBoudaries>
    <EcommerceContextProvider>
      <Router>
        <App />
      </Router>
    </EcommerceContextProvider>
  </GlobalErrorBoudaries>,
  document.getElementById("root")
);
