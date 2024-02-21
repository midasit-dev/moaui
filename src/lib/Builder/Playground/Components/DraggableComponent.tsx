import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../Components/ItemTypes';
import { GuideBox } from '../../..';

const CustomStyled = (isDragging: boolean) => {
	return {
		width: '100%',
		cursor: 'grab',
		opacity: isDragging ? 0.5 : 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'left',
		padding: '10px 0px 10px 10px',
		borderBottom: '1px solid #e9e9e9',
		color: isDragging ? '#000080' : '#000000',
		background: isDragging ? '#e9e9e9' : '#ffffff',
	}
}

const CustomDraggableComponent = (props: any) => {
	const itemType = props.itemType || "Invalid";

	const [{ isDragging }, drag] = useDrag({
    type: itemType,
		item: { type: itemType },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

	return (
		<div 
			draggable={true}
			onDragStart={(e) => {e.dataTransfer.setData("type", itemType)}}
			ref={drag}
			style={CustomStyled(isDragging)}
		>
			{props.children}
		</div>
	)
}

const VerifyDialogCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="super" fill='2' itemCenter itemSpacing={0}>
			<div style={{ 
				width: 200, 
				height: 30, 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				margin: '15 0 10 0',
			}}>
				<h4>AUTHENTICATION</h4>
			</div>
			<div style={{ 
				width: 200, 
				height: 10,
				borderTop: '1px solid #bdbebd',
				background: 'linear-gradient(#e9e9e9, #fff)',
				marginBottom: '5px'
			}} />
		</GuideBox>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>VerifyDialog</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.VerifyDialogDefault}>Default</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.VerifyDialogLoading}>Loading</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const AlertCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="super" fill='2' itemCenter itemSpacing={0}>
			<div style={{ 
				width: 200, 
				height: 30, 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				margin: '15 0 10 0',
			}}>
				<h4>COMPONENTS</h4>
			</div>
			<div style={{ 
				width: 200, 
				height: 10,
				borderTop: '1px solid #bdbebd',
				background: 'linear-gradient(#e9e9e9, #fff)',
				marginBottom: '5px'
			}} />
		</GuideBox>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Alert</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.AlertError}>Error</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ButtonCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Button</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ButtonComposite}>Composite</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonContained}>Contained</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonLoading}>Loading</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonNegative}>Negative</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonNormal}>Normal</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonOutlined}>Outlined</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonText}>Text</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ButtonWidth}>Width</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ChartLineCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>ChartLine</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ChartLineAxisLegend}>AxisLegend</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ChartLineAxisPointSize}>AxisPointSize</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ChartLineAxisTopRight}>AxisTopRight</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ChartLineDecimals}>Decimals</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const CheckCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Check</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.CheckDisabled}>Disabled</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CheckNotRequired}>NotRequired</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CheckRequired}>Required</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const CheckGroupCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>CheckGroup</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.CheckGroupStateful}>Stateful</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CheckGroupUnControlled}>UnControlled</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ChipCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Chip</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ChipDefault}>Default</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const CodeBlockCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>CodeBlock</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.CodeBlockBackgroundColor}>BackgroundColor</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CodeBlockJavascript}>Javascript</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CodeBlockLanguage}>Language</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CodeBlockPadding}>Padding</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.CodeBlockTypescript}>Typescript</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const DataGridCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>DataGrid</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.DataGridPagination}>Pagination</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const DialogCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Dialog</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.DialogDialogButton}>DialogButton</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DialogHelpButton}>HelpButton</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DialogHelpIconButton}>HelpIconButton</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DialogHiddenClose}>HiddenClose</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DialogOnClose}>OnClose</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const DropListCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>DropList</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.DropListDisabled}>Disabled</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DropListDropdown}>Dropdown</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DropListItemListFromArray}>ItemListFromArray</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DropListListWidth}>ListWidth</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DropListMaxLength}>MaxLength</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const FloatingBoxCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>FloatingBox</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.FloatingBoxClassName}>ClassName</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.FloatingBoxGuideBoxProps}>GuideBoxProps</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.FloatingBoxMouseEvents}>MouseEvents</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.FloatingBoxWithPanel}>WithPanel</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const GridCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Grid</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.GridColumn}>Column</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GridItems}>Items</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GridRow}>Row</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const GuideBoxCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>GuideBox</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxBasic300x300}>Basic300x300</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxEmpty}>Empty</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxFlexGrow}>FlexGrow</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout1}>Layout1</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout2}>Layout2</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout3}>Layout3</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout4}>Layout4</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout5}>Layout5</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxLoading}>Loading</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxOnKeyDown}>OnKeyDown</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxOpacity}>Opacity</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxOverflow}>Overflow</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxPulse}>Pulse</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxRowDirection}>RowDirection</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.GuideBoxSpaceBetween}>SpaceBetween</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const IconCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Icon</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.IconAdd}>Add</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.IconClose}>Close</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.IconToButton}>ToButton</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const IconButtonCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>IconButton</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.IconButtonAdd}>Add</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.IconButtonClose}>Close</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.IconButtonTransparent}>Transparent</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.IconButtonWithName}>WithName</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ListCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>List</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ListControlled}>Controlled</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ListDynamic}>Dynamic</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ListTypographyRadio}>TypographyRadio</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ListUnControlled}>UnControlled</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ListItemCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>ListItem</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ListItemDefault}>Default</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ListItemButtonCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>ListItemButton</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ListItemButtonDefault}>Default</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const MidasControllerCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>MidasController</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.MidasControllerTitle}>Title</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const PanelCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Panel</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.PanelBorder}>Border</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelBox}>Box</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelPadding0}>Padding0</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelShadow}>Shadow</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelShadow2}>Shadow2</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelStrock}>Strock</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelTypographyDropList}>TypographyDropList</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.PanelTypographyTextField}>TypographyTextField</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const RadioCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Radio</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.RadioName}>Name</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const RadioGroupCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>RadioGroup</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.RadioGroupControlled}>Controlled</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.RadioGroupUnControlled}>UnControlled</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const ScrollbarsCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Scrollbars</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.ScrollbarsCheckGroup}>CheckGroup</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.ScrollbarsList}>List</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const SeparatorCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Separator</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.SeparatorHorizontal}>Horizontal</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.SeparatorVertical}>Vertical</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const StackCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Stack</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.StackColumn}>Column</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.StackRow}>Row</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const SwitchCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Switch</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.SwitchLabel}>Label</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const SwitchGroupCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>SwitchGroup</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.SwitchGroupControlled}>Controlled</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.SwitchGroupUnControlled}>UnControlled</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TabCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Tab</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TabLabel}>Label</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TabGroupCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>TabGroup</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TabGroupHorizontal}>Horizontal</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TabGroupVertical}>Vertical</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TabGroupWithDataGrid}>WithDataGrid</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TabGroupWithTable}>WithTable</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TableCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Table</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TableBody}>Body</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TableBundle}>Bundle</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TableCell}>Cell</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TableHeader}>Header</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TableRow}>Row</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TableWithTitle}>WithTitle</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TextFieldCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>TextField</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldBasic}>Basic</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldError}>Error</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldLabel}>Label</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldLeft}>Left</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldMultiLine}>MultiLine</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldRight}>Right</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldWrappedWidth}>WrappedWidth</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TextFieldV2Category: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>TextFieldV2</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Basic}>Basic</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Bottom}>Bottom</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2CheckErrorAsFunction}>CheckErrorAsFunction</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Error}>Error</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Left}>Left</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2MultiLine}>MultiLine</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Number}>Number</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2NumberOption}>NumberOption</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2NumberOptionNegativeInteger}>NumberOptionNegativeInteger</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2NumberOptionPositiveInteger}>NumberOptionPositiveInteger</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Right}>Right</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2SinglelineTitle}>SinglelineTitle</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2TitleInputScale}>TitleInputScale</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TextFieldV2Top}>Top</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TooltipCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Tooltip</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TooltipArrowBorder}>ArrowBorder</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TooltipRight}>Right</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TypographyCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>Typography</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TypographyBody1}>Body1</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TypographyBody2}>Body2</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TypographyBody3}>Body3</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TypographyH1}>H1</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TypographySingleLine}>SingleLine</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TypographyGroupCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>TypographyGroup</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TypographyGroupText}>Text</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const DualComponentsCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="super" fill='2' itemCenter itemSpacing={0}>
			<div style={{ 
				width: 200, 
				height: 30, 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				margin: '15 0 10 0',
			}}>
				<h4>TEMPLATES</h4>
			</div>
			<div style={{ 
				width: 200, 
				height: 10,
				borderTop: '1px solid #bdbebd',
				background: 'linear-gradient(#e9e9e9, #fff)',
				marginBottom: '5px'
			}} />
		</GuideBox>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>DualComponents</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.DualComponentsTypographyDropListSpaceBetween}>TypographyDropListSpaceBetween</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.DualComponentsTypographyTextFieldSpaceBetween}>TypographyTextFieldSpaceBetween</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);

