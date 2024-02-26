import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import { Color, Font, type TypographyProps } from "../../";

import Tab from '@mui/material/Tab';

export type StyledProps = {
	/**
	 * You can provide your own value. Otherwise, we fallback to the child position index.
	 */
	value?: any;
	/**
	 * The label element.
	 */
	label?: string;
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

	/**
	 * The width of the Tab.
	 */
	width?: string | number;
	/**
	 * The height of the Tab.
	 */
	height?: string | number;
	/**
	 * The fontSize of the Tab.
	 */
	fontSize?: TypographyProps["size"];
	/**
	 * The minWidth of the Tab.
	 */
	minWidth?: string | number;
	/**
	 * The minHeight of the Tab.
	 */
	minHeight?: string | number;
}
const StyledComponent = styled((props: StyledProps) => {
	const {
		value,
		label,
		onChange,
		disabled,
		selected,
		width,
		height,
		fontSize,
		minWidth,
		minHeight,
	} = props;

	return (
		<Tab 
			value={value ?? undefined}
			label={label ?? undefined}
			onClick={(event) => onChange ? onChange(event, value) : {}}
			disabled={disabled ?? undefined}
			sx={{
				width: width ?? undefined,
				height: height ?? undefined,
				minWidth: minWidth ?? undefined,
				minHeight: minHeight ?? undefined,
				...Font.defaultFontSet,
				color: selected ? Color.text.primary : Color.text.secondary,
				fontWeight: selected ? 700 : 500, /** bold */
				fontSize: Font.getFontSize(fontSize ?? undefined),
				lineHeight: "0.875rem", /** 14px */
				padding: '0.625rem',
				'&:hover': { color: Color.text.primary },
				'&.Mui-disabled': { color: Color.text.disable }
			}}
		/>
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;