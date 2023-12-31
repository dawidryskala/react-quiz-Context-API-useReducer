import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QueastionsProvider } from "./contexts/QueastionsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueastionsProvider>
      <App />
    </QueastionsProvider>
  </React.StrictMode>
);
