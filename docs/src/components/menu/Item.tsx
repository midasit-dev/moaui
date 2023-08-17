import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedMenu } from '../../recoil/atom';
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Font from "@midasit-dev/moaui/dist/Font"
import { Box } from "@mui/material";
// import Seperetor from "@midas-ui/dist/";
interface ItemProp {
	value: string;
}

Item.defaultProp = {
	value: "undefined"
}

function Item(props: ItemProp) {
	const [isSelected, setIsSelected] = React.useState(false);
	const [selecteMenu, setSelectedMenu] = useRecoilState(selectedMenu);

	React.useEffect(()=>{
		if(selecteMenu !== props.value){
			setIsSelected(false);
		}
		else setIsSelected(true);
	}, [selecteMenu])

	function onClickHandler() {
		setSelectedMenu(props.value);
	}
	// <div className={`
	// 	text-moa-menu-item font-moa-primary ${isSelected ? `#4B9AF4` : `text-moa-light-base` } dark:text-moa-dark-base 
	// 	transition duration-moa-base hover:text-moa-light-base-hover dark:hover:text-moa-dark-base-hover 
	// 	cursor-pointer`}

	const MenuButton = styled(Button)(({ theme }) => ({
		display:"flex",
		color: isSelected ? '#000000' : '#343A40',
		backgroundColor: isSelected ? '#98ceed' : '#FFFFFF',
		'&:hover': {
		  backgroundColor: '#bddff2',
		},
		width: '80%',
		padding: '0.2rem',
		float: 'left',
		alignItems:"center",
		...Font.defaultFontSet,
		textTransform: 'none'
	}));

	const StyledBox = styled(Box)(({ theme }) => ({
		borderLeft : isSelected ? `2px solid #30a9f0` : '1px solid #c5d0d1',
		width : "100%",
		height: "1.9rem",
		paddingLeft: "0.1rem",
		paddingBottom:"2rem",		
	}));

	return (
		<StyledBox >
			<MenuButton onClick={onClickHandler}>
				{props.value}
			</MenuButton>
		</StyledBox>
	);
}

export default Item;