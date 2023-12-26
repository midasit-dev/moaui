import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import MuiButton from '@mui/material/Button';
import Font from "../../Style/Font";
import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { Color } from "../..";

function CustomCircularProgress({
	color
}: any) {
  return (
    <Box sx={{ position: 'relative', display: 'flex', opacity: 0.3 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          // color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
					color: color === "negative" ? Color.primaryNegative.enable : Color.primary.enable,
        }}
        size={15}
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
        size={15}
        thickness={4}
      />
    </Box>
  );
}

export type StyledProps = {
	/**
	 * The content of the button.
	 * @defaultValue "Button"
	 * @optional
	 * @type string
	 */
	children: string,
	/**
	 * The callback function that is fired when the button is clicked.
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The event source of the callback.
	 * @defaultValue undefined
	 * @optional
	 * @type React.MouseEventHandler<HTMLButtonElement>
	 * @example
	 * onClick={(event) => {}}
	 * onClick={handleClick}
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
	/**
	 * The variant to use.
	 * @default "contained"
	 * @optional
	 * @type "contained" | "outlined" | "text"
	 */
	variant?: "contained" | "outlined" | "text",
	/**
	 * If the value is true, The state of the button is disabled.
	 * @defaultValue false
	 * @optional
	 * @type boolean
	 * @example
	 * disabled={true}
	 * disabled={false}
	 * disabled
	 * !disabled
	 */
	disabled?: boolean
	/**
	 * The width of the button.
	 * @defaultValue "auto"
	 * @optional
	 * @type string
	 * @example
	 * width="auto"
	 * width="100%"
	 * width="10rem"
	 * width="10vw"
	 * width="10vh"
	 * width="10ex"
	 * width="10px"
	 */
	width?: string

	/**
	 * The color of the button.
	 * @defaultValue "normal"
	 * @optional
	 * @type "normal" | "negative"
	 * @example
	 * color="normal"
	 * color="negative"
	 */
	color?: "normal" | "negative"

	/**
	 * If the value is true, The state of the button is loading.
	 * 
	 * @default false
	 */
	loading?: boolean
}


const StyledComponent = styled((props:StyledProps) => {
	const { variant, disabled, width, onClick, color, children, loading, ...rest } = props;

	const commonButtonProps = React.useMemo(() => ({
		disableFocusRipple:true,
		disableRipple:true,
		disableElevation : true,
	}), []);

	const commonButtonStyle = React.useMemo(() => ({
		width:`${width}`,
		display: "inline-flex",
		height: "1.75rem",
		padding: "0.625rem 1.25rem",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.25rem",
		flexShrink: 0,
		borderRadius: "0.25rem",
		//text
		textAlign: "center",
		fontFeatureSettings: Font.fontFeatureSettings,
		fontFamily: Font.fontFamily,
		fontSize: "0.75rem",
		fontStyle: "normal",
		fontWeight: 500,
		lineHeight: "0.875rem",
		textTransform: "none",
	}), [width]);

	const CustomButtonStyleByVariant = React.useCallback(({ variant, color }: { variant:StyledProps["variant"], color: StyledProps["color"] }) => {
		const borderConfig = variant !== "text" ? `1px solid` : "none";
		const primaryColorConfig = color === "negative" ? "primaryNegative" : "primary";
		const textColorConfig = color === "negative" ? "textNegative" : "text";
		
		if(variant === "contained") {
			return ({
				border: `${borderConfig} ${Color[primaryColorConfig].enable_strock}`,
				background: Color[primaryColorConfig].enable,
				color: Color[textColorConfig].primary,
				"&:hover": {
					background: Color[primaryColorConfig].hover,
					color: Color[primaryColorConfig].white,
					border : `${borderConfig} ${Color[primaryColorConfig].hover}`
				},
				":active":{
					background: Color[primaryColorConfig].focus,
					color: Color[primaryColorConfig].white,
					border : `${borderConfig} ${Color[primaryColorConfig].focus}`
				},
				":disabled":{
					background: Color[primaryColorConfig].enable,
					color: Color[textColorConfig].disable,
					border : `${borderConfig} ${Color[primaryColorConfig].enable}`
				},
			})
		}
		if(variant === "outlined") {
			return ({
				border: `${borderConfig} ${Color[primaryColorConfig].enable_strock}`,
				background: "none",
				color: Color[textColorConfig].primary,
				"&:hover": {
					background: "none",
					color: Color[textColorConfig].primary,
					border : `${borderConfig} ${Color[primaryColorConfig].hover}`
				},
				":active":{
					background: "none",
					color: Color[textColorConfig].primary,
					border : `${borderConfig} ${Color[primaryColorConfig].focus}`
				},
				":disabled":{
					background: "none",
					color: Color[textColorConfig].disable,
					border : `${borderConfig} ${Color[primaryColorConfig].enable}`
				},
			})
		} 
		if(variant === "text") {
			return ({
				border: "none",
				background: "none",
				color: Color.secondary.main,
				"&:hover": {
					background: "none",
					color: Color[primaryColorConfig].hover,
					border : `${borderConfig} ${Color[primaryColorConfig].hover}`
				},
				":active":{
					background: "none",
					color: Color[primaryColorConfig].focus,
					border : `${borderConfig} ${Color[primaryColorConfig].focus}`
				},
				":disabled":{
					background: "none",
					color: Color[textColorConfig].disable,
					border : `${borderConfig} ${Color[primaryColorConfig].enable_strock}`
				},
			})
		}
		return (
			<></>
		)
	}, []);

	return (
		<MuiButton
			{...commonButtonProps}
			variant={variant}
			disabled={disabled || loading}
			fullWidth={width === "100%" ? true : false}
			onClick={onClick}
			sx={{
				...commonButtonStyle,
				...CustomButtonStyleByVariant({ variant: variant, color: color })
			}}
		>
			{loading ? 
				<CustomCircularProgress color={color} />
			 : 
			 	children
			}
		</MuiButton>
	)
})
(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;