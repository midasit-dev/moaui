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

export const ComponentsCheckNotRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckNotRequired}>ComponentsCheckNotRequired</CustomDraggableComponent>;

export const ComponentsCheckRequired = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckRequired}>ComponentsCheckRequired</CustomDraggableComponent>;

export const ComponentsCheckGroupText = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCheckGroupText}>ComponentsCheckGroupText</CustomDraggableComponent>;

export const ComponentsCodeBlockJavascript = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCodeBlockJavascript}>ComponentsCodeBlockJavascript</CustomDraggableComponent>;

export const ComponentsCodeBlockTypescript = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsCodeBlockTypescript}>ComponentsCodeBlockTypescript</CustomDraggableComponent>;

export const ComponentsDataGridPagination = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsDataGridPagination}>ComponentsDataGridPagination</CustomDraggableComponent>;

export const ComponentsDropListDropdown = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsDropListDropdown}>ComponentsDropListDropdown</CustomDraggableComponent>;

export const ComponentsGridColumn = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGridColumn}>ComponentsGridColumn</CustomDraggableComponent>;

export const ComponentsGridItems = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGridItems}>ComponentsGridItems</CustomDraggableComponent>;

export const ComponentsGridRow = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsGridRow}>ComponentsGridRow</CustomDraggableComponent>;

export const ComponentsIconAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconAdd}>ComponentsIconAdd</CustomDraggableComponent>;

export const ComponentsIconClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconClose}>ComponentsIconClose</CustomDraggableComponent>;

export const ComponentsIconButtonAdd = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconButtonAdd}>ComponentsIconButtonAdd</CustomDraggableComponent>;

export const ComponentsIconButtonClose = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsIconButtonClose}>ComponentsIconButtonClose</CustomDraggableComponent>;

export const ComponentsPanelBox = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelBox}>ComponentsPanelBox</CustomDraggableComponent>;

export const ComponentsPanelShadow = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelShadow}>ComponentsPanelShadow</CustomDraggableComponent>;

export const ComponentsPanelStrock = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsPanelStrock}>ComponentsPanelStrock</CustomDraggableComponent>;

export const ComponentsRadioName = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsRadioName}>ComponentsRadioName</CustomDraggableComponent>;

export const ComponentsRadioGroupControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsRadioGroupControlled}>ComponentsRadioGroupControlled</CustomDraggableComponent>;

export const ComponentsRadioGroupUnControlled = 
	() => <CustomDraggableComponent itemType={ItemTypes.ComponentsRadioGroupUnControlled}>ComponentsRadioGroupUnControlled</CustomDraggableComponent>;

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
			<ComponentsCheckNotRequired />
			<ComponentsCheckRequired />
			<ComponentsCheckGroupText />
			<ComponentsCodeBlockJavascript />
			<ComponentsCodeBlockTypescript />
			<ComponentsDataGridPagination />
			<ComponentsDropListDropdown />
			<ComponentsGridColumn />
			<ComponentsGridItems />
			<ComponentsGridRow />
			<ComponentsIconAdd />
			<ComponentsIconClose />
			<ComponentsIconButtonAdd />
			<ComponentsIconButtonClose />
			<ComponentsPanelBox />
			<ComponentsPanelShadow />
			<ComponentsPanelStrock />
			<ComponentsRadioName />
			<ComponentsRadioGroupControlled />
			<ComponentsRadioGroupUnControlled />
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
			<ComponentsTableBody />
			<ComponentsTableBundle />
			<ComponentsTableCell />
			<ComponentsTableHeader />
			<ComponentsTableRow />
			<ComponentsTextFieldError />
			<ComponentsTextFieldLabel />
			<ComponentsTextFieldLeft />
			<ComponentsTextFieldRight />
			<ComponentsTypographyBody1 />
			<ComponentsTypographyBody2 />
			<ComponentsTypographyBody3 />
			<ComponentsTypographyH1 />
			<ComponentsTypographyGroupText />
		</div>
	);
};
	
export default DraggableComponent;
