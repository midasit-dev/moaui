import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Scrollbars from "rc-scrollbars";
import { Panel, Stack, Typography } from "../..";

export interface StyledProps {
	/**
	 * `box`, `shadow`, `strock` outlined panel
	 * 
	 * @default box
	 */
	outline?: 'box' | 'shadow' | 'strock';
	/**
	 * React Element
	 */
	children?: React.ReactNode;
	/**
	 * Width pixel
	 */
	width?: number | string;
	/**
	 * Height pixel
	 */
	height?: number | string;
	/**
	 * Title Text
	 * 
	 * @default undefined
	 */
	title?: string;
	/**
	 * Set the typography type
	 * 
	 * @default body1
	 */
	titleVariant?: 'h1' | 'body1' | 'body2' | 'body3';
	/**
	 * Set the text color
	 * 
	 * @default primary
	 */
	titleColor?: 'primary' | 'secondary' | 'third' | 'disable';
	/**
	 * Set the text align
	 * 
	 * @default left
	 */
	titleAlign: "center" | "left";
}

const StyledComponent = styled((props: StyledProps) => {
	const { outline, width, height, title, titleVariant, titleColor, titleAlign, ...rest } = props;

	return (
		<Panel 
			variant={outline}
			width={width}
		>
			{props.title &&
				<Stack paddingTop={1.5} paddingBottom={1.5}>
					<Typography 
						variant={titleVariant}
						color={titleColor}
						textAlign={titleAlign}
					>
						{title}
					</Typography>
				</Stack>
			}
			<Scrollbars 
				{...rest} 
				autoHeight
				autoHeightMax={height}
				autoHeightMin={height}
			/>
		</Panel>
	)
})(({theme}) => ({ }))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;