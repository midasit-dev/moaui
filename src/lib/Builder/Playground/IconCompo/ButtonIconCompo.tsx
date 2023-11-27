import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
// import { ReactComponent as ButtonIcon } from "../svg/Button.svg";

export default function ButtonIconCompo(): React.ReactElement {
	const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BUTTON,
		item: {type:ItemTypes.BUTTON},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

	const ButtonSvg = () => {
		return (
			<svg width="130" height="30" viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="0.5" width="128" height="27" rx="3.5" fill="#EEEEEE"/>
			<path d="M21.1855 18V9.51562H24.291C26.0957 9.51562 26.9746 10.4883 26.9746 11.7422C26.9746 12.7969 26.3301 13.3359 25.5449 13.5352V13.6172C26.3887 13.6641 27.3027 14.4023 27.3027 15.7148C27.3027 17.0156 26.4121 18 24.4316 18H21.1855ZM24.3145 16.8984C25.5332 16.8984 26.0254 16.3594 26.0254 15.6562C26.0254 14.8477 25.3809 14.1914 24.3613 14.1914H22.4746V16.8984H24.3145ZM24.1855 13.1836C25.041 13.1836 25.709 12.6562 25.709 11.8477C25.709 11.1445 25.2285 10.6172 24.209 10.6172H22.4746V13.1836H24.1855ZM32.623 15.3516V11.6367H33.8652V18H32.6465V16.8984H32.5762C32.2832 17.5781 31.627 18.082 30.6777 18.082C29.4473 18.082 28.5801 17.2617 28.5801 15.6797V11.6367H29.834V15.5273C29.834 16.3945 30.3613 16.9453 31.123 16.9453C31.8145 16.9453 32.623 16.4414 32.623 15.3516ZM38.3652 11.6367V12.6328H37.0645V16.125C37.0645 16.8398 37.4277 16.9688 37.8262 16.9805C38.002 16.9805 38.2832 16.957 38.459 16.9453V18.0352C38.2832 18.0586 38.0137 18.082 37.6738 18.082C36.6895 18.082 35.8105 17.543 35.8223 16.3828V12.6328H34.8848V11.6367H35.8223V10.1133H37.0645V11.6367H38.3652ZM42.5605 11.6367V12.6328H41.2598V16.125C41.2598 16.8398 41.623 16.9688 42.0215 16.9805C42.1973 16.9805 42.4785 16.957 42.6543 16.9453V18.0352C42.4785 18.0586 42.209 18.082 41.8691 18.082C40.8848 18.082 40.0059 17.543 40.0176 16.3828V12.6328H39.0801V11.6367H40.0176V10.1133H41.2598V11.6367H42.5605ZM46.4043 18.1289C44.5996 18.1289 43.4277 16.8164 43.4277 14.8477C43.4277 12.8672 44.5996 11.5547 46.4043 11.5547C48.1973 11.5547 49.3691 12.8672 49.3691 14.8477C49.3691 16.8164 48.1973 18.1289 46.4043 18.1289ZM46.4043 17.0859C47.5527 17.0859 48.1035 16.0664 48.1035 14.8477C48.1035 13.6289 47.5527 12.5859 46.4043 12.5859C45.2324 12.5859 44.6816 13.6289 44.6816 14.8477C44.6816 16.0664 45.2324 17.0859 46.4043 17.0859ZM51.8535 14.2266V18H50.5996V11.6367H51.8066V12.6797H51.877C52.1816 12 52.8027 11.5547 53.752 11.5547C55.0645 11.5547 55.9199 12.375 55.9199 13.957V18H54.6777V14.1094C54.6777 13.1836 54.1738 12.6328 53.3301 12.6328C52.4746 12.6328 51.8535 13.207 51.8535 14.2266Z" fill="#1F2937"/>
			<rect x="0.5" y="0.5" width="128" height="27" rx="3.5" stroke="#C4C6C8"/>
			</svg>
		)
	}

	return (
		<div 
			ref={drag}
			style={{
				width: '100%',
        cursor: 'grab',
				opacity: isDragging ? 0.5 : 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ButtonSvg />
		</div>
	)
}