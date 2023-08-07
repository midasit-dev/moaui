import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Color from "../Color";
import Font from "../Font";

/** Font Style */
type FontStyleObject = {
	fontWeight: number;
	fontSize: string;
	lineHeight: string;
}
class FontStyle {
	static selector(variant: string): FontStyleObject {
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
	static selector(color: string): string {
		switch ( color ) 
		{
			case 'primary':		return Color.text.primary;
			case 'secondary':	return Color.text.secondary;
			case 'third':		 	return Color.text.third;
			case 'disable':		return Color.text.disable;
			default: return Color.text.primary;
		}
	}
}

export type StyledProps = {
	children: string;
	variant: 'h1' | 'body1' | 'body2' | 'body3';
	color: 'primary' | 'secondary' | 'third' | 'disable';
}
const StyledComponent = styled((props: StyledProps) => {
	return (
		<Typography 
			sx={{
				...FontStyle.selector(props.variant),
				...Font.defaultFontSet,
			}}
			color={FontColor.selector(props.color)}
		>
			{props.children}
		</Typography>
	)
})(({theme}) => ({
	display: "flex",
	fontFeatureSettings: "'clig' off, 'liga' off",
	
}));

export default StyledComponent;