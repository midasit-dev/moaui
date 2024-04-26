import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { GuideBox, Typography } from "../..";

/**
 * moaui Styled TextField
 * 
 * @param {StyledProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange, value, autoFocus, type, width, height, spacing, textAlign, multiline, rows, maxRows
 * @example
 * <TextField
 * 	id=""
 * 	title="Title"
 * 	titlePosition="left"
 * 	placeholder="Placeholder"
 * 	defaultValue="Default Value"
 * 	error={false}
 * 	disabled={false}
 * 	onChange={() => {}}
 * 	value="Value"
 * 	autoFocus={false}
 * 	type="text"
 * 	width="100px"
 * 	height="30px"
 * 	spacing={1}
 * 	textAlign="left"
 * 	multiline={false}
 * 	rows={1}
 * 	maxRows={1}
 * />
 * @returns {React.ReactElement} moaTextField
 */

const TextField = (props: StyledProps) => {
	const {title, titlePosition, ...rest} = props;

	const WrappedStyles = {
		width: props?.wrappedWidth || 'auto',
		spacing: props?.spacing,
		verCenter: true,
		horSpaceBetween: true,
	}

	return (
		<React.Fragment>
			{
				title !== "" && titlePosition === 'label' &&
					<GuideBox {...WrappedStyles}>
						<GuideBox width='auto'><Typography>{`${title}`}</Typography></GuideBox>
						<GuideBox width={props?.width}><StyledComponent {...rest} /></GuideBox>
					</GuideBox>
			}
			{
				title !== "" && titlePosition === 'left' &&
					<GuideBox {...WrappedStyles} row>
						<GuideBox width='auto'><Typography>{`${title}`}</Typography></GuideBox>
						<GuideBox width={props?.width}><StyledComponent {...rest} /></GuideBox>
					</GuideBox>
			}
			{
				title !== "" && titlePosition === 'right' &&
					<GuideBox {...WrappedStyles} row>
						<GuideBox width={props?.width}><StyledComponent {...rest} /></GuideBox>
						<GuideBox width='auto'><Typography>{`${title}`}</Typography></GuideBox>
					</GuideBox>
			}
			{title === '' &&
				<StyledComponent {...rest}/>
			}
		</React.Fragment>
	)
}

TextField.defaultProps = {
	autoFocus: false,
	type: "text",
	title : "",
	titlePosition : "left",
	error : false,
	disabled : false,
	spacing: 1,
	textAlign: "left",
} as StyledProps;

const SampleProps = {
	id: "",
	autoFocus: false,
	type: "text",
	placeholder: "Placeholder",
	title : "Title",
	titlePosition : "left",
	error : false,
	disabled : false,
	onChange: () => {},
	wrappedWidth: '150px',
	width: '100px',
	height: '30px',
	spacing: 1,
	textAlign: "left",
	multiline: false,
	rows: 1,
	maxRows: 1,
};

export default TextField;

export {
	type StyledProps as TextFieldProps,
	SampleProps as TextFieldSample,
};