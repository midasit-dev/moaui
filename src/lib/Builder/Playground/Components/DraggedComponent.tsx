import * as All from ".";
import { ItemTypes } from './ItemTypes';

function DraggedComponent(props: any){
  const item = props.item;

	switch (item.type) {
		case ItemTypes.VerifyDialogDefault: return <All.VerifyDialogDefault />;
		case ItemTypes.ButtonComposite: return <All.ButtonComposite />;
		case ItemTypes.ButtonContained: return <All.ButtonContained />;
		case ItemTypes.ButtonNegative: return <All.ButtonNegative />;
		case ItemTypes.ButtonNormal: return <All.ButtonNormal />;
		case ItemTypes.ButtonOutlined: return <All.ButtonOutlined />;
		case ItemTypes.ButtonText: return <All.ButtonText />;
		case ItemTypes.ButtonWidth: return <All.ButtonWidth />;
		case ItemTypes.CheckNotRequired: return <All.CheckNotRequired />;
		case ItemTypes.CheckRequired: return <All.CheckRequired />;
		case ItemTypes.CheckGroupControlled: return <All.CheckGroupControlled />;
		case ItemTypes.CheckGroupUnControlled: return <All.CheckGroupUnControlled />;
		case ItemTypes.CodeBlockJavascript: return <All.CodeBlockJavascript />;
		case ItemTypes.CodeBlockTypescript: return <All.CodeBlockTypescript />;
		case ItemTypes.DataGridPagination: return <All.DataGridPagination />;
		case ItemTypes.DropListDropdown: return <All.DropListDropdown />;
		case ItemTypes.GridColumn: return <All.GridColumn />;
		case ItemTypes.GridItems: return <All.GridItems />;
		case ItemTypes.GridRow: return <All.GridRow />;
		case ItemTypes.IconAdd: return <All.IconAdd />;
		case ItemTypes.IconClose: return <All.IconClose />;
		case ItemTypes.IconButtonAdd: return <All.IconButtonAdd />;
		case ItemTypes.IconButtonClose: return <All.IconButtonClose />;
		case ItemTypes.ListControlled: return <All.ListControlled />;
		case ItemTypes.ListDynamic: return <All.ListDynamic />;
		case ItemTypes.ListUnControlled: return <All.ListUnControlled />;
		case ItemTypes.ListItemDefault: return <All.ListItemDefault />;
		case ItemTypes.ListItemButtonDefault: return <All.ListItemButtonDefault />;
		case ItemTypes.PanelBox: return <All.PanelBox />;
		case ItemTypes.PanelShadow: return <All.PanelShadow />;
		case ItemTypes.PanelStrock: return <All.PanelStrock />;
		case ItemTypes.RadioName: return <All.RadioName />;
		case ItemTypes.RadioGroupControlled: return <All.RadioGroupControlled />;
		case ItemTypes.RadioGroupUnControlled: return <All.RadioGroupUnControlled />;
		case ItemTypes.ScrollbarsCheckGroup: return <All.ScrollbarsCheckGroup />;
		case ItemTypes.ScrollbarsList: return <All.ScrollbarsList />;
		case ItemTypes.SeperatorHorizontal: return <All.SeperatorHorizontal />;
		case ItemTypes.SeperatorVertical: return <All.SeperatorVertical />;
		case ItemTypes.StackColumn: return <All.StackColumn />;
		case ItemTypes.StackRow: return <All.StackRow />;
		case ItemTypes.SwitchLabel: return <All.SwitchLabel />;
		case ItemTypes.SwitchGroupControlled: return <All.SwitchGroupControlled />;
		case ItemTypes.SwitchGroupUnControlled: return <All.SwitchGroupUnControlled />;
		case ItemTypes.TabLabel: return <All.TabLabel />;
		case ItemTypes.TabGroupHorizontal: return <All.TabGroupHorizontal />;
		case ItemTypes.TabGroupVertical: return <All.TabGroupVertical />;
		case ItemTypes.TableBody: return <All.TableBody />;
		case ItemTypes.TableBundle: return <All.TableBundle />;
		case ItemTypes.TableCell: return <All.TableCell />;
		case ItemTypes.TableHeader: return <All.TableHeader />;
		case ItemTypes.TableRow: return <All.TableRow />;
		case ItemTypes.TextFieldError: return <All.TextFieldError />;
		case ItemTypes.TextFieldLabel: return <All.TextFieldLabel />;
		case ItemTypes.TextFieldLeft: return <All.TextFieldLeft />;
		case ItemTypes.TextFieldRight: return <All.TextFieldRight />;
		case ItemTypes.TypographyBody1: return <All.TypographyBody1 />;
		case ItemTypes.TypographyBody2: return <All.TypographyBody2 />;
		case ItemTypes.TypographyBody3: return <All.TypographyBody3 />;
		case ItemTypes.TypographyH1: return <All.TypographyH1 />;
		case ItemTypes.TypographyGroupText: return <All.TypographyGroupText />;
		default: return <>Invalid</>;
	}
}

export default DraggedComponent;
