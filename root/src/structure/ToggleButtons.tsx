import React from 'react';
import { ReactComponent as MoonIcon } from "@/svg/moon_24.svg";
import { ReactComponent as SunIcon } from "@/svg/sun_24.svg";

function ToggleButtons() {
	const [ darkMode, setDarkMode ] = React.useState(false);

	React.useEffect(() => {
		if (darkMode) {
			document.documentElement.setAttribute('class', 'dark');
		} else {
			document.documentElement.removeAttribute('class');
		}
	}, [darkMode]);

	return (
		<div className='flex justify-center mt-4'>
			<div 
				className={`
					flex w-8 h-8 p-2 rounded-full justify-center items-center 
					border border-moa-gray-100 dark:border-moa-mono-300 
					transition duration-500 hover:cursor-pointer hover:border-moa-blue-100 dark:hover:border-moa-blue-300
				`}
				onClick={() => setDarkMode(!darkMode)}
			>
				{!darkMode && <MoonIcon />}
				{darkMode && <SunIcon />}
			</div>
		</div>
	);
}

export default ToggleButtons;