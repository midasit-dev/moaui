import StyledComponent, { type StyledProps } from "./Styled";

DropList.defaultProps = {
	itemList : new Map(),
	value : "",
	onChange: () => {},
	defaultValue: ""
} as StyledProps;

DropList.sampleProps = {
	width: '100px',
	itemList : [ ['Midas', 1], ['Civil', 2], ['Gen', 3], ['CIM', 4] ],
	onChange: () => {},
	value : 1,
	defaultValue: 1,
	disabled: false,
	backgroundColor: "white",
	listWidth: '100px',
	placeholder: "placeholder",
	maxLength: 10,
} as StyledProps;

/**
 * moaui Styled Drop List Component
 * @param {MoaDropListProps} props - defaultValue, value, itemList, onChange, width
 * @returns {React.ReactElement} MoaDropList
 */

export default function DropList(props: StyledProps) : React.ReactElement {
	return (
		<StyledComponent {...props} />
	)
}