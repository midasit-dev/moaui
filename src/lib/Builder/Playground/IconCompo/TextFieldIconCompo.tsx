import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
// import { ReactComponent as TextFieldIcon } from "../svg/TextField.svg";

export default function TextFieldIconCompo(): React.ReactElement {
	const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXTFIELD,
		item: {type:ItemTypes.TEXTFIELD},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

	const TextFieldSvg = () => {
		return (
			<svg width="130" height="30" viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="0.5" width="128" height="27" rx="3.5" fill="white"/>
			<path d="M10.9376 18V9.51562H13.8204C15.8126 9.51562 16.7149 10.6992 16.7149 12.2109C16.7149 13.7109 15.8126 14.918 13.8321 14.918H11.9922V18H10.9376ZM11.9922 13.9805H13.7852C15.1329 13.9805 15.6719 13.2188 15.6719 12.2109C15.6719 11.1914 15.1329 10.4531 13.7735 10.4531H11.9922V13.9805ZM19.0704 9.51562V18H18.0626V9.51562H19.0704ZM20.3712 16.1953C20.3712 14.7305 21.6602 14.4023 22.7618 14.3203C23.1661 14.291 24.1973 14.2383 24.4844 14.2266V13.7109C24.4844 12.9023 24.004 12.4336 23.043 12.4336C22.2344 12.4336 21.754 12.8086 21.6133 13.2891H20.5587C20.6876 12.2695 21.6837 11.5547 23.0899 11.5547C23.9219 11.5547 25.4805 11.8008 25.4805 13.8047V18H24.4844V17.1328H24.4376C24.2266 17.5664 23.6407 18.1523 22.5391 18.1523C21.3321 18.1523 20.3712 17.4375 20.3712 16.1953ZM21.379 16.2422C21.379 16.9102 21.9415 17.25 22.7149 17.25C23.8516 17.25 24.4844 16.4883 24.4844 15.6914V15.0469C24.1856 15.0703 23.1837 15.1465 22.879 15.1641C21.9649 15.2227 21.379 15.5508 21.379 16.2422ZM29.6993 18.1289C27.8946 18.1289 26.793 16.7578 26.793 14.8477C26.793 12.9141 27.9415 11.5547 29.6758 11.5547C31.0352 11.5547 32.043 12.3516 32.2071 13.5586H31.1993C31.0587 12.9727 30.543 12.4453 29.6993 12.4453C28.5626 12.4453 27.8008 13.3828 27.8008 14.8125C27.8008 16.2891 28.5391 17.2266 29.6993 17.2266C30.4493 17.2266 31.0235 16.8281 31.1993 16.125H32.2071C32.043 17.2617 31.1172 18.1289 29.6993 18.1289ZM36.1212 18.1289C34.2813 18.1289 33.1446 16.8281 33.1446 14.8711C33.1446 12.9141 34.293 11.5547 36.0274 11.5547C37.3633 11.5547 38.7696 12.375 38.7696 14.7305V15.1523H34.1524C34.1993 16.5 34.9844 17.2383 36.1212 17.2383C36.8829 17.2383 37.3633 16.9102 37.5977 16.5117H38.6758C38.3712 17.4727 37.4337 18.1289 36.1212 18.1289ZM34.1641 14.2969H37.7501C37.7501 13.2305 37.0704 12.4453 36.0274 12.4453C34.9258 12.4453 34.2227 13.3125 34.1641 14.2969ZM41.0899 14.1797V18H40.0821V9.51562H41.0899V12.6328H41.1719C41.4649 11.9766 42.0391 11.5547 43.0469 11.5547C44.3477 11.5547 45.2149 12.3281 45.2149 13.957V18H44.2071V14.0273C44.2071 13.0312 43.6563 12.457 42.7422 12.457C41.793 12.457 41.0899 13.0781 41.0899 14.1797ZM49.4337 18.1289C47.6993 18.1289 46.5274 16.8281 46.5274 14.8477C46.5274 12.8672 47.6993 11.5547 49.4337 11.5547C51.1563 11.5547 52.3165 12.8672 52.3165 14.8477C52.3165 16.8281 51.1563 18.1289 49.4337 18.1289ZM49.4337 17.2383C50.711 17.2383 51.3087 16.1133 51.3087 14.8477C51.3087 13.582 50.711 12.4453 49.4337 12.4453C48.1329 12.4453 47.5352 13.582 47.5352 14.8477C47.5352 16.1133 48.1329 17.2383 49.4337 17.2383ZM54.6485 9.51562V18H53.6407V9.51562H54.6485ZM58.6563 18.1289C57.0743 18.1289 55.9493 16.8516 55.9493 14.8359C55.9493 12.8203 57.0743 11.5547 58.668 11.5547C59.8985 11.5547 60.2969 12.3047 60.5079 12.6445H60.5782V9.51562H61.5977V18H60.6133V17.0273H60.5079C60.2852 17.3789 59.8751 18.1289 58.6563 18.1289ZM58.7969 17.2266C59.9571 17.2266 60.6133 16.2422 60.6133 14.8125C60.6133 13.4062 59.9805 12.457 58.7969 12.457C57.5782 12.457 56.9688 13.4883 56.9688 14.8125C56.9688 16.1719 57.5899 17.2266 58.7969 17.2266ZM66.0157 18.1289C64.1758 18.1289 63.0391 16.8281 63.0391 14.8711C63.0391 12.9141 64.1876 11.5547 65.9219 11.5547C67.2579 11.5547 68.6641 12.375 68.6641 14.7305V15.1523H64.0469C64.0938 16.5 64.879 17.2383 66.0157 17.2383C66.7774 17.2383 67.2579 16.9102 67.4922 16.5117H68.5704C68.2657 17.4727 67.3282 18.1289 66.0157 18.1289ZM64.0587 14.2969H67.6446C67.6446 13.2305 66.9649 12.4453 65.9219 12.4453C64.8204 12.4453 64.1172 13.3125 64.0587 14.2969ZM69.9766 18V11.6367H70.9493V12.6094H71.0196C71.254 11.9648 71.9102 11.5312 72.6602 11.5312C72.8126 11.5312 73.0704 11.543 73.1876 11.5547V12.5742C73.1172 12.5508 72.836 12.5039 72.5782 12.5039C71.6641 12.5039 70.9844 13.1367 70.9844 13.9922V18H69.9766ZM79.961 11.6367V12.4805H78.6251V16.1719C78.6251 16.9922 79.0235 17.1211 79.4571 17.1211C79.6446 17.1211 79.9024 17.1094 80.0547 17.0977V18.0352C79.9024 18.0586 79.6446 18.082 79.3516 18.082C78.5079 18.082 77.6055 17.5547 77.6055 16.4297V12.4805H76.6446V11.6367H77.6055V10.1133H78.6251V11.6367H79.961ZM83.8633 18.1289C82.0235 18.1289 80.8868 16.8281 80.8868 14.8711C80.8868 12.9141 82.0352 11.5547 83.7696 11.5547C85.1055 11.5547 86.5118 12.375 86.5118 14.7305V15.1523H81.8946C81.9415 16.5 82.7266 17.2383 83.8633 17.2383C84.6251 17.2383 85.1055 16.9102 85.3399 16.5117H86.418C86.1133 17.4727 85.1758 18.1289 83.8633 18.1289ZM81.9063 14.2969H85.4922C85.4922 13.2305 84.8126 12.4453 83.7696 12.4453C82.668 12.4453 81.9649 13.3125 81.9063 14.2969ZM88.4219 11.6367L89.9219 14.2266L91.4337 11.6367H92.5938L90.543 14.8125L92.5938 18H91.4454L89.9219 15.5391L88.4219 18H87.2618L89.2657 14.8125L87.2618 11.6367H88.4219ZM96.5899 11.6367V12.4805H95.254V16.1719C95.254 16.9922 95.6524 17.1211 96.086 17.1211C96.2735 17.1211 96.5313 17.1094 96.6837 17.0977V18.0352C96.5313 18.0586 96.2735 18.082 95.9805 18.082C95.1368 18.082 94.2344 17.5547 94.2344 16.4297V12.4805H93.2735V11.6367H94.2344V10.1133H95.254V11.6367H96.5899Z" fill="#4B5563"/>
			<rect x="0.5" y="0.5" width="128" height="27" rx="3.5" stroke="#C4C6C8"/>
			</svg>
		)
	}

	return (
		<div 
			ref={drag}
			style={{
        cursor: 'grab',
				opacity: isDragging ? 0.5 : 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<TextFieldSvg />
		</div>
	)
}