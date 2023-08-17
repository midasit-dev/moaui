import { TypographyType, Typography } from "@/components/Typography";

const IconLogo = (): React.ReactElement => {
	return (
		<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
			<path className="fill-moa-light-base" fillOpacity={1} d="M 40 20 C 40 31.046875 31.046875 40 20 40 C 8.953125 40 0 31.046875 0 20 C 0 8.953125 8.953125 0 20 0 C 31.046875 0 40 8.953125 40 20 Z M 40 20 "/>
			<path className="fill-moa-white dark:fill-moa-gray-100" fillOpacity={1} d="M 27.921875 11.484375 L 20.148438 19.253906 L 19.917969 19.253906 L 12.148438 11.484375 L 7.65625 11.484375 L 7.65625 29.453125 L 12.148438 29.453125 L 12.148438 20.46875 L 19.800781 28.121094 L 20.269531 28.121094 L 27.921875 20.46875 L 27.921875 29.453125 L 32.414062 29.453125 L 32.414062 11.484375 Z M 27.921875 11.484375 "/>
		</svg>
	)
}

function Header(): React.ReactElement {
	return (
		<div className="
			flex justify-center p-4 
			border-b-[1px] border-b-moa-light-line dark:border-b-moa-dark-line 
			transition duration-moa-base hover:border-b-moa-light-line-hover dark:hover:border-b-moa-dark-line-hover"
		>
			<div className='flex items-center space-x-3 cursor-default'>
				<IconLogo />
				<Typography type={TypographyType.header} value={"moaui"} />
			</div>
		</div>
	);
}

export default Header;