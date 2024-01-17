import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import { Color, Font } from "../../";
import { MarginProps, MarginTypes } from '../../Style/Margin';
import { PaddingProps, PaddingTypes } from '../../Style/Padding';

/** Font Style */
type FontStyleObject = {
	/**
	 * Set the font weight
	 */
	fontWeight: number;
	/**
	 * Set the font size
	 */
	fontSize: string;
	/**
	 * Set the Line-Height
	 */
	lineHeight: string;
}

class FontStyle {
	static selector(variant: string | undefined): FontStyleObject {
		if (!variant) return this.body1();

		switch ( variant )
		{
			case 'h1': 		return this.h1();
			case 'body1': return this.body1();
			case 'body2': return this.body2();
			case 'body3': return this.body3();
			default: return this.body1();
		}
	}
	static h1() {
		return {
			fontWeight: 700, /** bold */
			fontSize: "0.75rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		};
	}
	static body1() {
		return {
			fontWeight: 400, /** normal */
			fontSize: "0.75rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		};
	}
	static body2() {
		return {
			fontWeight: 500, /** normal */
			fontSize: "0.75rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		};
	}
	static body3() {
		return {
			fontWeight: 400, /** normal */
			fontSize: "0.688rem", /** 12px */
			lineHeight: "0.875rem", /** 14px */
		};
	}
}

/** Font Color */
class FontColor {
	static selector(color: string | undefined): string {
		if (!color) return Color.text.primary;
		
		switch ( color ) 
		{
			case 'primary':		return Color.text.primary;
			case 'secondary':	return Color.text.secondary;
			case 'third':		 	return Color.text.third;
			case 'disable':		return Color.text.disable;
			default: return color;
		}
	}
}

export interface StyledProps extends MarginTypes, PaddingTypes {
	/**
	 * Represent a text string in typography component
	 * @defaultValue ''
	 */
	children?: string | string[] | JSX.Element;
	/**
	 * Set the typography type
	 * @defaultValue 'body1'
	 */
	variant?: 'h1' | 'body1' | 'body2' | 'body3';
	/**
	 * Set the text color
	 * @defaultValue 'primary'
	 */
	color?: 'primary' | 'secondary' | 'third' | 'disable' | string;
	/**
	 * Set the width
	 */
	width?: string | number;
	/**
	 * Set the height
	 */
	height?: string | number;
	/**
	 * Set the Size
	 */
	size?: 'small' | 'medium' | 'large';
	/**
	 * Make typography into a single line
	 */
	singleLine?: boolean;

	/**
	 * Set the alignItems (Top)
	 */
	verTop?: boolean;
	/**
	 * Set the alignItems (Middle)
	 */
	verCenter?: boolean;
	/**
	 * Set the alignItems (Bottom)
	 */
	verBottom?: boolean;

	/**
	 * Set the justifyContent (Left)
	 */
	horLeft?: boolean;
	/**
	 * Set the justifyContent (Center)
	 */
	horCenter?: boolean;
	/**
	 * Set the justifyContent (Right)
	 */
	horRight?: boolean;

	/**
	 * Set the center (vertical, horizontal)
	 */
	center?: boolean;
}

const getFontSize = (size: any) => {
	switch (size) {
		case 'small': return '0.75rem'; /** 12px */
		case 'medium': return '1rem'; /** 16px */
		case 'large': return '1.375rem' /** 22px */
		default: return '0.75rem';
	}
}

const getHorizontalAlign = (props: StyledProps) => {
	if (props.center) return 'center';
	if (props.horLeft) return 'flex-start';
	if (props.horCenter) return 'center';
	if (props.horRight) return 'flex-end';
	return 'flex-start';
}

const getVerticalAlign = (props: StyledProps) => {
	if (props.center) return 'center';
	if (props.verTop) return 'flex-start';
	if (props.verCenter) return 'center';
	if (props.verBottom) return 'flex-end';
	return 'flex-start';
}

const StyledComponent = styled((props: StyledProps) => {
	const { 
		children, 
		variant, 
		color, 
		size, 
		singleLine,
		// verTop,
		// verCenter,
		// verBottom,
		// horLeft,
		// horCenter,
		// horRight,
		// center,
	} = props;

	return (
		<Typography 
			sx={{
				whiteSpace: singleLine ? 'nowrap' : 'pre-line',
				overflow: singleLine ? 'hidden' : 'visible',
				textOverflow: singleLine ? 'ellipsis' : 'clip',
				wordBreak: 'break-word',
				...FontStyle.selector(variant),
				...Font.defaultFontSet,
				...MarginProps(props),
				...PaddingProps(props),
				display: singleLine ? "block" : 'flex',
				justifyContent: getHorizontalAlign(props),
				alignItems: getVerticalAlign(props),
				width: props.width || 'auto',
				height: props.height || 'auto',
				fontSize: getFontSize(size),
			}}
			color={FontColor.selector(color)}
		>
			{children}
		</Typography>
	)
})(({theme}) => ({
	display: "flex",
	fontFeatureSettings: "'clig' off, 'liga' off",
}));

export default StyledComponent;