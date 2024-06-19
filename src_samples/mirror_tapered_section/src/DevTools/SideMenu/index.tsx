import * as React from 'react';
import { useRef, useEffect } from 'react';
import { motion, useCycle, type MotionStyle } from 'framer-motion';
import { useDimensions } from './use-dimensions';
import { MenuToggle } from './MenuToggle';
import MenuItems from './MenuItems';
import { ZINDEX } from '@midasit-dev/playground';

const styleNav = {
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	width: '300px',
} as MotionStyle;

const styleBackground = {
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	width: '300px',
} as MotionStyle;

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 30px 30px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: 'circle(0px at 30px 30px)',
		transition: {
			delay: 0.5,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
};

const SideMenu = (props: any) => {
	const { sideMenuRef } = props;

	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef<HTMLDivElement>(null);
	const { height } = useDimensions(containerRef);

	useEffect(() => {
		if (!isOpen && containerRef.current && sideMenuRef.current) {
			// list 닫혔을 대
			// delay를 0.5초 줘서 zIndex를 100으로 변경한다.
			setTimeout(() => {
				if (containerRef.current) containerRef.current.style.zIndex = ZINDEX.zindex_navbar_closed.toString();
				if (sideMenuRef.current) sideMenuRef.current.style.zIndex = ZINDEX.zindex_navbar_closed.toString();
			}, 800);
		} else {
			// list 열렸을 때
			if (containerRef.current) containerRef.current.style.zIndex = ZINDEX.zindex_navbar_opend.toString();
			if (sideMenuRef.current) sideMenuRef.current.style.zIndex = ZINDEX.zindex_navbar_opend.toString();
		}
	}, [isOpen, sideMenuRef]);

	return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      style={{
        ...styleNav,
      }}
    >
      <motion.div
        variants={sidebar}
        style={styleBackground}
        className="bg-pg-black-medium"
      />
      <MenuItems isOpen={isOpen} toggle={toggleOpen} />

      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default SideMenu;
