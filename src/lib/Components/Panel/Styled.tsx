import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import { Color } from '../../';
import Box, { type BoxProps } from '@mui/material/Box';
import { MarginTypes, MarginProps } from '../../Style/Margin';
import { PaddingTypes, PaddingProps, hasPaddingProps } from '../../Style/Padding';

class StyleVariant {
	private static readonly layout = {
		alignItems: 'flex-start',
		gap: '0.625rem',
	}

	static readonly shadow = {
		...this.layout,
		background: Color.primary.white,
		boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.14)',
	}

	static readonly shadow2 = {
		...this.layout,
		backgroundColor: 'var(--color-bg, #ffffff)',
		display: 'flex',
		boxShadow: 'var(--elevation-200-canvas, 0px 0px .5px rgba(0, 0, 0, .18), 0px 3px 8px rgba(0, 0, 0, .1), 0px 1px 3px rgba(0, 0, 0, .1))',
	}

	static readonly strock = {
		...this.layout,
		border: `1px solid ${Color.component.gray_light}`,
		background: Color.primary.white,
	}
}

export type StyledProps = {
	/**
	 * Panel inner contents
	 */
	children?: React.ReactNode;
	/**
	 * `shadow` panel or `strock` panel
	 * @defaultValue 'shadow'
	 */
	variant?: 'box' | 'shadow' | 'shadow2' | 'strock';
	/**
	 * Set the width of panel
	 * @defaultValue 'fit-content'
	 */
	width?: number | string;
	/**
	 * Set the height of panel
	 * @defaultValue 'fit-content'
	 */
	height?: number | string;
	/**
	 * Set the flexItem of panel
	 * @defaultValue false
	 */
	flexItem?: boolean;
	/**
	 * Set the backgroundColor of panel
	 */
	backgroundColor?: string;
	/**
	 * Set the borderRadius of panel
	 */
	borderRadius?: number | string;
	/**
	 * Set the border of panel
	 */
	border?: string;
	/**
	 * Set the position relative of panel
	 */
	relative?: boolean;
} & MarginTypes & PaddingTypes & BoxProps;

const StyledComponent = styled((props: StyledProps) => {
	const {
		children,
		variant,
		width,
		height,
		flexItem,
		backgroundColor,
		borderRadius,
		border,
		relative,
		...rest
	} = props;

	let _sx = {};
	if (variant === 'shadow') _sx = StyleVariant.shadow;
	if (variant === 'shadow2') _sx = StyleVariant.shadow2;
	if (variant === 'strock') _sx = StyleVariant.strock;
	return (
		<Box 
			sx={{
				..._sx, 
				width: width,
				height: height,
				display: flexItem ? 'flex' : 'block',
				boxSizing: 'border-box',

				...MarginProps(props),
				...(hasPaddingProps(props) ? PaddingProps(props) : { padding: '0.625rem'}),

				...(backgroundColor !== undefined ? { backgroundColor: backgroundColor } : {}),
				...(borderRadius !== undefined ? { borderRadius: borderRadius } : { borderRadius: '0.25rem' }),
				...(border !== undefined ? { border: border } : {}),
				...(relative ? { position: 'relative' } : {}),
			}}
			justifyContent='center'
		>
			{children}
		</Box>
	)
})(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;