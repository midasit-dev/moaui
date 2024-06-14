import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled TabGroup
 * 
 * @param props - children, orientation, indicator, value, onChange, arai-label, width, height, fontSize, minWidth, minHeight, tabProps
 * @example
 * <TabGroup
 * 	id=""
 * 	orientation="horizontal" || "vertical"
 * 	indicator="left" || "right"
 * 	value="value"
 * 	onChange={() => {}}
 * 	aria-label="Tab Group"
 * 	width="auto"
 * 	height="auto"
 * 	fontSize="h1" || "body1" || "body2" || "body3"
 * 	minWidth="auto"
 * 	minHeight="auto"
 * >
 * 	{children}
 * </TabGroup>
 * @returns JSX.Element
 */
const TabGroup = (props: StyledProps) => (<StyledComponent {...props} />);

const SampleProps = {};

export default TabGroup;

export {
	type StyledProps as TabGroupProps,
	SampleProps as TabGroupSample,
}