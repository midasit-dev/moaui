import { GuideBox } from "@midasit-dev/moaui"

interface BodyProps {
	children: React.ReactNode;
	LayoutGuideBoxProps?: any
}

const Body = (props: BodyProps) => {
	const { 
		children,
		LayoutGuideBoxProps,
	} = props;

	return (
		<GuideBox 
			width="100%"
			spacing={2}
			{...LayoutGuideBoxProps}
		>
			{children}
		</GuideBox>
	)
}

export default Body;