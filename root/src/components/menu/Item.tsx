interface ItemProp {
	value: string;
}
Item.defaultProp = {
	value: "undefined"
}
function Item(props: ItemProp) {
	return (
		<div className="
			text-moa-menu-item font-moa-primary text-moa-light-base dark:text-moa-dark-base 
			transition duration-moa-base hover:text-moa-light-base-hover dark:hover:text-moa-dark-base-hover 
			cursor-pointer
		">
			{props.value}
		</div>
	);
}

export default Item;