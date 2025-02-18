import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ThemeProvider } from "./context/ThemeContext";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
