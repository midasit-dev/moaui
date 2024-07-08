import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Drop List Component
 * @param {StyledProps} props - width, itemList, value, onChange, defaultValue, disabled, backgroundColor, listWidth, placeholder, maxLength
 * @example
 * <DropList
 * 	width="100px"
 * 	itemList={new Map([ ['Midas', 1], ['Civil', 2], ['Gen', 3], ['CIM', 4] ])}
 * 	onChange={() => {}}
 * 	value={1}
 * 	defaultValue={1}
 * 	disabled={false || true}
 * 	backgroundColor="white"
 * 	listWidth="100px"
 * 	placeholder="placeholder"
 * 	maxLength={10}
 * />
 * @returns {React.ReactElement} MoaDropList
 */

const DropList = (props: StyledProps) => {
	const _props = { onChange: () => {}, defaultValue: "", ...props } as StyledProps;
  return <StyledComponent {..._props} />;
};

const SampleProps = {
	width: '100px',
	itemList : new Map([ ['Midas', 1], ['Civil', 2], ['Gen', 3], ['CIM', 4] ]),
	onChange: () => {},
	value : 1,
	defaultValue: 1,
	disabled: false,
	backgroundColor: "white",
	listWidth: '100px',
	placeholder: "placeholder",
	maxLength: 10,
} as StyledProps;

export default DropList;

export {
	type StyledProps as DropListProps,
	SampleProps as DropListSample,
}