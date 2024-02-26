import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { Typography, Grid } from "../..";

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

	/**
	 * The gap between title and textfield.
	 */
	gap?: number,

	/**
	 * The scale of width of title. (all 12, title + input (textfield) = 12)
	 */
	titleXs?: number,
	/**
	 * The scale of width of textfield. (all 12, title + input (textfield) = 12)
	 */
	inputXs?: number,
};

TextFieldV2.defaultProps = {
	autoFocus: false,
	type: "text",
	title : "",
	titlePosition : "left",
	error : false,
	disabled : false,
	gap: 1,
	inputAlign: "left",
	singleLineTitle: false,
} as StyledProps & StyledPropsExtension;

TextFieldV2.sampleProps = {
	autoFocus: false,
	type: "text",
	placeholder: "Placeholder",
	title : "Title",
	titlePosition : "left",
	defaultValue: "Default Value",
	error : false,
	disabled : false,
	onChange: () => {},
	value: "",
	width: '150px',
	titleXs: 3,
	inputXs: 9,
	height: '30px',
	textAlign: "left",
	multiline: false,
	rows: 1,
	maxRows: 1,
	gap: 1,
	inputAlign: "left",
	singleLineTitle: false,
} as StyledProps & StyledPropsExtension;

/**
 * moaui Styled TextField
 * 
 * @param {MoaTextFieldProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange
 * @returns {React.ReactElement} moaTextField
 */

function TextFieldV2(props: StyledProps & StyledPropsExtension) : React.ReactElement {
	const {title, titlePosition, singleLineTitle, width, gap, titleXs, inputXs, ...rest} = props;

	const flexResolver = React.useCallback((titlePosition: string | undefined) => {
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
					flexWrap={"nowrap"}
					container
					gap={gap}
				>
					<React.Fragment>
						<Grid item xs={["bottom", "top"].includes(titlePosition || "") ? 12 : titleXs || 6} display="flex" alignItems="center" justifyContent={titlePosition === "right" ? "end" : "start"}
						>
							<Typography singleLine={singleLineTitle}>{`${title}`}</Typography>
						</Grid>
						<Grid item xs={["bottom", "top"].includes(titlePosition || "") ? 12 : inputXs || 6}>
							<StyledComponent {...rest}/>
						</Grid>
					</React.Fragment>
				</Grid>
			}
			{!title &&
				<Grid width={width}>
					<StyledComponent {...rest}/>
				</Grid>
			}
		</React.Fragment>
	)
}

export default TextFieldV2;

export {
	type StyledProps,
};