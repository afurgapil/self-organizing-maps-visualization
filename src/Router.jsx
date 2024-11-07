import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./features/App";
// import Color from "./features/Color";
// import Fapp from "./features/Fapp";
// import Grid from "./features/Grid";
// import TwoDim from "./features/TwoDim";
import OneDim from "./pages/OneDimension";
import OneDimConstantRate from "./pages/OneDimensionConstantRate";
import TwoDimUpdate from "./pages/TwoDimensionSquare";
import TwoDimThree from "./pages/TwoDimension";
import TwoDimFourth from "./pages/TwoDimensionConstRate";
// import FeatureSelection from "./features/FeatureSelection";
import Header from "./components/Header";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

function RouterApp() {
  const publicRoutes = [
    { path: "/", component: Home, name: "Home" },
    { path: "/one-dimension", component: OneDim, name: "One Dimension" },
    {
      path: "/one-dimension-constant-learning-rate",
      component: OneDimConstantRate,
      name: "One Dimension Const Rate",
    },
    { path: "/two-dimension", component: TwoDimThree, name: "Two Dimension " },
    {
      path: "/two-dimension-constant-learning-rate",

      component: TwoDimFourth,
      name: "Two Dimension Const Rate",
    },
    {
      path: "/two-dimension-square",
      component: TwoDimUpdate,
      name: "Two Dimension Square",
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
    </BrowserRouter>
  );
}

export default RouterApp;
