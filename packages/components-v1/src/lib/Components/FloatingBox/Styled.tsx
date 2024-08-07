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
	 * The id of the FloatingBox.
	 * @defaultValue ""
	 * @optional
	 * @type string
	 */
	id?: React.HTMLAttributes<HTMLDivElement>['id'];
	/**
	 * class name of floating box
	 */
	className?: React.HTMLAttributes<HTMLDivElement>['className'];
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

	/**
	 * mouse events
	 */
	onMouseDown?: React.MouseEventHandler;
	onMouseUp?: React.MouseEventHandler;
	onMouseOver?: React.MouseEventHandler;
	onMouseLeave?: React.MouseEventHandler;
	onClick?: React.MouseEventHandler;

	/**
	 * styles
	 */
	cursor?: React.CSSProperties['cursor'];
	opacity?: React.CSSProperties['opacity'];
	transition?: React.CSSProperties['transition'];
	border?: React.CSSProperties['border'];
};

const FloatingBox = (props: StyledProps) => {
	const {
		id,
		className,

		key,
		show,
		x,
		y,
		width,
		height,
		fill,
		guideBoxProps,
		children,

		onMouseDown,
		onMouseUp,
		onMouseOver,
		onMouseLeave,
		onClick,

		cursor,
		opacity,
		transition,
		border,
	} = props;

	return (
		<div
			id={id}
			className={className}
			key={key}
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: width,
				height: height,
				backgroundColor: GuideBoxFillColor(show, fill),
				boxSizing: 'border-box',
				...(cursor ? {cursor: cursor} : {}),
				...(opacity ? {opacity: opacity} : {}),
				...(transition? {transition: transition} : {}),
				...(border? {border: border} : {})
			}}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
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
(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;