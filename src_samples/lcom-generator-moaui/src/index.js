import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';

const defaultTheme = createTheme({
	typography: {
		fontFamily: "Pretendard",
		fontSize: 12,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider anchorOrigin={{horizontal: "center", vertical: "top"}}>
	<ThemeProvider theme={defaultTheme}>
		<App />
	</ThemeProvider>
  </SnackbarProvider>
);
