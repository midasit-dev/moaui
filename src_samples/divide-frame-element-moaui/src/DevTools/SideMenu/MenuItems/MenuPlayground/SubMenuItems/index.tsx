import * as React from 'react';
import { motion } from 'framer-motion';
import SchemaDownload from './SchemaSave';
import SchemaUpload from './SchemaLoad';
import CodeDownload from './CodeSave';

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const Navigation = () => (
	<motion.ul variants={variants} className='m-0 p-[25px] absolute top-[100px] w-[300x]'>
		<SchemaDownload />
		<SchemaUpload />
		<CodeDownload />
	</motion.ul>
);