const TendonProfileConverterCategory: React.FC<{}> = () => (
	<GuideBox show={false} tag="outline" fill='1' itemSpacing={1}>
		<GuideBox show={false} tag="title" fill='2'>
			<div style={{
				marginTop: '5px',
				marginLeft: '5px'
			}}>
				<h4>TendonProfileConverter</h4>
			</div>
		</GuideBox>
		<GuideBox show={false} tag="contents" fill='2' itemDirection="row" itemSpacing={0}>
			<div style={{
				marginBottom: '30px',
				width: '188px',
			}}>
				<CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterBottomButtons}>BottomButtons</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterComposite}>Composite</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterHelpIconButton}>HelpIconButton</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterList}>List</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterSelectButton}>SelectButton</CustomDraggableComponent>
				<CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterUpdateButton}>UpdateButton</CustomDraggableComponent>
			</div>
		</GuideBox>
	</GuideBox>
);


export const VerifyDialogDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.VerifyDialogDefault}>VerifyDialogDefault</CustomDraggableComponent>;

export const VerifyDialogLoading = 
	() => <CustomDraggableComponent itemType={ItemTypes.VerifyDialogLoading}>VerifyDialogLoading</CustomDraggableComponent>;

export const AlertError = 
	() => <CustomDraggableComponent itemType={ItemTypes.AlertError}>AlertError</CustomDraggableComponent>;

