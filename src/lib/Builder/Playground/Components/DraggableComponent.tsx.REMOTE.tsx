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

export const AuthenticationVerifyDialogDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.AuthenticationVerifyDialogDefault}>AuthenticationVerifyDialogDefault</CustomDraggableComponent>;

export const ComponentsButtonComposite = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonComposite}>ComponentsButtonComposite</CustomDraggableComponent>;

export const ComponentsButtonContained = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonContained}>ComponentsButtonContained</CustomDraggableComponent>;

export const ComponentsButtonNegative = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonNegative}>ComponentsButtonNegative</CustomDraggableComponent>;

export const ComponentsButtonNormal = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonNormal}>ComponentsButtonNormal</CustomDraggableComponent>;

export const ComponentsButtonOutlined = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonOutlined}>ComponentsButtonOutlined</CustomDraggableComponent>;

export const ComponentsButtonText = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonText}>ComponentsButtonText</CustomDraggableComponent>;

export const ComponentsButtonWidth = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsButtonWidth}>ComponentsButtonWidth</CustomDraggableComponent>;

export const ComponentsChartLineAxisLegend = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsChartLineAxisLegend}>ComponentsChartLineAxisLegend</CustomDraggableComponent>;

export const ComponentsChartLineAxisPointSize = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsChartLineAxisPointSize}>ComponentsChartLineAxisPointSize</CustomDraggableComponent>;

export const ComponentsChartLineAxisTopRight = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsChartLineAxisTopRight}>ComponentsChartLineAxisTopRight</CustomDraggableComponent>;

export const ComponentsCheckNotRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckNotRequired}>ComponentsCheckNotRequired</CustomDraggableComponent>;

export const ComponentsCheckRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckRequired}>ComponentsCheckRequired</CustomDraggableComponent>;

export const ComponentsCheckGroupStateful = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckGroupStateful}>ComponentsCheckGroupStateful</CustomDraggableComponent>;

export const ComponentsCheckGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckGroupUnControlled}>ComponentsCheckGroupUnControlled</CustomDraggableComponent>;

export const ComponentsCodeBlockJavascript = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCodeBlockJavascript}>ComponentsCodeBlockJavascript</CustomDraggableComponent>;

export const ComponentsCodeBlockTypescript = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCodeBlockTypescript}>ComponentsCodeBlockTypescript</CustomDraggableComponent>;

export const ComponentsDataGridPagination = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsDataGridPagination}>ComponentsDataGridPagination</CustomDraggableComponent>;

export const ComponentsDialogHelpButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsDialogHelpButton}>ComponentsDialogHelpButton</CustomDraggableComponent>;

export const ComponentsDialogHelpIconButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsDialogHelpIconButton}>ComponentsDialogHelpIconButton</CustomDraggableComponent>;

export const ComponentsDropListDropdown = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsDropListDropdown}>ComponentsDropListDropdown</CustomDraggableComponent>;

export const ComponentsGridColumn = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGridColumn}>ComponentsGridColumn</CustomDraggableComponent>;

export const ComponentsGridItems = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGridItems}>ComponentsGridItems</CustomDraggableComponent>;

export const ComponentsGridRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGridRow}>ComponentsGridRow</CustomDraggableComponent>;

export const ComponentsGuideBoxBasic300x300 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGuideBoxBasic300x300}>ComponentsGuideBoxBasic300x300</CustomDraggableComponent>;

export const ComponentsGuideBoxLayout1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGuideBoxLayout1}>ComponentsGuideBoxLayout1</CustomDraggableComponent>;

export const ComponentsGuideBoxLayout2 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGuideBoxLayout2}>ComponentsGuideBoxLayout2</CustomDraggableComponent>;

export const ComponentsGuideBoxLayout3 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGuideBoxLayout3}>ComponentsGuideBoxLayout3</CustomDraggableComponent>;

export const ComponentsGuideBoxLayout4 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGuideBoxLayout4}>ComponentsGuideBoxLayout4</CustomDraggableComponent>;

export const ComponentsGuideBoxRowDirection = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGuideBoxRowDirection}>ComponentsGuideBoxRowDirection</CustomDraggableComponent>;

export const ComponentsIconAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconAdd}>ComponentsIconAdd</CustomDraggableComponent>;

export const ComponentsIconClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconClose}>ComponentsIconClose</CustomDraggableComponent>;

export const ComponentsIconButtonAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconButtonAdd}>ComponentsIconButtonAdd</CustomDraggableComponent>;

export const ComponentsIconButtonClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconButtonClose}>ComponentsIconButtonClose</CustomDraggableComponent>;

export const ComponentsIconButtonWithName = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconButtonWithName}>ComponentsIconButtonWithName</CustomDraggableComponent>;

export const ComponentsListControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsListControlled}>ComponentsListControlled</CustomDraggableComponent>;

export const ComponentsListDynamic = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsListDynamic}>ComponentsListDynamic</CustomDraggableComponent>;

export const ComponentsListTypographyRadio = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsListTypographyRadio}>ComponentsListTypographyRadio</CustomDraggableComponent>;

