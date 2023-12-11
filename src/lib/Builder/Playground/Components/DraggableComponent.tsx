import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../Components/ItemTypes';

const CustomStyled = (isDragging: boolean) => {
	return {
		width: '100%',
		cursor: 'grab',
		opacity: isDragging ? 0.5 : 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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

export const VerifyDialogDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.VerifyDialogDefault}>VerifyDialogDefault</CustomDraggableComponent>;

export const ButtonComposite = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonComposite}>ButtonComposite</CustomDraggableComponent>;

export const ButtonContained = 
	() => <CustomDraggableComponent itemType={ItemTypes.ButtonContained}>ButtonContained</CustomDraggableComponent>;

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

export const CheckNotRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckNotRequired}>CheckNotRequired</CustomDraggableComponent>;

export const CheckRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckRequired}>CheckRequired</CustomDraggableComponent>;

export const CheckGroupControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckGroupControlled}>CheckGroupControlled</CustomDraggableComponent>;

export const CheckGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.CheckGroupUnControlled}>CheckGroupUnControlled</CustomDraggableComponent>;

export const CodeBlockJavascript = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockJavascript}>CodeBlockJavascript</CustomDraggableComponent>;

export const CodeBlockTypescript = 
	() => <CustomDraggableComponent itemType={ItemTypes.CodeBlockTypescript}>CodeBlockTypescript</CustomDraggableComponent>;

export const DataGridPagination = 
	() => <CustomDraggableComponent itemType={ItemTypes.DataGridPagination}>DataGridPagination</CustomDraggableComponent>;

export const DialogHelpButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogHelpButton}>DialogHelpButton</CustomDraggableComponent>;

export const DialogHelpIconButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.DialogHelpIconButton}>DialogHelpIconButton</CustomDraggableComponent>;

export const DropListDropdown = 
	() => <CustomDraggableComponent itemType={ItemTypes.DropListDropdown}>DropListDropdown</CustomDraggableComponent>;

export const GridColumn = 
	() => <CustomDraggableComponent itemType={ItemTypes.GridColumn}>GridColumn</CustomDraggableComponent>;

export const GridItems = 
	() => <CustomDraggableComponent itemType={ItemTypes.GridItems}>GridItems</CustomDraggableComponent>;

export const GridRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.GridRow}>GridRow</CustomDraggableComponent>;

export const GuideBoxBasic300x300 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxBasic300x300}>GuideBoxBasic300x300</CustomDraggableComponent>;

export const GuideBoxLayoutSample1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxLayoutSample1}>GuideBoxLayoutSample1</CustomDraggableComponent>;

export const GuideBoxRowDirection = 
	() => <CustomDraggableComponent itemType={ItemTypes.GuideBoxRowDirection}>GuideBoxRowDirection</CustomDraggableComponent>;

export const IconAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconAdd}>IconAdd</CustomDraggableComponent>;

export const IconClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconClose}>IconClose</CustomDraggableComponent>;

export const IconButtonAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconButtonAdd}>IconButtonAdd</CustomDraggableComponent>;

export const IconButtonClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.IconButtonClose}>IconButtonClose</CustomDraggableComponent>;

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

export const PanelBox = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelBox}>PanelBox</CustomDraggableComponent>;

export const PanelShadow = 
	() => <CustomDraggableComponent itemType={ItemTypes.PanelShadow}>PanelShadow</CustomDraggableComponent>;

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

export const SeperatorHorizontal = 
	() => <CustomDraggableComponent itemType={ItemTypes.SeperatorHorizontal}>SeperatorHorizontal</CustomDraggableComponent>;

export const SeperatorVertical = 
	() => <CustomDraggableComponent itemType={ItemTypes.SeperatorVertical}>SeperatorVertical</CustomDraggableComponent>;

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

export const TextFieldError = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldError}>TextFieldError</CustomDraggableComponent>;

export const TextFieldLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldLabel}>TextFieldLabel</CustomDraggableComponent>;

export const TextFieldLeft = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldLeft}>TextFieldLeft</CustomDraggableComponent>;

export const TextFieldRight = 
	() => <CustomDraggableComponent itemType={ItemTypes.TextFieldRight}>TextFieldRight</CustomDraggableComponent>;

export const TypographyBody1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyBody1}>TypographyBody1</CustomDraggableComponent>;

export const TypographyBody2 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyBody2}>TypographyBody2</CustomDraggableComponent>;

export const TypographyBody3 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyBody3}>TypographyBody3</CustomDraggableComponent>;

export const TypographyH1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyH1}>TypographyH1</CustomDraggableComponent>;

export const TypographyGroupText = 
	() => <CustomDraggableComponent itemType={ItemTypes.TypographyGroupText}>TypographyGroupText</CustomDraggableComponent>;

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
			<VerifyDialogDefault />
			<ButtonComposite />
			<ButtonContained />
			<ButtonNegative />
			<ButtonNormal />
			<ButtonOutlined />
			<ButtonText />
			<ButtonWidth />
			<ChartLineAxisLegend />
			<ChartLineAxisPointSize />
			<ChartLineAxisTopRight />
			<CheckNotRequired />
			<CheckRequired />
			<CheckGroupControlled />
			<CheckGroupUnControlled />
			<CodeBlockJavascript />
			<CodeBlockTypescript />
			<DataGridPagination />
			<DialogHelpButton />
			<DialogHelpIconButton />
			<DropListDropdown />
			<GridColumn />
			<GridItems />
			<GridRow />
			<GuideBoxBasic300x300 />
			<GuideBoxLayoutSample1 />
			<GuideBoxRowDirection />
			<IconAdd />
			<IconClose />
			<IconButtonAdd />
			<IconButtonClose />
			<IconButtonWithName />
			<ListControlled />
			<ListDynamic />
			<ListTypographyRadio />
			<ListUnControlled />
			<ListItemDefault />
			<ListItemButtonDefault />
			<PanelBox />
			<PanelShadow />
			<PanelStrock />
			<PanelTypographyDropList />
			<PanelTypographyTextField />
			<RadioName />
			<RadioGroupControlled />
			<RadioGroupUnControlled />
			<ScrollbarsCheckGroup />
			<ScrollbarsList />
			<SeperatorHorizontal />
			<SeperatorVertical />
			<StackColumn />
			<StackRow />
			<SwitchLabel />
			<SwitchGroupControlled />
			<SwitchGroupUnControlled />
			<TabLabel />
			<TabGroupHorizontal />
			<TabGroupVertical />
			<TabGroupWithDataGrid />
			<TabGroupWithTable />
			<TableBody />
			<TableBundle />
			<TableCell />
			<TableHeader />
			<TableRow />
			<TextFieldError />
			<TextFieldLabel />
			<TextFieldLeft />
			<TextFieldRight />
			<TypographyBody1 />
			<TypographyBody2 />
			<TypographyBody3 />
			<TypographyH1 />
			<TypographyGroupText />
			<TendonProfileConverterBottomButtons />
			<TendonProfileConverterComposite />
			<TendonProfileConverterHelpIconButton />
			<TendonProfileConverterList />
			<TendonProfileConverterSelectButton />
			<TendonProfileConverterUpdateButton />
		</div>
	);
};
	
export default DraggableComponent;