export const ButtonComposite = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonComposite}>ButtonComposite</CustomDraggableComponent>;

export const ButtonContained = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonContained}>ButtonContained</CustomDraggableComponent>;

export const ButtonLoading = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonLoading}>ButtonLoading</CustomDraggableComponent>;

export const ButtonNegative = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonNegative}>ButtonNegative</CustomDraggableComponent>;

export const ButtonNormal = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonNormal}>ButtonNormal</CustomDraggableComponent>;

export const ButtonOutlined = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonOutlined}>ButtonOutlined</CustomDraggableComponent>;

export const ButtonText = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonText}>ButtonText</CustomDraggableComponent>;

export const ButtonWidth = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonWidth}>ButtonWidth</CustomDraggableComponent>;

export const ChartLineAxisLegend = 
	() => <CustomDraggableComponent itemType={ItemTypes.ChartLineAxisLegend}>ChartLineAxisLegend</CustomDraggableComponent>;

export const ChartLineAxisPointSize = 
	() => <CustomDraggableComponent itemType={ItemTypes.ChartLineAxisPointSize}>ChartLineAxisPointSize</CustomDraggableComponent>;

export const ChartLineAxisTopRight = 
	() => <CustomDraggableComponent itemType={ItemTypes.ChartLineAxisTopRight}>ChartLineAxisTopRight</CustomDraggableComponent>;

export const ChartLineDecimals = 
	() => <CustomDraggableComponent itemType={ItemTypes.ChartLineDecimals}>ChartLineDecimals</CustomDraggableComponent>;

export const CheckDisabled = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckDisabled}>CheckDisabled</CustomDraggableComponent>;

export const CheckNotRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckNotRequired}>CheckNotRequired</CustomDraggableComponent>;

export const CheckRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckRequired}>CheckRequired</CustomDraggableComponent>;

export const CheckGroupStateful = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckGroupStateful}>CheckGroupStateful</CustomDraggableComponent>;

export const CheckGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckGroupUnControlled}>CheckGroupUnControlled</CustomDraggableComponent>;

export const ChipDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.ChipDefault}>ChipDefault</CustomDraggableComponent>;

export const CodeBlockBackgroundColor = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockBackgroundColor}>CodeBlockBackgroundColor</CustomDraggableComponent>;

