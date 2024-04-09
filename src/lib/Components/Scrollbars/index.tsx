import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Scrollbars
 *  
 * @param props 
 * @returns React.ReactElement
 */
const Scrollbars = (props: StyledProps) => (<StyledComponent {...props}/>);

Scrollbars.defaultProps = {
	outline: 'box',
	titleAlign: 'left',
} as StyledProps;

const SampleProps = {
	panelProps: {
		variant: 'shadow2',
	},
	children: 'contents',
	width: '100%',
	height: '100px',
	title: 'Title',
	titleVariant: toUnionType({ values: ['h1', 'body1', 'body2', 'body3'] }),
	titleColor: toUnionType({ values: ['primary', 'secondary', 'third', 'disable'] }),
	titleAlign: toUnionType({ values: ['left', 'center', 'right'] }),
};

export default Scrollbars;

export {
	type StyledProps as ScrollbarsProps,
	SampleProps as ScrollbarsSample,
}