import React from 'react';
import { CodeBlock, Color } from "@midasit-dev/moaui";
import ButtonAlertMessage from './Guide/ButtonAlertMessage';
import ButtonApiGet from './Guide/ButtonApiGet';
import ButtonSnackbar from './Guide/ButtonSnackbar';

function App() {
	return (
		<>
			<div style={backgroundStyle} />
			<div style={outlineStyle}>
				<img style={imgStyle} src="./SVG/m_circle.svg" alt="Midas IT" />
				<p style={pStyle}>Enjoy, moaui components</p>
				<div style={{...centerStyle, marginBottom: 15}}><ButtonSnackbar /></div>
				<p style={pStyle2}>🌻 Python Execution Testing</p>
				<div style={{...centerStyle, marginBottom: 15}}><ButtonAlertMessage /></div>
				<div style={{...centerStyle, marginBottom: 15}}><ButtonApiGet /></div>
				<p style={pStyle2}>❄️ React Render Testing</p>
				<p style={pStyle2_1}>Copy and paste to src/App.tsx and save reload this page.</p>
				<div style={{ opacity: 0.95, }} >
					<CodeBlock title="Sample Code" language='typescript'>
						{sampleCompDataGridSet}
					</CodeBlock>
				</div>
				<a href="https://dev--6556d17f924e868b000ddaf5.chromatic.com/" target="_blank" rel="noopener noreferrer"><p style={pStyle3}>Learn moaui</p></a>
			</div>
		</>
	);
}

export default App;

const sampleCompDataGridSet = `import React from 'react';
import DataGridSet from './SampleComponents/DataGridSet';

function App() {
	return <DataGridSet />;
}

export default App;`
const centerStyle: any = {
	display: 'flex',
	justifyContent: 'center',
}

const backgroundStyle: any = {
	position: 'absolute',
	top: '0px',
	left: '0px',
	width: '100%',
	height: '100%',
	backgroundColor: Color.primary.enable,
}

const widthValue = 600;
const heightValue = 830;
const outlineStyle: any = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	width: widthValue,
	height: heightValue,
	marginTop: -(heightValue * 0.5),
	marginLeft: -(widthValue * 0.5),
}

const imgStyle: any = {
	display: 'block',
	margin: '0 auto',
	width: '350px',
	height: '150px',
}

const pStyle: any = {
	fontSize: '30px',
	textAlign: 'center',
	color: Color.text.secondary,
	marginBottom: '15px',
}

const pStyle2: any = {
	fontSize: '20px',
	textAlign: 'center',
	color: Color.text.third,
	paddingTop: '15px',
	marginBottom: '20px',
}

const pStyle2_1: any = {
	fontSize: '15px',
	textAlign: 'center',
	color: Color.text.third,
	marginTop: '-10px',
	marginBottom: '20px',
}

const pStyle3: any = {
	fontSize: '20px',
	textAlign: 'center',
	color: Color.secondary.main,
	marginBottom: '40px',
	textDecoration: 'underline',
}