export const CodeBlockJavascript = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockJavascript}>CodeBlockJavascript</CustomDraggableComponent>;

export const CodeBlockLanguage = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockLanguage}>CodeBlockLanguage</CustomDraggableComponent>;

export const CodeBlockPadding = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockPadding}>CodeBlockPadding</CustomDraggableComponent>;

export const CodeBlockTypescript = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockTypescript}>CodeBlockTypescript</CustomDraggableComponent>;

export const DataGridPagination = 
	() => <CustomDraggableComponent itemType={ItemTypes.DataGridPagination}>DataGridPagination</CustomDraggableComponent>;

export const DialogDialogButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogDialogButton}>DialogDialogButton</CustomDraggableComponent>;

export const DialogHelpButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogHelpButton}>DialogHelpButton</CustomDraggableComponent>;

export const DialogHelpIconButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogHelpIconButton}>DialogHelpIconButton</CustomDraggableComponent>;

export const DialogHiddenClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogHiddenClose}>DialogHiddenClose</CustomDraggableComponent>;

export const DialogOnClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogOnClose}>DialogOnClose</CustomDraggableComponent>;

export const DropListDisabled = 
	() => <CustomDraggableComponent itemType={ItemTypes.DropListDisabled}>DropListDisabled</CustomDraggableComponent>;

export const DropListDropdown = 
	() => <CustomDraggableComponent itemType={ItemTypes.DropListDropdown}>DropListDropdown</CustomDraggableComponent>;

export const DropListItemListFromArray = 
	() => <CustomDraggableComponent itemType={ItemTypes.DropListItemListFromArray}>DropListItemListFromArray</CustomDraggableComponent>;

export const DropListListWidth = 
	() => <CustomDraggableComponent itemType={ItemTypes.DropListListWidth}>DropListListWidth</CustomDraggableComponent>;

export const DropListMaxLength = 
	() => <CustomDraggableComponent itemType={ItemTypes.DropListMaxLength}>DropListMaxLength</CustomDraggableComponent>;

export const FloatingBoxClassName = 
	() => <CustomDraggableComponent itemType={ItemTypes.FloatingBoxClassName}>FloatingBoxClassName</CustomDraggableComponent>;

export const FloatingBoxGuideBoxProps = 
	() => <CustomDraggableComponent itemType={ItemTypes.FloatingBoxGuideBoxProps}>FloatingBoxGuideBoxProps</CustomDraggableComponent>;

export const FloatingBoxMouseEvents = 
	() => <CustomDraggableComponent itemType={ItemTypes.FloatingBoxMouseEvents}>FloatingBoxMouseEvents</CustomDraggableComponent>;

export const FloatingBoxWithPanel = 
	() => <CustomDraggableComponent itemType={ItemTypes.FloatingBoxWithPanel}>FloatingBoxWithPanel</CustomDraggableComponent>;

export const GridColumn = 
	() => <CustomDraggableComponent itemType={ItemTypes.GridColumn}>GridColumn</CustomDraggableComponent>;

export const GridItems = 
	() => <CustomDraggableComponent itemType={ItemTypes.GridItems}>GridItems</CustomDraggableComponent>;

export const GridRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.GridRow}>GridRow</CustomDraggableComponent>;

export const GuideBoxBasic300x300 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxBasic300x300}>GuideBoxBasic300x300</CustomDraggableComponent>;

export const GuideBoxEmpty = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxEmpty}>GuideBoxEmpty</CustomDraggableComponent>;

export const GuideBoxFlexGrow = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxFlexGrow}>GuideBoxFlexGrow</CustomDraggableComponent>;

export const GuideBoxLayout1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout1}>GuideBoxLayout1</CustomDraggableComponent>;

export const GuideBoxLayout2 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout2}>GuideBoxLayout2</CustomDraggableComponent>;

export const GuideBoxLayout3 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout3}>GuideBoxLayout3</CustomDraggableComponent>;

export const GuideBoxLayout4 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout4}>GuideBoxLayout4</CustomDraggableComponent>;

export const GuideBoxLayout5 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLayout5}>GuideBoxLayout5</CustomDraggableComponent>;