export const ComponentsListUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsListUnControlled}>ComponentsListUnControlled</CustomDraggableComponent>;

export const ComponentsListItemDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsListItemDefault}>ComponentsListItemDefault</CustomDraggableComponent>;

export const ComponentsListItemButtonDefault = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsListItemButtonDefault}>ComponentsListItemButtonDefault</CustomDraggableComponent>;

export const ComponentsPanelBox = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelBox}>ComponentsPanelBox</CustomDraggableComponent>;

export const ComponentsPanelShadow = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelShadow}>ComponentsPanelShadow</CustomDraggableComponent>;

export const ComponentsPanelStrock = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelStrock}>ComponentsPanelStrock</CustomDraggableComponent>;

export const ComponentsPanelTypographyDropList = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelTypographyDropList}>ComponentsPanelTypographyDropList</CustomDraggableComponent>;

export const ComponentsPanelTypographyTextField = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelTypographyTextField}>ComponentsPanelTypographyTextField</CustomDraggableComponent>;

export const ComponentsRadioName = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsRadioName}>ComponentsRadioName</CustomDraggableComponent>;

export const ComponentsRadioGroupControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsRadioGroupControlled}>ComponentsRadioGroupControlled</CustomDraggableComponent>;

export const ComponentsRadioGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsRadioGroupUnControlled}>ComponentsRadioGroupUnControlled</CustomDraggableComponent>;

export const ComponentsScrollbarsCheckGroup = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsScrollbarsCheckGroup}>ComponentsScrollbarsCheckGroup</CustomDraggableComponent>;

export const ComponentsScrollbarsList = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsScrollbarsList}>ComponentsScrollbarsList</CustomDraggableComponent>;

export const ComponentsSeperatorHorizontal = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsSeperatorHorizontal}>ComponentsSeperatorHorizontal</CustomDraggableComponent>;

export const ComponentsSeperatorVertical = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsSeperatorVertical}>ComponentsSeperatorVertical</CustomDraggableComponent>;

export const ComponentsStackColumn = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsStackColumn}>ComponentsStackColumn</CustomDraggableComponent>;

export const ComponentsStackRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsStackRow}>ComponentsStackRow</CustomDraggableComponent>;

export const ComponentsSwitchLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsSwitchLabel}>ComponentsSwitchLabel</CustomDraggableComponent>;

export const ComponentsSwitchGroupControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsSwitchGroupControlled}>ComponentsSwitchGroupControlled</CustomDraggableComponent>;

export const ComponentsSwitchGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsSwitchGroupUnControlled}>ComponentsSwitchGroupUnControlled</CustomDraggableComponent>;

export const ComponentsTabLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTabLabel}>ComponentsTabLabel</CustomDraggableComponent>;

export const ComponentsTabGroupHorizontal = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTabGroupHorizontal}>ComponentsTabGroupHorizontal</CustomDraggableComponent>;

export const ComponentsTabGroupVertical = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTabGroupVertical}>ComponentsTabGroupVertical</CustomDraggableComponent>;

export const ComponentsTabGroupWithDataGrid = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTabGroupWithDataGrid}>ComponentsTabGroupWithDataGrid</CustomDraggableComponent>;

export const ComponentsTabGroupWithTable = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTabGroupWithTable}>ComponentsTabGroupWithTable</CustomDraggableComponent>;

export const ComponentsTableBody = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTableBody}>ComponentsTableBody</CustomDraggableComponent>;

export const ComponentsTableBundle = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTableBundle}>ComponentsTableBundle</CustomDraggableComponent>;

export const ComponentsTableCell = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTableCell}>ComponentsTableCell</CustomDraggableComponent>;

export const ComponentsTableHeader = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTableHeader}>ComponentsTableHeader</CustomDraggableComponent>;

export const ComponentsTableRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTableRow}>ComponentsTableRow</CustomDraggableComponent>;

export const ComponentsTableWithTitle = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTableWithTitle}>ComponentsTableWithTitle</CustomDraggableComponent>;

export const ComponentsTextFieldError = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTextFieldError}>ComponentsTextFieldError</CustomDraggableComponent>;

export const ComponentsTextFieldLabel = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTextFieldLabel}>ComponentsTextFieldLabel</CustomDraggableComponent>;

export const ComponentsTextFieldLeft = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTextFieldLeft}>ComponentsTextFieldLeft</CustomDraggableComponent>;

export const ComponentsTextFieldRight = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTextFieldRight}>ComponentsTextFieldRight</CustomDraggableComponent>;

export const ComponentsTypographyBody1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTypographyBody1}>ComponentsTypographyBody1</CustomDraggableComponent>;

export const ComponentsTypographyBody2 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTypographyBody2}>ComponentsTypographyBody2</CustomDraggableComponent>;

export const ComponentsTypographyBody3 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTypographyBody3}>ComponentsTypographyBody3</CustomDraggableComponent>;

export const ComponentsTypographyH1 = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTypographyH1}>ComponentsTypographyH1</CustomDraggableComponent>;

export const ComponentsTypographyGroupText = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsTypographyGroupText}>ComponentsTypographyGroupText</CustomDraggableComponent>;

