import * as All from ".";
import { ItemTypes } from './ItemTypes';

function DraggedComponent(props: any){
  const item = props.item;

	switch (item.type) {
		case ItemTypes.AuthenticationVerifyDialogDefault: return <All.AuthenticationVerifyDialogDefault />;
		case ItemTypes.ComponentsButtonComposite: return <All.ComponentsButtonComposite />;
		case ItemTypes.ComponentsButtonContained: return <All.ComponentsButtonContained />;
		case ItemTypes.ComponentsButtonNegative: return <All.ComponentsButtonNegative />;
		case ItemTypes.ComponentsButtonNormal: return <All.ComponentsButtonNormal />;
		case ItemTypes.ComponentsButtonOutlined: return <All.ComponentsButtonOutlined />;
		case ItemTypes.ComponentsButtonText: return <All.ComponentsButtonText />;
		case ItemTypes.ComponentsButtonWidth: return <All.ComponentsButtonWidth />;
		case ItemTypes.ComponentsCheckNotRequired: return <All.ComponentsCheckNotRequired />;
		case ItemTypes.ComponentsCheckRequired: return <All.ComponentsCheckRequired />;
		case ItemTypes.ComponentsCheckGroupText: return <All.ComponentsCheckGroupText />;
		case ItemTypes.ComponentsCodeBlockJavascript: return <All.ComponentsCodeBlockJavascript />;
		case ItemTypes.ComponentsCodeBlockTypescript: return <All.ComponentsCodeBlockTypescript />;
		case ItemTypes.ComponentsDataGridPagination: return <All.ComponentsDataGridPagination />;
		case ItemTypes.ComponentsDropListDropdown: return <All.ComponentsDropListDropdown />;
		case ItemTypes.ComponentsGridColumn: return <All.ComponentsGridColumn />;
		case ItemTypes.ComponentsGridItems: return <All.ComponentsGridItems />;
		case ItemTypes.ComponentsGridRow: return <All.ComponentsGridRow />;
		case ItemTypes.ComponentsIconAdd: return <All.ComponentsIconAdd />;
		case ItemTypes.ComponentsIconClose: return <All.ComponentsIconClose />;
		case ItemTypes.ComponentsIconButtonAdd: return <All.ComponentsIconButtonAdd />;
		case ItemTypes.ComponentsIconButtonClose: return <All.ComponentsIconButtonClose />;
		case ItemTypes.ComponentsPanelBox: return <All.ComponentsPanelBox />;
		case ItemTypes.ComponentsPanelShadow: return <All.ComponentsPanelShadow />;
		case ItemTypes.ComponentsPanelStrock: return <All.ComponentsPanelStrock />;
		case ItemTypes.ComponentsRadioName: return <All.ComponentsRadioName />;
		case ItemTypes.ComponentsRadioGroupControlled: return <All.ComponentsRadioGroupControlled />;
		case ItemTypes.ComponentsRadioGroupUnControlled: return <All.ComponentsRadioGroupUnControlled />;
		case ItemTypes.ComponentsSeperatorHorizontal: return <All.ComponentsSeperatorHorizontal />;
		case ItemTypes.ComponentsSeperatorVertical: return <All.ComponentsSeperatorVertical />;
		case ItemTypes.ComponentsStackColumn: return <All.ComponentsStackColumn />;
		case ItemTypes.ComponentsStackRow: return <All.ComponentsStackRow />;
		case ItemTypes.ComponentsSwitchLabel: return <All.ComponentsSwitchLabel />;
		case ItemTypes.ComponentsSwitchGroupControlled: return <All.ComponentsSwitchGroupControlled />;
		case ItemTypes.ComponentsSwitchGroupUnControlled: return <All.ComponentsSwitchGroupUnControlled />;
		case ItemTypes.ComponentsTabLabel: return <All.ComponentsTabLabel />;
		case ItemTypes.ComponentsTabGroupHorizontal: return <All.ComponentsTabGroupHorizontal />;
		case ItemTypes.ComponentsTabGroupVertical: return <All.ComponentsTabGroupVertical />;
		case ItemTypes.ComponentsTableBody: return <All.ComponentsTableBody />;
		case ItemTypes.ComponentsTableBundle: return <All.ComponentsTableBundle />;
		case ItemTypes.ComponentsTableCell: return <All.ComponentsTableCell />;
		case ItemTypes.ComponentsTableHeader: return <All.ComponentsTableHeader />;
		case ItemTypes.ComponentsTableRow: return <All.ComponentsTableRow />;
		case ItemTypes.ComponentsTextFieldError: return <All.ComponentsTextFieldError />;
		case ItemTypes.ComponentsTextFieldLabel: return <All.ComponentsTextFieldLabel />;
		case ItemTypes.ComponentsTextFieldLeft: return <All.ComponentsTextFieldLeft />;
		case ItemTypes.ComponentsTextFieldRight: return <All.ComponentsTextFieldRight />;
		case ItemTypes.ComponentsTypographyBody1: return <All.ComponentsTypographyBody1 />;
		case ItemTypes.ComponentsTypographyBody2: return <All.ComponentsTypographyBody2 />;
		case ItemTypes.ComponentsTypographyBody3: return <All.ComponentsTypographyBody3 />;
		case ItemTypes.ComponentsTypographyH1: return <All.ComponentsTypographyH1 />;
		case ItemTypes.ComponentsTypographyGroupText: return <All.ComponentsTypographyGroupText />;
		default: return <>Invalid</>;
	}
}

export default DraggedComponent;
