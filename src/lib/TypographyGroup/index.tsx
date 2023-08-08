import StyledComponent, { type StyledProps } from "./Styled";

MoaTypographyGroup.defaultProps = {
	titleText: "",
	bodyText: ""
}

/**
 * <TypographyGroup />
 * @returns TypographyGroupComponent
 */
function MoaTypographyGroup(props: StyledProps) : React.ReactElement {
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