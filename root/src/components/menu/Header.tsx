interface HeaderProp {
	value: string;
}
Header.defaultProp = {
	value: 'undefined'
}
function Header(props: HeaderProp) {
	return (
		<div className="
			text-moa-menu-header font-moa-primary text-moa-light-base dark:text-moa-dark-base
		">
			{props.value}
		</div>
	);
}

export default Header;