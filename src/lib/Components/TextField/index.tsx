import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { GuideBox, Typography } from "../..";

/**
 * moaui Styled TextField
 * 
 * @param {MoaTextFieldProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange
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
	autoFocus: false,
	type: "text",
	placeholder: "Placeholder",
	title : "Title",
	titlePosition : "left",
	defaultValue: "Default Value",
	error : false,
	disabled : false,
	onChange: () => {},
	value: "Value",
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