import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import { Color, Font } from "../../";

import Tab from '@mui/material/Tab';

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
	// setValue?: React.Dispatch<any>;
	onChange?: (event: React.SyntheticEvent, value: any) => void;
	/**
	 * If `true`, the component is disabled.
	 * @defaultValue false
	 */
	disabled?: boolean;

	/**
	 * If `true`, the component is selected.
	 * @defaultValue false
	 * @optional
	 * @type boolean
	 */
	selected?: boolean;
}
const StyledComponent = styled((props: StyledProps) => {
	return (
		<Tab 
			value={props?.value}
			label={props?.label}
			onClick={(event) => props?.onChange ? props?.onChange?.(event, props?.value) : {}}
			disabled={props?.disabled}
			sx={{
				color: props?.selected ? Color.text.primary : Color.text.secondary,
				fontWeight: props?.selected ? 700 : 500, /** bold */
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

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;