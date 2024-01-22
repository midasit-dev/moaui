import React from 'react';
import ReactDOM from 'react-dom/client';
import Wrapper from './Wrapper';
import { SnackbarProvider } from "notistack";
import './overrideMidasController';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.Fragment>
		{/** DEFINE SNACKBAR REGION */}
		<SnackbarProvider maxSnack={3}>
			<Wrapper />
		</SnackbarProvider>
	</React.Fragment>
);
