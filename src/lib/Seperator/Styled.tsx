import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Color from '../Color';

export type MoaSeperatorProps = {
	/**
	 * The component orientation.
	 * @defaultValue "horizontal"
	 */
	Direction?: "horizontal" | "vertical"
}

const MoaSeperator= styled((props:MoaSeperatorProps) => {
	const {Direction} = props;
	return(
		<Divider
			orientation={Direction}
			flexItem={Direction === "vertical" ? true : false}
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

export default MoaSeperator;