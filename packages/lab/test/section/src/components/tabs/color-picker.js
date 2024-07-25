import { MuiColorInput } from "mui-color-input";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
	Stack,
} from "@mui/material";
import { useState, useEffect } from "react";

const theme = createTheme();

export default function ColorPicker(props) {
	const { title, defaultValue, onChange } = props;
	const [color, setColor] = useState(defaultValue);
	useEffect(() => onChange(color), [color]);

  return (
    <ThemeProvider theme={theme}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<Typography variant="body2" minWidth={150}>{title}</Typography>
				<MuiColorInput value={color} onChange={(color) => setColor(color)} />
			</Stack>
    </ThemeProvider>
  );
}
