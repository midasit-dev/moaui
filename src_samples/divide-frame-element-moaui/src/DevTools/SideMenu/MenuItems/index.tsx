import * as React from "react";
import { motion } from "framer-motion";
import MenuHome from "./MenuHome";
import MenuPlayground from "./MenuPlayground";
import { useRecoilValue } from "recoil";
import { CurrentMenuState } from "../../recoilState";
import SubMenuSchemaSave from "./MenuPlayground/SubMenuItems/SchemaSave";
import SubMenuSchemaLoad from "./MenuPlayground/SubMenuItems/SchemaLoad";
import SubMenuCodeSave from "./MenuPlayground/SubMenuItems/CodeSave";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const MenuItems = (props: any) => {
	const { ulRef, isOpen, toggle } = props;
	const currentMenuState = useRecoilValue(CurrentMenuState);

  return (
    <motion.ul
			ref={ulRef}
      variants={variants}
      className="m-0 p-[25px] absolute top-[100px] w-[300x]"
    >
      <MenuHome toggle={toggle} />
      <MenuPlayground toggle={toggle} />
      {isOpen && currentMenuState === "Playground" && (
        <div className="ml-10">
          <SubMenuSchemaSave />
          <SubMenuSchemaLoad />
          <SubMenuCodeSave />
        </div>
      )}
    </motion.ul>
  );
};

export default MenuItems;