export const TemplatesTendonProfileConverterBottomButtons = 
	() => <CustomDraggableComponent itemType={ItemTypes.TemplatesTendonProfileConverterBottomButtons}>TemplatesTendonProfileConverterBottomButtons</CustomDraggableComponent>;

export const TemplatesTendonProfileConverterComposite = 
	() => <CustomDraggableComponent itemType={ItemTypes.TemplatesTendonProfileConverterComposite}>TemplatesTendonProfileConverterComposite</CustomDraggableComponent>;

export const TemplatesTendonProfileConverterHelpIconButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.TemplatesTendonProfileConverterHelpIconButton}>TemplatesTendonProfileConverterHelpIconButton</CustomDraggableComponent>;

export const TemplatesTendonProfileConverterList = 
	() => <CustomDraggableComponent itemType={ItemTypes.TemplatesTendonProfileConverterList}>TemplatesTendonProfileConverterList</CustomDraggableComponent>;

export const TemplatesTendonProfileConverterSelectButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.TemplatesTendonProfileConverterSelectButton}>TemplatesTendonProfileConverterSelectButton</CustomDraggableComponent>;

export const TemplatesTendonProfileConverterUpdateButton = 
	() => <CustomDraggableComponent itemType={ItemTypes.TemplatesTendonProfileConverterUpdateButton}>TemplatesTendonProfileConverterUpdateButton</CustomDraggableComponent>;


const DraggableComponent: React.FC = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				flexDirection: 'column',
			}}
		>
			<AuthenticationVerifyDialogDefault />
			<ComponentsButtonComposite />
			<ComponentsButtonContained />
			<ComponentsButtonNegative />
			<ComponentsButtonNormal />
			<ComponentsButtonOutlined />
			<ComponentsButtonText />
			<ComponentsButtonWidth />
			<ComponentsChartLineAxisLegend />
			<ComponentsChartLineAxisPointSize />
			<ComponentsChartLineAxisTopRight />
			<ComponentsCheckNotRequired />
			<ComponentsCheckRequired />
			<ComponentsCheckGroupStateful />
			<ComponentsCheckGroupUnControlled />
			<ComponentsCodeBlockJavascript />
			<ComponentsCodeBlockTypescript />
			<ComponentsDataGridPagination />
			<ComponentsDialogHelpButton />
			<ComponentsDialogHelpIconButton />
			<ComponentsDropListDropdown />
			<ComponentsGridColumn />
			<ComponentsGridItems />
			<ComponentsGridRow />
			<ComponentsGuideBoxBasic300x300 />
			<ComponentsGuideBoxLayout1 />
			<ComponentsGuideBoxLayout2 />
			<ComponentsGuideBoxLayout3 />
			<ComponentsGuideBoxLayout4 />
			<ComponentsGuideBoxRowDirection />
			<ComponentsIconAdd />
			<ComponentsIconClose />
			<ComponentsIconButtonAdd />
			<ComponentsIconButtonClose />
			<ComponentsIconButtonWithName />
			<ComponentsListControlled />
			<ComponentsListDynamic />
			<ComponentsListTypographyRadio />
			<ComponentsListUnControlled />
			<ComponentsListItemDefault />
			<ComponentsListItemButtonDefault />
			<ComponentsPanelBox />
			<ComponentsPanelShadow />
			<ComponentsPanelStrock />
			<ComponentsPanelTypographyDropList />
			<ComponentsPanelTypographyTextField />
			<ComponentsRadioName />
			<ComponentsRadioGroupControlled />
			<ComponentsRadioGroupUnControlled />
			<ComponentsScrollbarsCheckGroup />
			<ComponentsScrollbarsList />
			<ComponentsSeperatorHorizontal />
			<ComponentsSeperatorVertical />
			<ComponentsStackColumn />
			<ComponentsStackRow />
			<ComponentsSwitchLabel />
			<ComponentsSwitchGroupControlled />
			<ComponentsSwitchGroupUnControlled />
			<ComponentsTabLabel />
			<ComponentsTabGroupHorizontal />
			<ComponentsTabGroupVertical />
			<ComponentsTabGroupWithDataGrid />
			<ComponentsTabGroupWithTable />
			<ComponentsTableBody />
			<ComponentsTableBundle />
			<ComponentsTableCell />
			<ComponentsTableHeader />
			<ComponentsTableRow />
			<ComponentsTableWithTitle />
			<ComponentsTextFieldError />
			<ComponentsTextFieldLabel />
			<ComponentsTextFieldLeft />
			<ComponentsTextFieldRight />
			<ComponentsTypographyBody1 />
			<ComponentsTypographyBody2 />
			<ComponentsTypographyBody3 />
			<ComponentsTypographyH1 />
			<ComponentsTypographyGroupText />
			<TemplatesTendonProfileConverterBottomButtons />
			<TemplatesTendonProfileConverterComposite />
			<TemplatesTendonProfileConverterHelpIconButton />
			<TemplatesTendonProfileConverterList />
			<TemplatesTendonProfileConverterSelectButton />
			<TemplatesTendonProfileConverterUpdateButton />
		</div>
	);
};
	
export default DraggableComponent;
