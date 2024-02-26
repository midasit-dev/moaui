import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import './overrideMidasController';
import { IconButton, Icon } from '@midasit-dev/moaui';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider 
			maxSnack={6}
			action={(key) => (
				<IconButton transparent transparentColor="white" onClick={() => closeSnackbar(key)}>
					<Icon iconName="Close" />
				</IconButton>
			)}
		>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
