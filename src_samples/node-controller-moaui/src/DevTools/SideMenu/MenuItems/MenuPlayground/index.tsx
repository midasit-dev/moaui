import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { SvgHome } from '../../Svg';
import { useSetRecoilState } from 'recoil';
import { CurrentMenuState } from '../../../recoilState';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const App = (props: any) => {
	const { toggle } = props;

	const setCurrentMenu = useSetRecoilState(CurrentMenuState);
	const onClickHandler = useCallback(() => {
		setCurrentMenu('Playground');
		toggle();
	}, [setCurrentMenu, toggle]);

	return (
		<motion.li
			variants={variants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			className='m-0 p-0 list-none mb-5 flex items-center cursor-pointer'
			onClick={onClickHandler}
		>
			<div className='w-10 h-10 flex-[40px 0] items-center cursor-pointer mr-5'>
				<SvgHome color='#fff' />
			</div>
			<p className='flex-[1] text-[#fff] text-xl'>Playground</p>
		</motion.li>
	);
};

export default App;
