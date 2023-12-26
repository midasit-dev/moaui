import { ColorMap } from '.';

const ColorKeys = Array.from(ColorMap.keys());
type ColorKeysUnion = typeof ColorKeys[number];

interface SampleProps {
	/**
	 * The background color of the sample
	 */
	backgroundColorName: ColorKeysUnion
}

Sample.defaultProps = {
	backgroundColorName: "Color.primary.main"
} as SampleProps;

const defaultStyle = {
	width: "100px",
	height: "50px",
	borderRadius: "5px",
}

/**
 * moaui Styled Colors
 * 
 * @param props 
 * @returns null
 */
function Sample (props: SampleProps) {
	return <div style={{ ...defaultStyle, backgroundColor: ColorMap.get(props.backgroundColorName) }} />;
}

export default Sample;