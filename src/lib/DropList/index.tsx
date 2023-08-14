
import MoaDropList, { type MoaDropListProps } from "./Styled";

MoaDroplist.defaultProps = {
	itemList : new Map(),
	value : "",
	onChange: () => {},
	defaultValue: ""
}

export default function MoaDroplist(props: MoaDropListProps) : React.ReactElement {
	return (
		<MoaDropList {...props} />
	)
}