
import MoaDropList, { type MoaDropListProps } from "./Styled";

MoaDroplist.defaultProps = {
	itemList : new Map(),
	value : "",
	onChange: () => {},
	defaultValue: ""
}

/**
 * @param {MoaDropListProps} props - defaultValue, value, itemList, onChange, width
 * @returns {React.ReactElement} MoaDropList
 */

export default function MoaDroplist(props: MoaDropListProps) : React.ReactElement {
	return (
		<MoaDropList {...props} />
	)
}