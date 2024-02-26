import { GuideBox } from "@midasit-dev/moaui"

interface BodyProps {
	children: React.ReactNode;
	guideBoxProps?: any
}

const Body = (props: BodyProps) => {
	const { 
		children,
		guideBoxProps,
	} = props;

	return (
		<GuideBox 
			width="100%"
			spacing={2}
			{...guideBoxProps}
		>
			{children}
		</GuideBox>
	)
}

export default Body;