import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Grid, { GridProps } from '@mui/material/Grid';

export interface StyledProps extends GridProps {
	/**
	 * current element id
	 * @defaultValue ""
	 * @optional
	 * @type string
	 */
	id?: React.HtmlHTMLAttributes<HTMLDivElement>['id'],

	sx? : never;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const {id, sx, ...rest} = props;
	if (sx) console.error('The sx prop is not used in StyledComponent');

	return <Grid id={id} {...rest} />;
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;