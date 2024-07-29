import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Scrollbars
 *  
 * @param props - panelProps, children, width, height, title, titleVariant, titleColor, titleAlign
 * @example
 * <Scrollbars
 * 	id=''
 * 	panelProps={{ variant: 'box', width: 300 }}
 *  width={300}
 * 	height={300}
 * 	title="Title"
 * 	titleVariant={'h1' || 'body1' || 'body2' || 'body3'}
 * 	titleColor={'primary' || 'secondary' || 'third' || 'disable'}
 * 	titleAlign={'left' || 'center' || 'right'}
 * >
 * 	{children}
 * </Scrollbars>
 * @returns React.ReactElement
 */
const Scrollbars = (props: StyledProps) => {
	const _props = { outline: 'box', titleAlign: 'left', ...props } as StyledProps;
  return <StyledComponent {..._props} />;
};

const SampleProps = {
	id: '',
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