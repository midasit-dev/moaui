import StyledComponent from "./Styled";

type MoaTypographyGroupProps = {
	titleText: string;
	bodyText: string;
}

MoaTypographyGroup.defaultProps = {
	titleText: "",
	bodyText: ""
}

function MoaTypographyGroup(props: MoaTypographyGroupProps) : React.ReactElement {
	const titleText = props.titleText;
	const bodyText = props.bodyText;

	return (
		<StyledComponent 
			titleText={titleText} 
			bodyText={bodyText}
		/>
	)
}

export default MoaTypographyGroup;