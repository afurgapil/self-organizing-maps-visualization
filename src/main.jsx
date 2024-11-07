import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import RouterApp from "./Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>
);
