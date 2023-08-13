
import MoaDropList, { type MoaDropListProps } from "./Styled";

MoaDroplist.defaultProps = {
	itemList : new Map(),
	children : <></>,
	value : "",
	onChange: () => {},
	defaultValue: ""
}

export default function MoaDroplist(props: MoaDropListProps) : React.ReactElement {
	return (
		<MoaDropList {...props} />
	)
}