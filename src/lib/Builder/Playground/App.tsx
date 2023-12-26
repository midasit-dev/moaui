import EditableCode from '../../Components/Button/stories/index.source.tsx?raw';

import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PlaygroundPage from './PlaygroundPage';

function App() {
	const location = useLocation();

  return (
		<Routes location={location}>
			<Route path="/" element={<PlaygroundPage/>} />
		</Routes>
  );
}


function AppWrapper(){
	return (
		<RecoilRoot>
			{/* <BrowserRouter basename='/iframe.html?viewMode=docs&id=builder-playground--overview'> */}
				<PlaygroundPage />
			{/* </BrowserRouter> */}
		</RecoilRoot>
	)
}

export default AppWrapper;
