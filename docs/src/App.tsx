import React from 'react';
import "@/tailwindcss-output.css";
import Header from "@/structure/Header";
import ToggleButtons from '@/structure/ToggleButtons';
import Body from '@/structure/Body';

function App() {
  return (
    <div>
			<div>
				<Header />
			</div>
			<div className='mt-4'>
				<ToggleButtons />
			</div>
			<div className='mt-4'>
				<Body />
			</div>
    </div>
  );
}

export default App;
