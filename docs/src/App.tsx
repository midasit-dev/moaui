import React from 'react';
import "@/tailwindcss-output.css";

import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Docs from "./structure/Docs";

function App() {
	const location = useLocation();

  return (
		<Routes location={location}>
			<Route path="/" element={<Docs/>} />
			<Route path="/Installation" element={<Docs/>} />
		</Routes>
  );
}

function AppWrapper(){
	return (
		<RecoilRoot>
			<BrowserRouter basename='moaui'>
				<App />
			</BrowserRouter>
		</RecoilRoot>
	)
}

export default AppWrapper;
