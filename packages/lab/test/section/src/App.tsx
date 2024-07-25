import React from 'react';
import logo from './logo.svg';
import './App.css';

import Selector from './components/selector';
import SolidRectangleTester from './components/solid-rectangle';
import HSectionTester from './components/h-section';

function App() {
	const [selectIdx, setSelectIdx] = React.useState(1);

  return (
    <div style={containerStyle}>
			<div style={selectorStyle}>
				<Selector {...{selectIdx, setSelectIdx}} />
			</div>
			{selectIdx === 1 && <SolidRectangleTester />}
			{selectIdx === 2 && <HSectionTester />}
    </div>
  );
}

export default App;

const containerStyle = { display: 'flex', alignItems: 'center', height: '100vh', paddingLeft: 100, } as React.CSSProperties;
const selectorStyle = { position: 'fixed', top: 20, left: 20, } as React.CSSProperties;

