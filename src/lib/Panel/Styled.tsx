import { styled } from '@mui/material/styles';
import Color from '../Color';
import Box from '@mui/material/Box';

class StyleVariant {
	private static readonly layout = {
		padding: "0.3125rem 0.625rem",
		alignItems: 'flex-start',
		gap: '0.625rem',
	}

	static readonly shadow = {
		...this.layout,
		borderRadius: '0.25rem',
		background: Color.primary.white,
		boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.14)',
	}
	static readonly strock = {
		...this.layout,
		borderRadius: '0.25rem',
		border: `1px solid ${Color.component.gray_light}`,
		background: Color.primary.white,
	}
}

export type StyledProps = {
	/**
	 * Panel inner contents
	 */
	children: React.ReactNode;

	/**
	 * `shadow` panel or `strock` panel
	 * @defaultValue 'shadow'
	 */
	variant: 'shadow' | 'strock';
	/**
	 * Set the width of panel
	 * @defaultValue 'fit-content'
	 */
	width: string;
	/**
	 * Set the height of panel
	 * @defaultValue 'fit-content'
	 */
	height: string;
}
const StyledComponent = styled((props: StyledProps) => {
	let _sx = {};
	if (props.variant === 'shadow') _sx = StyleVariant.shadow;
	if (props.variant === 'strock') _sx = StyleVariant.strock;
	_sx = { 
		..._sx, 
		width: props.width,
		height: props.height,
	}

	return (
		<Box sx={_sx}>
			{props.children}
		</Box>
	)
})(({theme}) => ({}));

export default StyledComponent;