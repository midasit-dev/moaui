import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Divider from '@mui/material/Divider';
import Color from '../../Style/Color';

export type StyledProps = {
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
	direction?: "horizontal" | "vertical"
}

const StyledComponent = styled((props:StyledProps) => {
	const {direction} = props;
	return(
		<Divider
			orientation={direction}
			flexItem={direction === "vertical" ? true : false}
			sx={{
				width: "inherit",
				margin: "0.125rem 0rem",
				borderWidth: "0.0625rem",
				borderColor: Color.component.gray_02,
			}}
		/>
	)
})(({theme}) => ({

}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;