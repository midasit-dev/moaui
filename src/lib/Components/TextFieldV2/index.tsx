import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { Typography, Grid } from "../..";
import * as mui from "@mui/material";

type StyledPropsExtension = {
	/**
	 * The title of the textfield.
	 * @defaultValue undefined
	 * @optional
	 * @type string
	 */
	title?: string;

	/**
	 * The position of the title.
	 * @defaultValue "left"
	 * @optional
	 * @type string
	 */
	titlePosition?: "left" | "right" | "top" | "bottom";
	
	/**
	 * Set title as Single Line.
	 * @defaultValue false
	 * @optional
	 */
	singleLineTitle?: boolean,
};

TextFieldV2.defaultProps = {
	autoFocus: false,
	type: "text",
	title : "",
	titlePosition : "left",
	error : false,
	disabled : false,
	spacing: 1,
	inputAlign: "left",
	singleLineTitle: false,
} as StyledProps;

/**
 * moaui Styled TextField
 * 
 * @param {MoaTextFieldProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange
 * @returns {React.ReactElement} moaTextField
 */

function TextFieldV2(props: StyledProps & StyledPropsExtension) : React.ReactElement {
	const {title, titlePosition, singleLineTitle, width, ...rest} = props;

	const flexResolver = React.useCallback((titlePosition: string | undefined) => {
		console.log(titlePosition);
		switch (titlePosition) {
			case "left": return "row";
			case "right": return "row-reverse";
			case "top": return "column";
			case "bottom": return "column-reverse";
			default: return "row";
		}
	}, []);

	return (
		<React.Fragment>
			{title && 
				<Grid
					width={`${width}`}
					flexDirection={flexResolver(titlePosition)}
					container
				>
					<React.Fragment>
						<Grid item xs={["bottom", "top"].includes(titlePosition || "") ? 12 : 6} display="flex" alignItems="center" justifyContent={titlePosition === "right" ? "end" : "start"}>
							<Typography singleLine={singleLineTitle}>{`${title}`}</Typography>
						</Grid>
						<Grid item xs={["bottom", "top"].includes(titlePosition || "") ? 12 : 6}>
							<StyledComponent {...rest}/>
						</Grid>
					</React.Fragment>
				</Grid>
			}
			{!title &&
				<StyledComponent width={width} {...rest}/>
			}
		</React.Fragment>
	)
}

export default TextFieldV2;