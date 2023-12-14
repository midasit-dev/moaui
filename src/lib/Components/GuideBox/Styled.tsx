import React from 'react';
import { styled } from "@mui/material/styles";
import MoaStyledComponent from "../../Style/MoaStyled";
import { MarginTypes, MarginProps } from "../../Style/Margin";
import { PaddingTypes, PaddingProps } from "../../Style/Padding";
import { Stack } from "../..";

export type StyledProps = {
	/**
	 * children of guide box
	 */
	children?: React.ReactNode;
	/**
	 * tag of guide box
	 */
	tag?: string;
	/**
	 * show guide box backgroundColor
	 */
	show?: boolean;
	/**
	 * width of block
	 *
	 * @default inherit
	 */
	width?: number | string;
  /**
   * height of block
   *
   * @default auto
   */
  height?: number | string;
  /**
   * background color of guide box
   *
   * @default rgba(240, 240, 240, 0.5)
   */
  fill?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | string;

	/**
	 * guide box item direction 'column' (super option)
	 */
	column?: boolean;
	/**
	 * guide box item direction 'row' (super option)
	 */
	row?: boolean;
	/**
	 * guide box item direction 'row-reverse' (super option)
	 */
	rowReverse?: boolean;
	/**
	 * guide box item direction 'column-reverse' (super option)
	 */
	columnReverse?: boolean;

	/**
   * guide box item spacing, if not set, use padding value
   */
	spacing?: number;

	/**
	 * guide box item center force option (super option)
	 */
	center?: boolean;

	horLeft?: boolean;
	/**
	 * guide box item align horizontal option 'center' (super option)
	 */
	horCenter?: boolean;
	/**
	 * guide box item align horizontal option 'right' (super option)
	 */
	horRight?: boolean;
	/**
	 * guide box item align horizontal option 'space-between' (super option)
	 */
	horSpaceBetween?: boolean;

	/**
	 * guide box item align veritcal option 'top' (super option)
	 */
	verTop?: boolean;
	/**
	 * guide box item align veritcal option 'center' (super option)
	 */
	verCenter?: boolean;
	/**
	 * guide box item align veritcal option 'bottom' (super option)
	 */
	verBottom?: boolean;
} & MarginTypes & PaddingTypes;

const getItemDirection = (props: StyledProps): {
	condition: boolean;
	value: 'column' |'row' | 'row-reverse' | 'column-reverse';
} => {
	if (props.column) {
		return { condition: true, value: 'column' }
	} else if (props.row) {
		return { condition: true, value: 'row' }
	} else if (props.rowReverse) {
		return { condition: true, value: 'row-reverse' }
	} else if (props.columnReverse) {
		return { condition: true, value: 'column-reverse' }
	} else {
		return { condition: false, value: 'column' }
	}
}

const getItemHorizontalAlign = (props: StyledProps) => {
	if (props.center) {
		return { condition: true, value: 'center' };
	} else if (props.horLeft) {
		return { condition: true, value: 'flex-start' };
	} else if (props.horCenter) {
		return { condition: true, value: 'center' };
	} else if (props.horRight) {
		return { condition: true, value: 'flex-end' };
	} else if (props.horSpaceBetween) {
		return { condition: true, value: 'space-between' };
	} else {
		return { condition: false, value: 'flex-start' };
	}
}

const getItemVerticalAlign = (props: StyledProps) => {
	if (props.center) {
		return { condition: true, value: 'center' };
	} else if (props.verTop) {
		return { condition: true, value: 'flex-start' };
	} else if (props.verCenter) {
		return { condition: true, value: 'center' };
	} else if (props.verBottom) {
		return { condition: true, value: 'flex-end' };
	} else {
		return { condition: false, value: 'flex-start' };
	}
}

const getBackgroundColor = (props: StyledProps): string => {
	if (!props.show) {
		return "transparent";
	} else if (props.fill) {
		if (props.fill === '0') {
			return 'rgba(240, 240, 240, 0.5)';
		} else if (props.fill === '1') {
			return 'rgba(210, 210, 210, 0.5)';
		} else if (props.fill === '2') {
			return 'rgba(180, 180, 180, 0.5)';
		} else if (props.fill === '3') {
			return 'rgba(150, 150, 150, 0.5)';
		} else if (props.fill === '4') {
			return 'rgba(120, 120, 120, 0.5)';
		} else if (props.fill === '5') {
			return 'rgba(90, 90, 90, 0.5)';
		} else if (props.fill === '6') {
			return 'rgba(60, 60, 60, 0.5)';
		} else if (props.fill === '7') {
			return 'rgba(30, 30, 30, 0.5)';
		} else if (props.fill === '8') {
			return 'rgba(0, 0, 0, 0.5)';
		} else {
			return props.fill;
		}
	} else {
		return "rgba(240, 240, 240, 0.5)";
	}
}

const GuideBox = (props: StyledProps) => {
	const { 
		children, 
		tag, 
		show, 
		width, 
		height, 
		fill, 
		column, 
		row, 
		rowReverse,
		columnReverse,
		spacing, 
		center, 
		horLeft, 
		horCenter, 
		horRight, 
		horSpaceBetween, 
		verTop, 
		verCenter, 
		verBottom,
		padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight,
		margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, 
		...rest 
	} = props;

	return (
		<Stack
			width={width}
			height={height}
			{...rest}
			sx={{
				...MarginProps(props),
				...PaddingProps(props),
				backgroundColor: getBackgroundColor(props),
			}}
			overflow={"hidden"}
			direction={getItemDirection(props).value}
			spacing={spacing}
			display={"flex"}
			justifyContent={getItemDirection(props).value === 'row' ? getItemHorizontalAlign(props).value : getItemVerticalAlign(props).value}
		alignItems={getItemDirection(props).value === 'row' ? getItemVerticalAlign(props).value : getItemHorizontalAlign(props).value}
		>
			{props.children}
			{/* {
				props.children && 
					React.Children.map(props.children, (child, index) => (
						<React.Fragment key={index}>{child}</React.Fragment>
					))
			} */}
		</Stack>
  );
}

const StyledComponent = styled((props: StyledProps): React.ReactElement => {
	return <GuideBox {...props} />;
})
(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;