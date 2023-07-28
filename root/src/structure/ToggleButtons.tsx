import React from 'react';

const MoonIcon = () => {
	return (
		<svg viewBox="0 0 20 20" className="w-5 h-5 fill-moa-light-base hover:fill-moa-light-base-hover transition duration-moa-base">
			<path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
		</svg>
	);
}

const SunIcon = () => {
	return (
		<svg viewBox="0 0 20 20" className="w-5 h-5 fill-moa-dark-base hover:fill-moa-dark-base-hover transition duration-moa-base">
			<path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
		</svg>
	);
}

function ToggleButtons(): JSX.Element {
	const [ darkMode, setDarkMode ] = React.useState(false);

	React.useEffect(() => {
		if (darkMode) {
			document.documentElement.setAttribute('class', 'dark');
		} else {
			document.documentElement.removeAttribute('class');
		}
	}, [darkMode]);

	return (
		<div className='flex justify-center'>
			<div 
				className="flex w-8 h-8 p-2 rounded-full justify-center items-center cursor-pointer"
				onClick={() => setDarkMode(!darkMode)}
			>
				{!darkMode && <MoonIcon />}
				{darkMode && <SunIcon />}
			</div>
		</div>
	);
}

export default ToggleButtons;