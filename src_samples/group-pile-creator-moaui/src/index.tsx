import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.Fragment>
		{/** DEFINE SNACKBAR REGION */}
		<SnackbarProvider maxSnack={3}>
			<App />
			{/** FOR PYTHON SCRIPTING (PYTHON CODE LINKING) */}
			{React.createElement('py-script', { src: './Python/Code.py' })}
		</SnackbarProvider>
	</React.Fragment>
);
