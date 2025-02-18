import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./features/App";
// import Color from "./features/Color";
// import Fapp from "./features/Fapp";
// import Grid from "./features/Grid";
// import TwoDim from "./features/TwoDim";
import OneDimension from "./pages/OneDimension";
import TwoDimension from "./pages/TwoDimension";
import ThreeDimension from "./pages/ThreeDimension";
// import FeatureSelection from "./features/FeatureSelection";
import Header from "./components/Header";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

function RouterApp() {
  const publicRoutes = [
    { path: "/", component: Home, name: "Home" },
    { path: "/one-dimension", component: OneDimension, name: "One Dimension" },
    { path: "/two-dimension", component: TwoDimension, name: "Two Dimension " },
    {
      path: "/three-dimension",
      component: ThreeDimension,
      name: "Three Dimension ",
    },
    // {
    //   path: "/feature-selection",
    //   component: FeatureSelection,
    //   name: "Feature Selection",
    // },
    // { path: "/twod", component: TwoDim, name: "Two Dim" },
    // { path: "/1-n", component: App, name: "1-Inp" },
    // { path: "/3-n", component: Fapp, name: "3-Inp" },
    // { path: "/color", component: Color, name: "Color" },
    // { path: "/grid", component: Grid, name: "Grid" },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Header params={publicRoutes} />
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout>{React.createElement(route.component)}</Layout>}
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default RouterApp;