export const GuideBoxLoading = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLoading}>GuideBoxLoading</CustomDraggableComponent>;

export const GuideBoxOnKeyDown = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxOnKeyDown}>GuideBoxOnKeyDown</CustomDraggableComponent>;

export const GuideBoxOpacity = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxOpacity}>GuideBoxOpacity</CustomDraggableComponent>;

export const GuideBoxOverflow = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxOverflow}>GuideBoxOverflow</CustomDraggableComponent>;

export const GuideBoxPulse = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxPulse}>GuideBoxPulse</CustomDraggableComponent>;

export const GuideBoxRowDirection = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxRowDirection}>GuideBoxRowDirection</CustomDraggableComponent>;

export const GuideBoxSpaceBetween = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxSpaceBetween}>GuideBoxSpaceBetween</CustomDraggableComponent>;

export const IconAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconAdd}>IconAdd</CustomDraggableComponent>;

export const IconClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconClose}>IconClose</CustomDraggableComponent>;

export const IconToButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconToButton}>IconToButton</CustomDraggableComponent>;

export const IconButtonAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconButtonAdd}>IconButtonAdd</CustomDraggableComponent>;

export const IconButtonClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconButtonClose}>IconButtonClose</CustomDraggableComponent>;

export const IconButtonTransparent = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconButtonTransparent}>IconButtonTransparent</CustomDraggableComponent>;

export const IconButtonWithName = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconButtonWithName}>IconButtonWithName</CustomDraggableComponent>;

export const ListControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ListControlled}>ListControlled</CustomDraggableComponent>;

export const ListDynamic = 
	() => <CustomDraggableComponent itemType={ItemTypes.ListDynamic}>ListDynamic</CustomDraggableComponent>;

export const ListTypographyRadio = 
	() => <CustomDraggableComponent itemType={ItemTypes.ListTypographyRadio}>ListTypographyRadio</CustomDraggableComponent>;

export const ListUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ListUnControlled}>ListUnControlled</CustomDraggableComponent>;

export const ListItemDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.ListItemDefault}>ListItemDefault</CustomDraggableComponent>;

export const ListItemButtonDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.ListItemButtonDefault}>ListItemButtonDefault</CustomDraggableComponent>;

export const MidasControllerTitle = 
	() => <CustomDraggableComponent itemType={ItemTypes.MidasControllerTitle}>MidasControllerTitle</CustomDraggableComponent>;

export const PanelBorder = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelBorder}>PanelBorder</CustomDraggableComponent>;

export const PanelBox = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelBox}>PanelBox</CustomDraggableComponent>;

export const PanelPadding0 = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelPadding0}>PanelPadding0</CustomDraggableComponent>;

export const PanelShadow = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelShadow}>PanelShadow</CustomDraggableComponent>;

export const PanelShadow2 = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelShadow2}>PanelShadow2</CustomDraggableComponent>;

export const PanelStrock = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelStrock}>PanelStrock</CustomDraggableComponent>;

export const PanelTypographyDropList = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelTypographyDropList}>PanelTypographyDropList</CustomDraggableComponent>;

export const PanelTypographyTextField = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelTypographyTextField}>PanelTypographyTextField</CustomDraggableComponent>;

export const RadioName = 
	() => <CustomDraggableComponent itemType={ItemTypes.RadioName}>RadioName</CustomDraggableComponent>;

export const RadioGroupControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.RadioGroupControlled}>RadioGroupControlled</CustomDraggableComponent>;

export const RadioGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.RadioGroupUnControlled}>RadioGroupUnControlled</CustomDraggableComponent>;

export const ScrollbarsCheckGroup = 
	() => <CustomDraggableComponent itemType={ItemTypes.ScrollbarsCheckGroup}>ScrollbarsCheckGroup</CustomDraggableComponent>;

export const ScrollbarsList = 
	() => <CustomDraggableComponent itemType={ItemTypes.ScrollbarsList}>ScrollbarsList</CustomDraggableComponent>;

export const SeparatorHorizontal = 
	() => <CustomDraggableComponent itemType={ItemTypes.SeparatorHorizontal}>SeparatorHorizontal</CustomDraggableComponent>;

