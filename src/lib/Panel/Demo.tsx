import Panel from './index';
import TypographyGroupDemo from '../TypographyGroup/Demo';

function Demo() {
	return (
		<>
			<Panel 
				variant='shadow'
				width="100px"
				height="auto"
			>
				<TypographyGroupDemo />
			</Panel>
			<div style={{
				marginTop: '20px'
			}} />
			<Panel 
				variant='strock'
				width="100px"
				height="auto"
			>
				<TypographyGroupDemo />
			</Panel>
		</>
	);
}

export default Demo;