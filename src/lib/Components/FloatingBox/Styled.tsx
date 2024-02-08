import styled from '@emotion/styled';
import MoaStyledComponent from "../../Style/MoaStyled";
import React from 'react';
import { 
	type GuideBoxProps
} from '../../';
import { 
	GuideBox, 
	GuideBoxFillColor,
} from '../../';

export type StyledProps = {
	/**
	 * key of floating box
	 */
	key?: React.Key;
	/**
	 * x position of floating box (left-top)
	 */
	x?: number;
	/**
	 * y position of floating box (left-top)
	 */
	y?: number;
	/**
	 * width of floating box
	 */
	width?: GuideBoxProps['width']
	/**
	 * height of floating box
	 */
	height?: GuideBoxProps['height']
	/**
	 * show floating box
	 */
	show?: GuideBoxProps['show'];
	/**
	 * background color of floating box
	 */
	fill?: GuideBoxProps['fill'];
	/**
	 * guide box props
	 */
	guideBoxProps?: GuideBoxProps;
	/**
	 * children of floating box
	 */
	children?: React.ReactNode;
};

const FloatingBox = (props: StyledProps) => {
	const {
		key,
		show,
		x,
		y,
		width,
		height,
		fill,
		guideBoxProps,
		children,
	} = props;

	return (
		<div
			key={key}
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: width,
				height: height,
				backgroundColor: GuideBoxFillColor(show, fill),
			}}
		>
			<GuideBox {...guideBoxProps}>
				{children}
			</GuideBox>
		</div>
	);
}

const StyledComponent = styled((props: StyledProps): React.ReactElement => {
	return <FloatingBox {...props} />;
})
(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;