export const SeparatorVertical = 
	() => <CustomDraggableComponent itemType={ItemTypes.SeparatorVertical}>SeparatorVertical</CustomDraggableComponent>;

export const StackColumn = 
	() => <CustomDraggableComponent itemType={ItemTypes.StackColumn}>StackColumn</CustomDraggableComponent>;

export const StackRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.StackRow}>StackRow</CustomDraggableComponent>;

export const SwitchLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.SwitchLabel}>SwitchLabel</CustomDraggableComponent>;

export const SwitchGroupControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.SwitchGroupControlled}>SwitchGroupControlled</CustomDraggableComponent>;

export const SwitchGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.SwitchGroupUnControlled}>SwitchGroupUnControlled</CustomDraggableComponent>;

export const TabLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.TabLabel}>TabLabel</CustomDraggableComponent>;

export const TabGroupHorizontal = 
	() => <CustomDraggableComponent itemType={ItemTypes.TabGroupHorizontal}>TabGroupHorizontal</CustomDraggableComponent>;

export const TabGroupVertical = 
	() => <CustomDraggableComponent itemType={ItemTypes.TabGroupVertical}>TabGroupVertical</CustomDraggableComponent>;

export const TabGroupWithDataGrid = 
	() => <CustomDraggableComponent itemType={ItemTypes.TabGroupWithDataGrid}>TabGroupWithDataGrid</CustomDraggableComponent>;

export const TabGroupWithTable = 
	() => <CustomDraggableComponent itemType={ItemTypes.TabGroupWithTable}>TabGroupWithTable</CustomDraggableComponent>;

export const TableBody = 
	() => <CustomDraggableComponent itemType={ItemTypes.TableBody}>TableBody</CustomDraggableComponent>;

export const TableBundle = 
	() => <CustomDraggableComponent itemType={ItemTypes.TableBundle}>TableBundle</CustomDraggableComponent>;

export const TableCell = 
	() => <CustomDraggableComponent itemType={ItemTypes.TableCell}>TableCell</CustomDraggableComponent>;

export const TableHeader = 
	() => <CustomDraggableComponent itemType={ItemTypes.TableHeader}>TableHeader</CustomDraggableComponent>;

export const TableRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.TableRow}>TableRow</CustomDraggableComponent>;

export const TableWithTitle = 
	() => <CustomDraggableComponent itemType={ItemTypes.TableWithTitle}>TableWithTitle</CustomDraggableComponent>;

export const TextFieldBasic = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldBasic}>TextFieldBasic</CustomDraggableComponent>;

export const TextFieldError = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldError}>TextFieldError</CustomDraggableComponent>;

export const TextFieldLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldLabel}>TextFieldLabel</CustomDraggableComponent>;

export const TextFieldLeft = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldLeft}>TextFieldLeft</CustomDraggableComponent>;

export const TextFieldMultiLine = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldMultiLine}>TextFieldMultiLine</CustomDraggableComponent>;

export const TextFieldRight = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldRight}>TextFieldRight</CustomDraggableComponent>;

export const TextFieldWrappedWidth = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldWrappedWidth}>TextFieldWrappedWidth</CustomDraggableComponent>;

export const TextFieldV2Basic = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Basic}>TextFieldV2Basic</CustomDraggableComponent>;

export const TextFieldV2Bottom = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Bottom}>TextFieldV2Bottom</CustomDraggableComponent>;

export const TextFieldV2CheckErrorAsFunction = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2CheckErrorAsFunction}>TextFieldV2CheckErrorAsFunction</CustomDraggableComponent>;

export const TextFieldV2Error = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Error}>TextFieldV2Error</CustomDraggableComponent>;

export const TextFieldV2Left = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Left}>TextFieldV2Left</CustomDraggableComponent>;

export const TextFieldV2MultiLine = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2MultiLine}>TextFieldV2MultiLine</CustomDraggableComponent>;

export const TextFieldV2Number = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Number}>TextFieldV2Number</CustomDraggableComponent>;

export const TextFieldV2NumberOption = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2NumberOption}>TextFieldV2NumberOption</CustomDraggableComponent>;

export const TextFieldV2NumberOptionNegativeInteger = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2NumberOptionNegativeInteger}>TextFieldV2NumberOptionNegativeInteger</CustomDraggableComponent>;

