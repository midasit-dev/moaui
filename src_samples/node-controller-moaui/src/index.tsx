/**
 *
 *  ██╗      ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
 * ███║      ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
 * ╚██║█████╗██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝
 *  ██║╚════╝██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗
 *  ██║      ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
 *  ╚═╝      ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
 *
 * @description Entry point for the application
 * @next ./src/Wrapper.tsx
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Wrapper from "./Wrapper";
import "./overrideMidasController";
import "./i18n";
import "./output.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function RouteWrapper() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path={"/*"} element={<Wrapper />} />
    </Routes>
  );
}

root.render(
  <BrowserRouter>
    <RouteWrapper />
  </BrowserRouter>
);
