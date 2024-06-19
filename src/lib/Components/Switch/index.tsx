import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Switch (Single)
 * 
 * @param props - checked, label, onChange, disabled
 * @example
 * <Switch
 * 	id=""
 * 	checked={false || true}
 * 	label="Switch"
 * 	onChange={() => {}}
 * 	disabled={false || true}
 * />
 * @returns React.ReactElement
 */
function Switch(props: StyledProps) {
	return <StyledComponent {...props} />
};

const SampleProps = {
	id: '',
	checked: false,
	label: 'Switch',
	onChange: () => {},
	disabled: false,
};

export default Switch;

export {
	type StyledProps as SwitchProps,
	SampleProps as SwitchSample,
}
