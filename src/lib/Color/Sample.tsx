import Color from '.';

interface SampleProps {
	/**
	 * The background color of the sample
	 */
	backgroundColor: string;
}

Sample.defaultProps = {
	backgroundColor: Color.primary.main
} as SampleProps;

const defaultStyle = {
	width: "100px",
	height: "50px",
	borderRadius: "5px",
}

function Sample (props: SampleProps) {
	return <div style={{ ...defaultStyle, backgroundColor: props.backgroundColor }} />;
}

export default Sample;