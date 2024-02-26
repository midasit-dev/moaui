import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";
import Font from "../Font";

declare module '@mui/material/styles' {
	interface Theme {
		typography: {
			body3: {};
		};
	}

	interface TypographyOptions {
		body3?: TypographyStyleOptions;
	}

	interface TypographyVariants {
		body3: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		body3?: React.CSSProperties;
	}

	// allow configuration using `createTheme`
}

export const moaFont = createTheme({
	typography: {
		fontFamily: Font.fontFamily,
		h1: {
			fontWeight: 700, /** bold */
			fontSize: "0.75rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		},
		body1: {
			fontWeight: 400, /** normal */
			fontSize: "0.75rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		},
		body2: {
			fontWeight: 500, /** semi-bold */
			fontSize: "0.75rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		},
		body3: {
			fontWeight: 400, /** normal */
			fontSize: "0.688rem", /** 11px */
			lineHeight: "0.875rem", /** 14px */
		},
	},
});

type ThemedComponentProps = {
	children?: React.ReactNode;
}

const ThemedComponent = (props: ThemedComponentProps) => (
	<ThemeProvider theme={moaFont}>
		{props.children}
	</ThemeProvider>
)

export default ThemedComponent;