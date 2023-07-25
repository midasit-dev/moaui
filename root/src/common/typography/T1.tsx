import { fontPretendard } from "@/common/Theme";

interface T1Props {
	value: string;
}

T1.defaultProps = {
	value: ""
}

function T1(props: T1Props) {
	return (
		<div style={fontPretendard} className="text-moa-mono-300 dark:text-moa-gray-100">
			{props.value}
		</div>
	);
}

export default T1;