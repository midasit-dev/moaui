import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Scrollbars from "rc-scrollbars";
import { Panel, Stack, Typography, type PanelProps } from "../..";

export interface StyledProps {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * Outline Panel Property
   *
   * @example
   * <Scrollbars
   * 		panelProps={{
   * 			variant: 'box',
   * 			width: 300,
   * 		}}
   * />
   */
  panelProps?: PanelProps;

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
  titleVariant?: "h1" | "body1" | "body2" | "body3";
  /**
   * Set the text color
   *
   * @default primary
   */
  titleColor?: "primary" | "secondary" | "third" | "disable";
  /**
   * Set the text align
   *
   * @default left
   */
  titleAlign?: "left" | "center" | "right";
}

const StyledComponent = styled((props: StyledProps) => {
	const { 
		id,
		panelProps, 
		width,
		height, 
		title, 
		titleVariant, 
		titleColor, 
		titleAlign, 
		...rest
	} = props;

	return (
		<Panel 
			width={width || undefined}
			{...panelProps}
		>

			{title &&
				<Stack paddingTop={1.5} paddingBottom={1.5}>
					<Typography 
						variant={titleVariant}
						color={titleColor}
						horLeft={titleAlign === "left"}
						horCenter={titleAlign === "center"}
						horRight={titleAlign === "right"}
					>
						{title}
					</Typography>
				</Stack>
			}

			<Scrollbars 
				id={id}
				{...rest}
				autoHeight
				autoHeightMax={height}
				autoHeightMin={height}
			/>

		</Panel>
	)
})(() => ({ }))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;