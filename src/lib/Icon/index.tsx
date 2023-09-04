import StyledComponent, { type StyledProps } from "./Styled";

MUIIcon.defaultProps = {
	iconName: "Add",
}

export default function MUIIcon(props: StyledProps) : React.ReactElement {	
	return (
		<StyledComponent {...props} />
	)
}