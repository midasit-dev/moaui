import StyledComponent, { type StyledProps } from "./Styled";

DropList.defaultProps = {
	itemList : new Map(),
	value : "",
	onChange: () => {},
	defaultValue: ""
} as StyledProps;

/**
 * Drop List Component
 * @param {MoaDropListProps} props - defaultValue, value, itemList, onChange, width
 * @returns {React.ReactElement} MoaDropList
 */

export default function DropList(props: StyledProps) : React.ReactElement {
	return (
		<StyledComponent {...props} />
	)
}