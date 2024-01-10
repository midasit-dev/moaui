import React from 'react';
import { styled, keyframes } from "@mui/material/styles";
import MoaStyledComponent from "../../Style/MoaStyled";
import { MarginTypes, MarginProps } from "../../Style/Margin";
import { PaddingTypes, PaddingProps } from "../../Style/Padding";
import { Stack, Color } from "../..";
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
	 * @default auto
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
	/**
	 * guide box item align veritcal option 'space-between' (super option)
	 */
	verSpaceBetween?: boolean;

	/**
	 * guide box opacity option
	 */
	opacity?: number;

	/**
	 * animation duration (seconds)
	 */
	duration?: number;
	/**
	 * animation style (pulse)
	 */
	pulse?: boolean;

	/**
	 * loading option
	 */
	loading?: boolean;
	
	/**
	 * overflow option 
	 * 
	 * @default visible
	 */
	overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';

	/**
	 * border radius
	 */
	borderRadius?: number | string;
	/**
	 * border option
	 * 
	 * @example
	 * border="1px solid #000"
	 */
	border?: string;
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
	} else if (props.verSpaceBetween) {
		return { condition: true, value: 'space-between' };
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

// keyframes 정의
const kf_pulse = keyframes`
  0%, 100% {
    transform: scale(0.99);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

const kf_transition = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.5;
  }
`;

function CustomCircularloading({
	color
}: any) {
  return (
    <Box sx={{ position: 'relative', display: 'flex', opacity: 0.3 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          // color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
					color: color === "negative" ? '#1F2327' : Color.primary.enable,
        }}
        size={30}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          // color: (theme) => (theme.palette.mode === 'light' ? Color.primary.enable_strock : '#308fe8'),
					color: color === "negative" ? Color.primaryNegative.white : Color.primary.enable_strock,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={30}
        thickness={4}
      />
    </Box>
  );
}

// Loading button styles
const loadingStackStyles = {
	position: 'relative', // Make sure it's above the other elements
}

const loadingStyles: React.CSSProperties = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)', // Center the button
	zIndex: 2, // Ensure it's on top
	marginTop: 0, // Reset margin because of stack spacing value
};

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
		verSpaceBetween,
		padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight,
		margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, 
		opacity,
		duration,
		pulse,
		loading,
		overflow,
		borderRadius,
		border,
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
				opacity: opacity,
				boxSizing: 'border-box',
				
				...(pulse ? { animation: `${kf_pulse} ${duration}s infinite` } : {}),
				...(loading ? loadingStackStyles : {}),
				...(loading ? { animation: `${kf_transition} ${duration}s infinite` } : {}),
				...(borderRadius ? { borderRadius: borderRadius } : {}),
				...(border ? { border: border } : {}),
			}}
			overflow={overflow || "visible"}
			direction={getItemDirection(props).value}
			spacing={spacing}
			display={"flex"}
			justifyContent={getItemDirection(props).value === 'row' ? getItemHorizontalAlign(props).value : getItemVerticalAlign(props).value}
			alignItems={getItemDirection(props).value === 'row' ? getItemVerticalAlign(props).value : getItemHorizontalAlign(props).value}
		>
			{/* Existing children */}
			{props.children}

			{/* Loading loading */}
			{loading && (
				<div style={{...loadingStyles}}>
					<CustomCircularloading color="negative" />
				</div>
      )}
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