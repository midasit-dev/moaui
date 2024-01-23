/**
 * 
 *  ██╗      ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
 * ███║      ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
 * ╚██║█████╗██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝ 
 *  ██║╚════╝██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗ 
 *  ██║      ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
 *  ╚═╝      ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
 * 
 * @description Entry point for the application
 * @next ./src/Wrapper.tsx
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import Wrapper from './Wrapper';
import './overrideMidasController';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.Fragment>
		<Wrapper />
	</React.Fragment>
);
