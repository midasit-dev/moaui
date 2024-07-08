import Moaui from "@midasit-dev/moaui";
import { useState } from 'react';

const nodeGraphData = [
	{"id": "dot1", "data":  [{"x": 1, "y": 1}]},
	{"id": "dot2", "data":  [{"x": 2, "y": 2}]},
	{"id": "dot3", "data":  [{"x": 3, "y": 3}]},
];

const NodeGraph = () => {
	const [data, ] = useState(nodeGraphData);
	return (
		<Moaui.ScatterPlot 
			data={data}
			height='inherit'
			margin={{ top: 50, right: 50, bottom: 50, left: 50, }}
			nodeSize={{ key: 'data.x', values: [0, 2], sizes: [8, 32] }}
			axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "X", legendPosition: "middle", legendOffset: 40, truncateTickAt: 0, }}
			axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Y", legendPosition: "middle", legendOffset: -40, truncateTickAt: 0, }}
		/>
	)
}

const wrapStyles = { show: true, fill: '#f5f5f7', border: '1px solid #d1d1d1', borderRadius: 1, width: 'inherit', height: 'inherit' };

const TemplatesSamplesNodeAPI: React.FC = () => {
  return (
		<Moaui.Panel variant='box' relative width={896} height={808}>

			<Moaui.FloatingBox {...{x: 0,y: 0,width: 240,height: 296, guideBoxProps: wrapStyles}} />
			<Moaui.FloatingBox {...{x: 352,y: 0,width: 240,height: 296, guideBoxProps: wrapStyles}} />
			<Moaui.FloatingBox {...{x: 0,y: 312,width: 896,height: 496, guideBoxProps: wrapStyles}} />
			<Moaui.FloatingBox {...{x: 704,y: 0,width: 192,height: 296, guideBoxProps: wrapStyles}} />

			<Moaui.FloatingBox {...{x: 16,y: 16,width: 208,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<Moaui.Typography variant='h1' size='large'>POST</Moaui.Typography>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 16,y: 72,width: 208,height: 160,guideBoxProps: {"spacing":1,"center":true,"width":"inherit","height":"inherit"},}}>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'add value ...',title: 'X',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'add value ...',title: 'Y',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'add value ...',title: 'Z',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 16,y: 240,width: 208,height: 40,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<Moaui.Button {...{variant: 'contained',disabled: false,width: 'auto',color: 'negative',loading: false,}}>POST (Add)</Moaui.Button>
			</Moaui.FloatingBox>

			<Moaui.FloatingBox {...{x: 368,y: 16,width: 208,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<Moaui.Typography variant='h1' size='large'>PUT</Moaui.Typography>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 368,y: 72,width: 208,height: 160,guideBoxProps: {"width":"inherit","height":"inherit","center":true,"spacing":1},}}>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'mod value ...',title: 'ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'mod value ...',title: 'X',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'mod value ...',title: 'Y',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'mod value ...',title: 'Z',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 1,inputXs: 11,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
				</Moaui.TextFieldV2>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 368,y: 240,width: 208,height: 40,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<Moaui.Button {...{variant: 'contained',disabled: false,width: 'auto',color: 'negative',loading: false,}}>PUT (Modify)</Moaui.Button>
			</Moaui.FloatingBox>

			<Moaui.FloatingBox {...{x: 720,y: 16,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<Moaui.Typography variant='h1' size='large'>DELETE</Moaui.Typography>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 720,y: 72,width: 160,height: 160,guideBoxProps: {"width":"inherit","height":"inherit","spacing":1,"horRight":true,"center":true},}}>
				<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'input id ...',title: 'ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '150px',titleXs: 2,inputXs: 10,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}} />
				<Moaui.Button {...{variant: 'contained',disabled: false,width: 'auto',color: 'negative',loading: false,}}>DELETE</Moaui.Button>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 720,y: 240,width: 160,height: 40,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<Moaui.Button {...{variant: 'contained',disabled: false,width: 'auto',color: 'negative',loading: false,}}>DELETE (All)</Moaui.Button>
			</Moaui.FloatingBox>

			<Moaui.FloatingBox {...{x: 16,y: 328,width: 864,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","row":true,"horSpaceBetween":true,"verCenter":true},}}>
				<Moaui.Typography variant='h1' size='large'>GET</Moaui.Typography>
				<Moaui.Button {...{variant: 'contained',disabled: false,width: 'auto',color: 'negative',loading: false,}}>GET (Get)</Moaui.Button>
			</Moaui.FloatingBox>
			<Moaui.FloatingBox {...{x: 16,y: 384,width: 864,height: 400,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
				<NodeGraph />
			</Moaui.FloatingBox>

		</Moaui.Panel>
  );
};

export default TemplatesSamplesNodeAPI;
