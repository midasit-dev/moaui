import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Color from "../Color";
import Font from "../Font";

export type StyledProps = {
	/**
	 * You can provide your own value. Otherwise, we fallback to the child position index.
	 */
	value?: any;
	/**
	 * The label element.
	 */
	label?: React.ReactNode;
	/**
	 * Set Tabs Value Control
	 */
	setValue?: React.Dispatch<any>;
	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;
}
const StyledComponent = styled((props: StyledProps) => {
	return (
		<Tab 
			value={props?.value}
			label={props?.label}
			onClick={() => props?.setValue ? props?.setValue(props?.value) : {}}
			disabled={props?.disabled}
			sx={{
				color: Color.text.secondary,
				fontWeight: 500, /** bold */
				fontSize: "0.75rem", /** 12px */
				lineHeight: "0.875rem", /** 14px */
				...Font.defaultFontSet,
				padding: '0.625rem',
				'&:hover': {
					color: Color.text.primary
				},
				'&.Mui-disabled': {
					color: Color.text.disable
				}
			}}
		/>
	)
})(({theme}) => ({}));

export default StyledComponent;