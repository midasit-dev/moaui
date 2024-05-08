import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Icon (Single)
 * 
 * @param props - iconName, opacity, toButton, onClick
 * @example
 * <Icon
 * 	iconName="Apple"
 * 	opacity={1}
 * 	toButton={false}
 * />
 * @returns React.ReactElement
 */
const Icon = (props: StyledProps) => (<StyledComponent {...props} />);

Icon.defaultProps = {
	iconName: "Add",
	opacity: 1,
} as StyledProps;

const SampleProps = {
	id: '',
	iconName: "Apple",
	opacity: 1,
	toButton: false,
};

export default Icon;

export {
	type StyledProps as IconProps,
	SampleProps as IconSample,
}