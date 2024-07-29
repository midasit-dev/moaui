import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Color, Font } from "../../";

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * text of title
   * @defaultValue ''
   */
  titleText: string;
  /**
   * text of body
   * @defaultValue ''
   */
  bodyText: string;
};
const StyledComponent = styled((props: StyledProps) => {
	return (
		<Box 
			id={props?.id}
			sx={{
			display: 'inline-flex',
			padding: '0.125rem',
			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: '0.125rem'
		}}>
			<Box sx={{
				display: 'flex',
				padding: '0.25rem',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '0.625rem'
			}}>
				<Typography sx={{
					...Font.defaultFontSet,
					color: Color.text.primary,
					fontStyle: 'normal',
					fontWeight: 600, /** bold */
					fontSize: "0.75rem", /** 12px */
					lineHeight: "0.875rem", /** 14px */
				}}>
					{props.titleText}
				</Typography>
			</Box>
			<Box sx={{
				display: 'flex',
				padding: '0.25rem',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '0.625rem'
			}}>
				<Typography sx={{
					...Font.defaultFontSet,
					color: Color.text.primary,
					fontStyle: 'normal',
					fontWeight: 400, /** bold */
					fontSize: "0.75rem", /** 12px */
					lineHeight: "0.875rem", /** 14px */
				}}>
					{props.bodyText}
				</Typography>
			</Box>
		</Box>
	)
})(() => ({}));

export default StyledComponent;