export const TextFieldV2NumberOptionPositiveInteger = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2NumberOptionPositiveInteger}>TextFieldV2NumberOptionPositiveInteger</CustomDraggableComponent>;

export const TextFieldV2Right = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Right}>TextFieldV2Right</CustomDraggableComponent>;

export const TextFieldV2SinglelineTitle = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2SinglelineTitle}>TextFieldV2SinglelineTitle</CustomDraggableComponent>;

export const TextFieldV2TitleInputScale = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2TitleInputScale}>TextFieldV2TitleInputScale</CustomDraggableComponent>;

export const TextFieldV2Top = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldV2Top}>TextFieldV2Top</CustomDraggableComponent>;

export const TooltipArrowBorder = 
	() => <CustomDraggableComponent itemType={ItemTypes.TooltipArrowBorder}>TooltipArrowBorder</CustomDraggableComponent>;

export const TooltipRight = 
	() => <CustomDraggableComponent itemType={ItemTypes.TooltipRight}>TooltipRight</CustomDraggableComponent>;

export const TypographyBody1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyBody1}>TypographyBody1</CustomDraggableComponent>;

export const TypographyBody2 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyBody2}>TypographyBody2</CustomDraggableComponent>;

export const TypographyBody3 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyBody3}>TypographyBody3</CustomDraggableComponent>;

export const TypographyH1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyH1}>TypographyH1</CustomDraggableComponent>;

export const TypographySingleLine = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographySingleLine}>TypographySingleLine</CustomDraggableComponent>;

export const TypographyGroupText = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyGroupText}>TypographyGroupText</CustomDraggableComponent>;

export const DualComponentsTypographyDropListSpaceBetween = 
	() => <CustomDraggableComponent itemType={ItemTypes.DualComponentsTypographyDropListSpaceBetween}>DualComponentsTypographyDropListSpaceBetween</CustomDraggableComponent>;

export const DualComponentsTypographyTextFieldSpaceBetween = 
	() => <CustomDraggableComponent itemType={ItemTypes.DualComponentsTypographyTextFieldSpaceBetween}>DualComponentsTypographyTextFieldSpaceBetween</CustomDraggableComponent>;

export const TendonProfileConverterBottomButtons = 
	() => <CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterBottomButtons}>TendonProfileConverterBottomButtons</CustomDraggableComponent>;

export const TendonProfileConverterComposite = 
	() => <CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterComposite}>TendonProfileConverterComposite</CustomDraggableComponent>;

export const TendonProfileConverterHelpIconButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterHelpIconButton}>TendonProfileConverterHelpIconButton</CustomDraggableComponent>;

export const TendonProfileConverterList = 
	() => <CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterList}>TendonProfileConverterList</CustomDraggableComponent>;

export const TendonProfileConverterSelectButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterSelectButton}>TendonProfileConverterSelectButton</CustomDraggableComponent>;

export const TendonProfileConverterUpdateButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.TendonProfileConverterUpdateButton}>TendonProfileConverterUpdateButton</CustomDraggableComponent>;


const DraggableComponent: React.FC = () => {
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<VerifyDialogCategory />
			<AlertCategory />
			<ButtonCategory />
			<ChartLineCategory />
			<CheckCategory />
			<CheckGroupCategory />
			<ChipCategory />
			<CodeBlockCategory />
			<DataGridCategory />
			<DialogCategory />
			<DropListCategory />
			<FloatingBoxCategory />
			<GridCategory />
			<GuideBoxCategory />
			<IconCategory />
			<IconButtonCategory />
			<ListCategory />
			<ListItemCategory />
			<ListItemButtonCategory />
			<MidasControllerCategory />
			<PanelCategory />
			<RadioCategory />
			<RadioGroupCategory />
			<ScrollbarsCategory />
			<SeparatorCategory />
			<StackCategory />
			<SwitchCategory />
			<SwitchGroupCategory />
			<TabCategory />
			<TabGroupCategory />
			<TableCategory />
			<TextFieldCategory />
			<TextFieldV2Category />
			<TooltipCategory />
			<TypographyCategory />
			<TypographyGroupCategory />
			<DualComponentsCategory />
			<TendonProfileConverterCategory />
		</div>
	);
};
	
export default DraggableComponent;
