import { useSetRecoilState } from 'recoil';
import { selectedMenu } from '../../recoil/atom';
interface ItemProp {
	value: string;
}

Item.defaultProp = {
	value: "undefined"
}

function Item(props: ItemProp) {
	const setSelectedMenu = useSetRecoilState(selectedMenu);

	function onClickHandler() {
		setSelectedMenu(props.value)
	}

	return (
		<div className="
			text-moa-menu-item font-moa-primary text-moa-light-base dark:text-moa-dark-base 
			transition duration-moa-base hover:text-moa-light-base-hover dark:hover:text-moa-dark-base-hover 
			cursor-pointer
			"
			onClick={onClickHandler}
		>
			{props.value}
		</div>
	);
}

export default Item;