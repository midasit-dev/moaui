import Moaui from "@midasit-dev/moaui-components-v1";/**${comma}*/

const TemplatesSamplesDevToolsUI = () => {
  return (
		<Moaui.Panel variant="shadow2" padding={0} borderRadius='4px' border='1px solid #a7a777a'>
			<Moaui.GuideBox width="inherit" height="inherit" padding={0} borderRadius='0 0 4px 4px'>
				<Moaui.MidasController title={"Plug-in Item Title Sample"} />
				<Moaui.Panel variant='box' relative width={896} height={700}>
					<Moaui.FloatingBox {...{x: 16,y: 16,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.Button {...{variant: 'contained',disabled: false,width: '100px',color: 'negative',loading: false,}}>Test</Moaui.Button>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 192,y: 16,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.Button {...{variant: 'contained',disabled: false,width: '100px',color: 'normal',loading: false,}}>Test2</Moaui.Button>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 544,y: 16,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.Button {...{variant: 'contained',disabled: true,width: '100px',color: 'normal',loading: false,}}>disabled</Moaui.Button>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 720,y: 16,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.Button {...{variant: 'text',disabled: false,width: '100px',color: 'normal',loading: false,}}>Test3</Moaui.Button>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 16,y: 80,width: 336,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true,"row":true,"spacing":1},}}>
						<Moaui.Button {...{variant: 'contained',disabled: false,width: '100px',color: 'normal',loading: false,}}>1</Moaui.Button>
						<Moaui.Button {...{variant: 'contained',disabled: false,width: '100px',color: 'normal',loading: false,}}>2</Moaui.Button>
						<Moaui.Button {...{variant: 'contained',disabled: false,width: '100px',color: 'normal',loading: false,}}>3</Moaui.Button>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 16,y: 144,width: 160,height: 160,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#f1f1f7',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 192,y: 144,width: 160,height: 160,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#FF5733',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 544,y: 144,width: 160,height: 160,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#1976D2',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 720,y: 144,width: 160,height: 160,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#9C27B0',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 16,y: 320,width: 432,height: 360,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#f5f5f7',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 544,y: 80,width: 336,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.DropList {...{width: '200px',value: 1,defaultValue: 1,disabled: false,backgroundColor: 'rgba(76, 175, 80, 0.5)',listWidth: '200px',placeholder: 'placeholder',maxLength: 10,itemList: [["Green_MIDASIT",1],["Civil",2],["Gen",3],["CIM",4]],}}>
						</Moaui.DropList>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 368,y: 16,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.Button {...{variant: 'contained',disabled: false,width: '100px',color: 'negative',loading: true,}}>Test3</Moaui.Button>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 368,y: 80,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit","center":true},}}>
						<Moaui.DropList {...{width: '100px',value: 1,defaultValue: 1,disabled: false,backgroundColor: 'white',listWidth: '100px',placeholder: 'placeholder',maxLength: 10,itemList: [["MidasIT",1],["Civil",2],["Gen",3],["CIM",4]],}}>
						</Moaui.DropList>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 368,y: 144,width: 160,height: 48,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#FFC300',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 368,y: 208,width: 160,height: 96,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#4CAF50',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 464,y: 320,width: 416,height: 360,guideBoxProps: {"width":"inherit","height":"inherit"},}}>
						<Moaui.Panel {...{variant: 'shadow2',width: 'inherit',height: 'inherit',flexItem: false,backgroundColor: '#f5f5f7',borderRadius: '5px',border: 'none',relative: false,}}>
						</Moaui.Panel>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 32,y: 336,width: 400,height: 328,guideBoxProps: {"width":"inherit","height":"inherit","spacing":2,"center":true},}}>
						<Moaui.TextField {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Section Name',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: 'Value',wrappedWidth: '300px',width: '200px',height: '30px',spacing: 1,textAlign: 'left',multiline: false,rows: 1,maxRows: 1,}}>
						</Moaui.TextField>
						<Moaui.TextField {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Material Name',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: 'Value',wrappedWidth: '300px',width: '200px',height: '30px',spacing: 1,textAlign: 'left',multiline: false,rows: 1,maxRows: 1,}}>
						</Moaui.TextField>
						<Moaui.TextField {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Rebar Name',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: 'Value',wrappedWidth: '300px',width: '200px',height: '30px',spacing: 1,textAlign: 'left',multiline: false,rows: 1,maxRows: 1,}}>
						</Moaui.TextField>
						<Moaui.TextField {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Pile Name',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: 'Value',wrappedWidth: '300px',width: '200px',height: '30px',spacing: 1,textAlign: 'left',multiline: false,rows: 1,maxRows: 1,}}>
						</Moaui.TextField>
						<Moaui.TextField {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'User Name',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: 'Value',wrappedWidth: '300px',width: '200px',height: '30px',spacing: 1,textAlign: 'left',multiline: false,rows: 1,maxRows: 1,}}>
						</Moaui.TextField>
					</Moaui.FloatingBox>
					<Moaui.FloatingBox {...{x: 480,y: 336,width: 384,height: 328,guideBoxProps: {"width":"inherit","height":"inherit","spacing":2,"center":true},}}>
						<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Sect ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '200px',titleXs: 3,inputXs: 9,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
						</Moaui.TextFieldV2>
						<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Matl ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '200px',titleXs: 3,inputXs: 9,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
						</Moaui.TextFieldV2>
						<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Rebar ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '200px',titleXs: 3,inputXs: 9,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
						</Moaui.TextFieldV2>
						<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'Pile ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '200px',titleXs: 3,inputXs: 9,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
						</Moaui.TextFieldV2>
						<Moaui.TextFieldV2 {...{autoFocus: false,type: 'text',placeholder: 'Placeholder',title: 'User ID',titlePosition: 'left',defaultValue: 'Default Value',error: false,disabled: false,value: '',width: '200px',titleXs: 3,inputXs: 9,height: '30px',textAlign: 'left',multiline: false,rows: 1,maxRows: 1,gap: 1,inputAlign: 'left',singleLineTitle: false,}}>
						</Moaui.TextFieldV2>
					</Moaui.FloatingBox>
				</Moaui.Panel>
			</Moaui.GuideBox>
		</Moaui.Panel>
  );
}; /**${comma}*/

export default TemplatesSamplesDevToolsUI;
