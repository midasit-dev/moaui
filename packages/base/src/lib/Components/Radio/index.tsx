import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Radio Button
 * 
 * @param props - checked, onChange, value, name, ariaLabel, disabled
 * @example
 * <Radio
 * 	id=''
 * 	onChange={() => {}}
 * 	value={"Radio"}
 * 	name={"Radio"}
 * 	ariaLabel={"Radio button"}
 * 	disabled={true || false}
 * />
 * @returns React.ReactElement
 */
const Radio = (props: StyledProps) => {
	const _props = {
    disalbed: false,
    value: "",
    ariaLabel: "Radio button",
    ...props,
  } as StyledProps;
  return <StyledComponent {..._props} />;
};

const SampleProps = {
	id: '',
	onChange: () => {},
	name: "Radio",
	ariaLabel: "Radio button",
	disabled: false,
};

export default Radio;

export {
	type StyledProps as RadioProps,
	SampleProps as RadioSample,
}