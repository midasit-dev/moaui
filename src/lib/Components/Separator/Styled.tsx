import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Divider from '@mui/material/Divider';
import Color from '../../Style/Color';
import { MarginTypes } from '../../Style/Margin';
import { Typography } from '../../';

export interface StyledProps extends MarginTypes {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];

  /**
   * The component orientation.
   * @defaultValue "horizontal"
   *
   * @privateRemarks
   *
   * The `@privateRemarks` tag starts a block of additional commentary that is not meant
   * for an external audience.  A documentation tool must omit this content from an
   * API reference web site.  It should also be omitted when generating a normalized
   * *.d.ts file.
   */
  direction?: "horizontal" | "vertical";
}

const StyledComponent = styled((props:StyledProps) => {
	const {id, direction} = props;

	if (direction === "horizontal") {
		return (
			<Divider
				id={id}
				orientation={direction}
				sx={{
					width: "inherit",

					//magin
					margin: props.margin || "0.125rem 0",
					marginTop: props.marginTop,
					marginBottom: props.marginBottom,
					marginLeft: props.marginLeft,
					marginRight: props.marginRight,
					marginX: props.marginX,
					marginY: props.marginY,

					//border
					borderWidth: "0.0625rem",
					borderColor: Color.component.gray_02,
				}}
			/>
		)
	}

	if (direction === "vertical") {
		return (
			<Divider
				orientation={direction}
				flexItem
				sx={{
					//margin
					margin: props.margin || "0 0.125rem",
					marginTop: props.marginTop,
					marginBottom: props.marginBottom,
					marginLeft: props.marginLeft,
					marginRight: props.marginRight,
					marginX: props.marginX,
					marginY: props.marginY,
					
					//border
					borderWidth: "0.0625rem",
					borderColor: Color.component.gray_02,
				}}
			/>
		)
	}

	return <Typography>direction is not available</Typography>;
})(() => ({
}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;