import React from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedMenu } from '../../recoil/atom';
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
// import Seperetor from "@midas-ui/dist/";
interface ItemProp {
	value: string;
}

Item.defaultProp = {
	value: "undefined"
}

function Item(props: ItemProp) {
	const [isSelected, setIsSelected] = React.useState(false);
	const setSelectedMenu = useSetRecoilState(selectedMenu);

	function onClickHandler() {
		setSelectedMenu(props.value);
		setIsSelected(!isSelected);
	}
	// <div className={`
	// 	text-moa-menu-item font-moa-primary ${isSelected ? `#4B9AF4` : `text-moa-light-base` } dark:text-moa-dark-base 
	// 	transition duration-moa-base hover:text-moa-light-base-hover dark:hover:text-moa-dark-base-hover 
	// 	cursor-pointer`}

	const MenuButton = styled(Button)(({ theme }) => ({
		color: '#343A40',
		backgroundColor: '#FFFFFF',
		'&:hover': {
		  backgroundColor: '#bad7f5',
		},
		width: '80%',
		padding: '0.2rem',
		float: 'left',
	}));

	return (
		<MenuButton onClick={onClickHandler}>
			{props.value}
		</MenuButton>
	);
}

export default Item;