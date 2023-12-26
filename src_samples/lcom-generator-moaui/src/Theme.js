import { createTheme } from "@mui/material";

const midasTheme = createTheme({
	palette: {
		primary: {
			main: "#1E88E5",
		},
	},
	components: { // https://mui.com/customization/default-theme/
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: "Roboto, sans-serif",
					fontSize: "0.5rem",
					lineHeight: "1.5rem",
					letterSpacing: "0.00938em",
					fontWeight: 400,
				},
			}
		},
		

	}
});

export default midasTheme;