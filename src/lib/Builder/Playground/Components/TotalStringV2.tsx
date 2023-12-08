import React from "react";
import { TemplateWidth, TemplateHeight, CodeString, RowCount, ColumnCount, LayoutsInfo } from '../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import CodeComponent from "../../../Components/CodeBlock";
import DraggedComponent from "./DraggedComponent";
import ButtonCode from "../../../Components/Button/Code/Contained.code.tsx?raw";
// import TextfieldCode from "./Textfield.txt?raw";
import { ItemTypes } from './ItemTypes';
import CodeExtractor from "../../../Common/Storybook/CodeExtractor";
import * as All from "./DraggedComponentRawCode";

function extractComponentCode(str:string){
	const code = CodeExtractor.extract(str);
	return code.functionalComponentCode;
}

function extractComponentName(str:string){
	const code = CodeExtractor.extract(str);
	return `<${code.functionalComponentName} />`;
}

function extractComponentImport(str:string){
	const code = CodeExtractor.extract(str);
	return code.importCodes;
}

export default function TotalCodeString(){
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
	const Codestring = useRecoilValue(CodeString);
	const Rowcount = useRecoilValue(RowCount);
	const Columncount = useRecoilValue(ColumnCount);
	const Layoutsinfo = useRecoilValue(LayoutsInfo);
	const [verifydialogdefault, setVerifyDialogDefault] = React.useState(false);
	const [buttoncomposite, setButtonComposite] = React.useState(false);
	const [buttoncontained, setButtonContained] = React.useState(false);
	const [buttonnegative, setButtonNegative] = React.useState(false);
	const [buttonnormal, setButtonNormal] = React.useState(false);
	const [buttonoutlined, setButtonOutlined] = React.useState(false);
	const [buttontext, setButtonText] = React.useState(false);
	const [buttonwidth, setButtonWidth] = React.useState(false);
	const [chartlineaxislegend, setChartLineAxisLegend] = React.useState(false);
	const [chartlineaxispointsize, setChartLineAxisPointSize] = React.useState(false);
	const [chartlineaxistopright, setChartLineAxisTopRight] = React.useState(false);
	const [checknotrequired, setCheckNotRequired] = React.useState(false);
	const [checkrequired, setCheckRequired] = React.useState(false);
	const [checkgroupcontrolled, setCheckGroupControlled] = React.useState(false);
	const [checkgroupuncontrolled, setCheckGroupUnControlled] = React.useState(false);
	const [codeblockjavascript, setCodeBlockJavascript] = React.useState(false);
	const [codeblocktypescript, setCodeBlockTypescript] = React.useState(false);
	const [datagridpagination, setDataGridPagination] = React.useState(false);
	const [dialoghelpbutton, setDialogHelpButton] = React.useState(false);
	const [dialoghelpiconbutton, setDialogHelpIconButton] = React.useState(false);
	const [droplistdropdown, setDropListDropdown] = React.useState(false);
	const [gridcolumn, setGridColumn] = React.useState(false);
	const [griditems, setGridItems] = React.useState(false);
	const [gridrow, setGridRow] = React.useState(false);
	const [iconadd, setIconAdd] = React.useState(false);
	const [iconclose, setIconClose] = React.useState(false);
	const [iconbuttonadd, setIconButtonAdd] = React.useState(false);
	const [iconbuttonclose, setIconButtonClose] = React.useState(false);
	const [listcontrolled, setListControlled] = React.useState(false);
	const [listdynamic, setListDynamic] = React.useState(false);
	const [listtypographyradio, setListTypographyRadio] = React.useState(false);
	const [listuncontrolled, setListUnControlled] = React.useState(false);
	const [listitemdefault, setListItemDefault] = React.useState(false);
	const [listitembuttondefault, setListItemButtonDefault] = React.useState(false);
	const [panelbox, setPanelBox] = React.useState(false);
	const [panelshadow, setPanelShadow] = React.useState(false);
	const [panelstrock, setPanelStrock] = React.useState(false);
	const [paneltypographydroplist, setPanelTypographyDropList] = React.useState(false);
	const [paneltypographytextfield, setPanelTypographyTextField] = React.useState(false);
	const [radioname, setRadioName] = React.useState(false);
	const [radiogroupcontrolled, setRadioGroupControlled] = React.useState(false);
	const [radiogroupuncontrolled, setRadioGroupUnControlled] = React.useState(false);
	const [scrollbarscheckgroup, setScrollbarsCheckGroup] = React.useState(false);
	const [scrollbarslist, setScrollbarsList] = React.useState(false);
	const [seperatorhorizontal, setSeperatorHorizontal] = React.useState(false);
	const [seperatorvertical, setSeperatorVertical] = React.useState(false);
	const [stackcolumn, setStackColumn] = React.useState(false);
	const [stackrow, setStackRow] = React.useState(false);
	const [switchlabel, setSwitchLabel] = React.useState(false);
	const [switchgroupcontrolled, setSwitchGroupControlled] = React.useState(false);
	const [switchgroupuncontrolled, setSwitchGroupUnControlled] = React.useState(false);
	const [tablabel, setTabLabel] = React.useState(false);
	const [tabgrouphorizontal, setTabGroupHorizontal] = React.useState(false);
	const [tabgroupvertical, setTabGroupVertical] = React.useState(false);
	const [tabgroupwithdatagrid, setTabGroupWithDataGrid] = React.useState(false);
	const [tabgroupwithtable, setTabGroupWithTable] = React.useState(false);
	const [tablebody, setTableBody] = React.useState(false);
	const [tablebundle, setTableBundle] = React.useState(false);
	const [tablecell, setTableCell] = React.useState(false);
	const [tableheader, setTableHeader] = React.useState(false);
	const [tablerow, setTableRow] = React.useState(false);
	const [textfielderror, setTextFieldError] = React.useState(false);
	const [textfieldlabel, setTextFieldLabel] = React.useState(false);
	const [textfieldleft, setTextFieldLeft] = React.useState(false);
	const [textfieldright, setTextFieldRight] = React.useState(false);
	const [typographybody1, setTypographyBody1] = React.useState(false);
	const [typographybody2, setTypographyBody2] = React.useState(false);
	const [typographybody3, setTypographyBody3] = React.useState(false);
	const [typographyh1, setTypographyH1] = React.useState(false);
	const [typographygrouptext, setTypographyGroupText] = React.useState(false);
	const [tendonprofileconverterbottombuttons, setTendonProfileConverterBottomButtons] = React.useState(false);
	const [tendonprofileconvertercomposite, setTendonProfileConverterComposite] = React.useState(false);
	const [tendonprofileconverterhelpiconbutton, setTendonProfileConverterHelpIconButton] = React.useState(false);
	const [tendonprofileconverterlist, setTendonProfileConverterList] = React.useState(false);
	const [tendonprofileconverterselectbutton, setTendonProfileConverterSelectButton] = React.useState(false);
	const [tendonprofileconverterupdatebutton, setTendonProfileConverterUpdateButton] = React.useState(false);

	React.useEffect(() => {
		Layoutsinfo.map((value: any) => {
			switch(value.type){
				case ItemTypes.VerifyDialogDefault: 
					setVerifyDialogDefault(true);
				break;
				case ItemTypes.ButtonComposite: 
					setButtonComposite(true);
				break;
				case ItemTypes.ButtonContained: 
					setButtonContained(true);
				break;
				case ItemTypes.ButtonNegative: 
					setButtonNegative(true);
				break;
				case ItemTypes.ButtonNormal: 
					setButtonNormal(true);
				break;
				case ItemTypes.ButtonOutlined: 
					setButtonOutlined(true);
				break;
				case ItemTypes.ButtonText: 
					setButtonText(true);
				break;
				case ItemTypes.ButtonWidth: 
					setButtonWidth(true);
				break;
				case ItemTypes.ChartLineAxisLegend: 
					setChartLineAxisLegend(true);
				break;
				case ItemTypes.ChartLineAxisPointSize: 
					setChartLineAxisPointSize(true);
				break;
				case ItemTypes.ChartLineAxisTopRight: 
					setChartLineAxisTopRight(true);
				break;
				case ItemTypes.CheckNotRequired: 
					setCheckNotRequired(true);
				break;
				case ItemTypes.CheckRequired: 
					setCheckRequired(true);
				break;
				case ItemTypes.CheckGroupControlled: 
					setCheckGroupControlled(true);
				break;
				case ItemTypes.CheckGroupUnControlled: 
					setCheckGroupUnControlled(true);
				break;
				case ItemTypes.CodeBlockJavascript: 
					setCodeBlockJavascript(true);
				break;
				case ItemTypes.CodeBlockTypescript: 
					setCodeBlockTypescript(true);
				break;
				case ItemTypes.DataGridPagination: 
					setDataGridPagination(true);
				break;
				case ItemTypes.DialogHelpButton: 
					setDialogHelpButton(true);
				break;
				case ItemTypes.DialogHelpIconButton: 
					setDialogHelpIconButton(true);
				break;
				case ItemTypes.DropListDropdown: 
					setDropListDropdown(true);
				break;
				case ItemTypes.GridColumn: 
					setGridColumn(true);
				break;
				case ItemTypes.GridItems: 
					setGridItems(true);
				break;
				case ItemTypes.GridRow: 
					setGridRow(true);
				break;
				case ItemTypes.IconAdd: 
					setIconAdd(true);
				break;
				case ItemTypes.IconClose: 
					setIconClose(true);
				break;
				case ItemTypes.IconButtonAdd: 
					setIconButtonAdd(true);
				break;
				case ItemTypes.IconButtonClose: 
					setIconButtonClose(true);
				break;
				case ItemTypes.ListControlled: 
					setListControlled(true);
				break;
				case ItemTypes.ListDynamic: 
					setListDynamic(true);
				break;
				case ItemTypes.ListTypographyRadio: 
					setListTypographyRadio(true);
				break;
				case ItemTypes.ListUnControlled: 
					setListUnControlled(true);
				break;
				case ItemTypes.ListItemDefault: 
					setListItemDefault(true);
				break;
				case ItemTypes.ListItemButtonDefault: 
					setListItemButtonDefault(true);
				break;
				case ItemTypes.PanelBox: 
					setPanelBox(true);
				break;
				case ItemTypes.PanelShadow: 
					setPanelShadow(true);
				break;
				case ItemTypes.PanelStrock: 
					setPanelStrock(true);
				break;
				case ItemTypes.PanelTypographyDropList: 
					setPanelTypographyDropList(true);
				break;
				case ItemTypes.PanelTypographyTextField: 
					setPanelTypographyTextField(true);
				break;
				case ItemTypes.RadioName: 
					setRadioName(true);
				break;
				case ItemTypes.RadioGroupControlled: 
					setRadioGroupControlled(true);
				break;
				case ItemTypes.RadioGroupUnControlled: 
					setRadioGroupUnControlled(true);
				break;
				case ItemTypes.ScrollbarsCheckGroup: 
					setScrollbarsCheckGroup(true);
				break;
				case ItemTypes.ScrollbarsList: 
					setScrollbarsList(true);
				break;
				case ItemTypes.SeperatorHorizontal: 
					setSeperatorHorizontal(true);
				break;
				case ItemTypes.SeperatorVertical: 
					setSeperatorVertical(true);
				break;
				case ItemTypes.StackColumn: 
					setStackColumn(true);
				break;
				case ItemTypes.StackRow: 
					setStackRow(true);
				break;
				case ItemTypes.SwitchLabel: 
					setSwitchLabel(true);
				break;
				case ItemTypes.SwitchGroupControlled: 
					setSwitchGroupControlled(true);
				break;
				case ItemTypes.SwitchGroupUnControlled: 
					setSwitchGroupUnControlled(true);
				break;
				case ItemTypes.TabLabel: 
					setTabLabel(true);
				break;
				case ItemTypes.TabGroupHorizontal: 
					setTabGroupHorizontal(true);
				break;
				case ItemTypes.TabGroupVertical: 
					setTabGroupVertical(true);
				break;
				case ItemTypes.TabGroupWithDataGrid: 
					setTabGroupWithDataGrid(true);
				break;
				case ItemTypes.TabGroupWithTable: 
					setTabGroupWithTable(true);
				break;
				case ItemTypes.TableBody: 
					setTableBody(true);
				break;
				case ItemTypes.TableBundle: 
					setTableBundle(true);
				break;
				case ItemTypes.TableCell: 
					setTableCell(true);
				break;
				case ItemTypes.TableHeader: 
					setTableHeader(true);
				break;
				case ItemTypes.TableRow: 
					setTableRow(true);
				break;
				case ItemTypes.TextFieldError: 
					setTextFieldError(true);
				break;
				case ItemTypes.TextFieldLabel: 
					setTextFieldLabel(true);
				break;
				case ItemTypes.TextFieldLeft: 
					setTextFieldLeft(true);
				break;
				case ItemTypes.TextFieldRight: 
					setTextFieldRight(true);
				break;
				case ItemTypes.TypographyBody1: 
					setTypographyBody1(true);
				break;
				case ItemTypes.TypographyBody2: 
					setTypographyBody2(true);
				break;
				case ItemTypes.TypographyBody3: 
					setTypographyBody3(true);
				break;
				case ItemTypes.TypographyH1: 
					setTypographyH1(true);
				break;
				case ItemTypes.TypographyGroupText: 
					setTypographyGroupText(true);
				break;
				case ItemTypes.TendonProfileConverterBottomButtons: 
					setTendonProfileConverterBottomButtons(true);
				break;
				case ItemTypes.TendonProfileConverterComposite: 
					setTendonProfileConverterComposite(true);
				break;
				case ItemTypes.TendonProfileConverterHelpIconButton: 
					setTendonProfileConverterHelpIconButton(true);
				break;
				case ItemTypes.TendonProfileConverterList: 
					setTendonProfileConverterList(true);
				break;
				case ItemTypes.TendonProfileConverterSelectButton: 
					setTendonProfileConverterSelectButton(true);
				break;
				case ItemTypes.TendonProfileConverterUpdateButton: 
					setTendonProfileConverterUpdateButton(true);
				break;
				default:
					break;
			}
		});
	}, [Layoutsinfo]);


	const totalCode = `import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
${ buttoncomposite || buttoncontained || buttonnegative || buttonnormal || buttonoutlined || buttontext || buttonwidth ? extractComponentImport(All.ButtonContained) : ""}
${ checknotrequired || checkrequired || checkgroupcontrolled || checkgroupuncontrolled ? extractComponentImport(All.CheckNotRequired) : ""}
${ datagridpagination ? extractComponentImport(All.DataGridPagination) : ""}
${ dialoghelpbutton || dialoghelpiconbutton ? extractComponentImport(All.DialogHelpButton) : ""}
${ droplistdropdown ? extractComponentImport(All.DropListDropdown) : ""}
${ gridcolumn || griditems || gridrow ? extractComponentImport(All.GridColumn) : ""}
${ iconadd || iconclose ? extractComponentImport(All.IconAdd) : ""}
${ iconbuttonadd || iconbuttonclose ? extractComponentImport(All.IconButtonAdd) : ""}
${ listcontrolled || listdynamic || listuncontrolled ? extractComponentImport(All.ListControlled) : ""}
${ listitemdefault ? extractComponentImport(All.ListItemDefault) : ""}
${ listitembuttondefault ? extractComponentImport(All.ListItemButtonDefault) : ""}
${ panelbox || panelshadow || panelstrock ? extractComponentImport(All.PanelBox) : ""}
${ radioname ? extractComponentImport(All.RadioName) : ""}
${ radiogroupcontrolled || radiogroupuncontrolled ? extractComponentImport(All.RadioGroupControlled) : ""}
${ scrollbarscheckgroup || scrollbarslist ? extractComponentImport(All.ScrollbarsCheckGroup) : ""}
${ seperatorhorizontal || seperatorvertical ? extractComponentImport(All.SeperatorHorizontal) : ""}
${ stackcolumn || stackrow ? extractComponentImport(All.StackColumn) : ""}
${ switchlabel ? extractComponentImport(All.SwitchLabel) : ""}
${ switchgroupcontrolled || switchgroupuncontrolled ? extractComponentImport(All.SwitchGroupControlled) : ""}
${ tablabel || switchgroupuncontrolled ? extractComponentImport(All.TabLabel) : ""}
${ tabgrouphorizontal || tabgroupvertical ? extractComponentImport(All.TabGroupHorizontal) : ""}
${ tablebody || tablebundle ? extractComponentImport(All.TableBody) : ""}

function Components(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // do something
  }

	${verifydialogdefault ? extractComponentCode(All.VerifyDialogDefault) : ""}
	${buttoncomposite ? extractComponentCode(All.ButtonComposite) : ""}
	${buttoncontained ? extractComponentCode(All.ButtonContained) : ""}
	${buttonnegative ? extractComponentCode(All.ButtonNegative) : ""}
	${buttonnormal ? extractComponentCode(All.ButtonNormal) : ""}
	${buttonoutlined ? extractComponentCode(All.ButtonOutlined) : ""}
	${buttontext ? extractComponentCode(All.ButtonText) : ""}
	${buttonwidth ? extractComponentCode(All.ButtonWidth) : ""}
	${chartlineaxislegend ? extractComponentCode(All.ChartLineAxisLegend) : ""}
	${chartlineaxispointsize ? extractComponentCode(All.ChartLineAxisPointSize) : ""}
	${chartlineaxistopright ? extractComponentCode(All.ChartLineAxisTopRight) : ""}
	${checknotrequired ? extractComponentCode(All.CheckNotRequired) : ""}
	${checkrequired ? extractComponentCode(All.CheckRequired) : ""}
	${checkgroupcontrolled ? extractComponentCode(All.CheckGroupControlled) : ""}
	${checkgroupuncontrolled ? extractComponentCode(All.CheckGroupUnControlled) : ""}
	${codeblockjavascript ? extractComponentCode(All.CodeBlockJavascript) : ""}
	${codeblocktypescript ? extractComponentCode(All.CodeBlockTypescript) : ""}
	${datagridpagination ? extractComponentCode(All.DataGridPagination) : ""}
	${dialoghelpbutton ? extractComponentCode(All.DialogHelpButton) : ""}
	${dialoghelpiconbutton ? extractComponentCode(All.DialogHelpIconButton) : ""}
	${droplistdropdown ? extractComponentCode(All.DropListDropdown) : ""}
	${gridcolumn ? extractComponentCode(All.GridColumn) : ""}
	${griditems ? extractComponentCode(All.GridItems) : ""}
	${gridrow ? extractComponentCode(All.GridRow) : ""}
	${iconadd ? extractComponentCode(All.IconAdd) : ""}
	${iconclose ? extractComponentCode(All.IconClose) : ""}
	${iconbuttonadd ? extractComponentCode(All.IconButtonAdd) : ""}
	${iconbuttonclose ? extractComponentCode(All.IconButtonClose) : ""}
	${listcontrolled ? extractComponentCode(All.ListControlled) : ""}
	${listdynamic ? extractComponentCode(All.ListDynamic) : ""}
	${listtypographyradio ? extractComponentCode(All.ListTypographyRadio) : ""}
	${listuncontrolled ? extractComponentCode(All.ListUnControlled) : ""}
	${listitemdefault ? extractComponentCode(All.ListItemDefault) : ""}
	${listitembuttondefault ? extractComponentCode(All.ListItemButtonDefault) : ""}
	${panelbox ? extractComponentCode(All.PanelBox) : ""}
	${panelshadow ? extractComponentCode(All.PanelShadow) : ""}
	${panelstrock ? extractComponentCode(All.PanelStrock) : ""}
	${paneltypographydroplist ? extractComponentCode(All.PanelTypographyDropList) : ""}
	${paneltypographytextfield ? extractComponentCode(All.PanelTypographyTextField) : ""}
	${radioname ? extractComponentCode(All.RadioName) : ""}
	${radiogroupcontrolled ? extractComponentCode(All.RadioGroupControlled) : ""}
	${radiogroupuncontrolled ? extractComponentCode(All.RadioGroupUnControlled) : ""}
	${scrollbarscheckgroup ? extractComponentCode(All.ScrollbarsCheckGroup) : ""}
	${scrollbarslist ? extractComponentCode(All.ScrollbarsList) : ""}
	${seperatorhorizontal ? extractComponentCode(All.SeperatorHorizontal) : ""}
	${seperatorvertical ? extractComponentCode(All.SeperatorVertical) : ""}
	${stackcolumn ? extractComponentCode(All.StackColumn) : ""}
	${stackrow ? extractComponentCode(All.StackRow) : ""}
	${switchlabel ? extractComponentCode(All.SwitchLabel) : ""}
	${switchgroupcontrolled ? extractComponentCode(All.SwitchGroupControlled) : ""}
	${switchgroupuncontrolled ? extractComponentCode(All.SwitchGroupUnControlled) : ""}
	${tablabel ? extractComponentCode(All.TabLabel) : ""}
	${tabgrouphorizontal ? extractComponentCode(All.TabGroupHorizontal) : ""}
	${tabgroupvertical ? extractComponentCode(All.TabGroupVertical) : ""}
	${tabgroupwithdatagrid ? extractComponentCode(All.TabGroupWithDataGrid) : ""}
	${tabgroupwithtable ? extractComponentCode(All.TabGroupWithTable) : ""}
	${tablebody ? extractComponentCode(All.TableBody) : ""}
	${tablebundle ? extractComponentCode(All.TableBundle) : ""}
	${tablecell ? extractComponentCode(All.TableCell) : ""}
	${tableheader ? extractComponentCode(All.TableHeader) : ""}
	${tablerow ? extractComponentCode(All.TableRow) : ""}
	${textfielderror ? extractComponentCode(All.TextFieldError) : ""}
	${textfieldlabel ? extractComponentCode(All.TextFieldLabel) : ""}
	${textfieldleft ? extractComponentCode(All.TextFieldLeft) : ""}
	${textfieldright ? extractComponentCode(All.TextFieldRight) : ""}
	${typographybody1 ? extractComponentCode(All.TypographyBody1) : ""}
	${typographybody2 ? extractComponentCode(All.TypographyBody2) : ""}
	${typographybody3 ? extractComponentCode(All.TypographyBody3) : ""}
	${typographyh1 ? extractComponentCode(All.TypographyH1) : ""}
	${typographygrouptext ? extractComponentCode(All.TypographyGroupText) : ""}
	${tendonprofileconverterbottombuttons ? extractComponentCode(All.TendonProfileConverterBottomButtons) : ""}
	${tendonprofileconvertercomposite ? extractComponentCode(All.TendonProfileConverterComposite) : ""}
	${tendonprofileconverterhelpiconbutton ? extractComponentCode(All.TendonProfileConverterHelpIconButton) : ""}
	${tendonprofileconverterlist ? extractComponentCode(All.TendonProfileConverterList) : ""}
	${tendonprofileconverterselectbutton ? extractComponentCode(All.TendonProfileConverterSelectButton) : ""}
	${tendonprofileconverterupdatebutton ? extractComponentCode(All.TendonProfileConverterUpdateButton) : ""}

  return (
    <Box sx={{width: "${Sizewidth}px", height:"${Sizeheight}px", p:"0.5rem", border: '1px solid #bebebe'}}>
			<Grid container spacing={0} style={{height:"100%", position: 'relative'}}>
			${Layoutsinfo.map((item:any, index:any) => {
				return (`
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: '${item.w * Number(Sizewidth) / 12}px', // w값을 colWidth 배수로 계산해 width로 사용합니다.
							height: '${item.h * 30}px', // rowHeight의 배수로 높이를 설정합니다.
							top: '${item.y * 30}px', // y값을 rowHeight 배수로 계산해 top으로 사용합니다.
							left: '${item.x * Number(Sizewidth) / 12}px', // x값을 colWidth 배수로 계산해 left로 사용합니다.
							position: 'absolute' // 위치를 절대값으로 지정합니다.
						}}
					>
						${item.type === ItemTypes.VerifyDialogDefault ? `${extractComponentName(All.VerifyDialogDefault)}` : ""}
						${item.type === ItemTypes.ButtonComposite ? `${extractComponentName(All.ButtonComposite)}` : ""}
						${item.type === ItemTypes.ButtonContained ? `${extractComponentName(All.ButtonContained)}` : ""}
						${item.type === ItemTypes.ButtonNegative ? `${extractComponentName(All.ButtonNegative)}` : ""}
						${item.type === ItemTypes.ButtonNormal ? `${extractComponentName(All.ButtonNormal)}` : ""}
						${item.type === ItemTypes.ButtonOutlined ? `${extractComponentName(All.ButtonOutlined)}` : ""}
						${item.type === ItemTypes.ButtonText ? `${extractComponentName(All.ButtonText)}` : ""}
						${item.type === ItemTypes.ButtonWidth ? `${extractComponentName(All.ButtonWidth)}` : ""}
						${item.type === ItemTypes.ChartLineAxisLegend ? `${extractComponentName(All.ChartLineAxisLegend)}` : ""}
						${item.type === ItemTypes.ChartLineAxisPointSize ? `${extractComponentName(All.ChartLineAxisPointSize)}` : ""}
						${item.type === ItemTypes.ChartLineAxisTopRight ? `${extractComponentName(All.ChartLineAxisTopRight)}` : ""}
						${item.type === ItemTypes.CheckNotRequired ? `${extractComponentName(All.CheckNotRequired)}` : ""}
						${item.type === ItemTypes.CheckRequired ? `${extractComponentName(All.CheckRequired)}` : ""}
						${item.type === ItemTypes.CheckGroupControlled ? `${extractComponentName(All.CheckGroupControlled)}` : ""}
						${item.type === ItemTypes.CheckGroupUnControlled ? `${extractComponentName(All.CheckGroupUnControlled)}` : ""}
						${item.type === ItemTypes.CodeBlockJavascript ? `${extractComponentName(All.CodeBlockJavascript)}` : ""}
						${item.type === ItemTypes.CodeBlockTypescript ? `${extractComponentName(All.CodeBlockTypescript)}` : ""}
						${item.type === ItemTypes.DataGridPagination ? `${extractComponentName(All.DataGridPagination)}` : ""}
						${item.type === ItemTypes.DialogHelpButton ? `${extractComponentName(All.DialogHelpButton)}` : ""}
						${item.type === ItemTypes.DialogHelpIconButton ? `${extractComponentName(All.DialogHelpIconButton)}` : ""}
						${item.type === ItemTypes.DropListDropdown ? `${extractComponentName(All.DropListDropdown)}` : ""}
						${item.type === ItemTypes.GridColumn ? `${extractComponentName(All.GridColumn)}` : ""}
						${item.type === ItemTypes.GridItems ? `${extractComponentName(All.GridItems)}` : ""}
						${item.type === ItemTypes.GridRow ? `${extractComponentName(All.GridRow)}` : ""}
						${item.type === ItemTypes.IconAdd ? `${extractComponentName(All.IconAdd)}` : ""}
						${item.type === ItemTypes.IconClose ? `${extractComponentName(All.IconClose)}` : ""}
						${item.type === ItemTypes.IconButtonAdd ? `${extractComponentName(All.IconButtonAdd)}` : ""}
						${item.type === ItemTypes.IconButtonClose ? `${extractComponentName(All.IconButtonClose)}` : ""}
						${item.type === ItemTypes.ListControlled ? `${extractComponentName(All.ListControlled)}` : ""}
						${item.type === ItemTypes.ListDynamic ? `${extractComponentName(All.ListDynamic)}` : ""}
						${item.type === ItemTypes.ListTypographyRadio ? `${extractComponentName(All.ListTypographyRadio)}` : ""}
						${item.type === ItemTypes.ListUnControlled ? `${extractComponentName(All.ListUnControlled)}` : ""}
						${item.type === ItemTypes.ListItemDefault ? `${extractComponentName(All.ListItemDefault)}` : ""}
						${item.type === ItemTypes.ListItemButtonDefault ? `${extractComponentName(All.ListItemButtonDefault)}` : ""}
						${item.type === ItemTypes.PanelBox ? `${extractComponentName(All.PanelBox)}` : ""}
						${item.type === ItemTypes.PanelShadow ? `${extractComponentName(All.PanelShadow)}` : ""}
						${item.type === ItemTypes.PanelStrock ? `${extractComponentName(All.PanelStrock)}` : ""}
						${item.type === ItemTypes.PanelTypographyDropList ? `${extractComponentName(All.PanelTypographyDropList)}` : ""}
						${item.type === ItemTypes.PanelTypographyTextField ? `${extractComponentName(All.PanelTypographyTextField)}` : ""}
						${item.type === ItemTypes.RadioName ? `${extractComponentName(All.RadioName)}` : ""}
						${item.type === ItemTypes.RadioGroupControlled ? `${extractComponentName(All.RadioGroupControlled)}` : ""}
						${item.type === ItemTypes.RadioGroupUnControlled ? `${extractComponentName(All.RadioGroupUnControlled)}` : ""}
						${item.type === ItemTypes.ScrollbarsCheckGroup ? `${extractComponentName(All.ScrollbarsCheckGroup)}` : ""}
						${item.type === ItemTypes.ScrollbarsList ? `${extractComponentName(All.ScrollbarsList)}` : ""}
						${item.type === ItemTypes.SeperatorHorizontal ? `${extractComponentName(All.SeperatorHorizontal)}` : ""}
						${item.type === ItemTypes.SeperatorVertical ? `${extractComponentName(All.SeperatorVertical)}` : ""}
						${item.type === ItemTypes.StackColumn ? `${extractComponentName(All.StackColumn)}` : ""}
						${item.type === ItemTypes.StackRow ? `${extractComponentName(All.StackRow)}` : ""}
						${item.type === ItemTypes.SwitchLabel ? `${extractComponentName(All.SwitchLabel)}` : ""}
						${item.type === ItemTypes.SwitchGroupControlled ? `${extractComponentName(All.SwitchGroupControlled)}` : ""}
						${item.type === ItemTypes.SwitchGroupUnControlled ? `${extractComponentName(All.SwitchGroupUnControlled)}` : ""}
						${item.type === ItemTypes.TabLabel ? `${extractComponentName(All.TabLabel)}` : ""}
						${item.type === ItemTypes.TabGroupHorizontal ? `${extractComponentName(All.TabGroupHorizontal)}` : ""}
						${item.type === ItemTypes.TabGroupVertical ? `${extractComponentName(All.TabGroupVertical)}` : ""}
						${item.type === ItemTypes.TabGroupWithDataGrid ? `${extractComponentName(All.TabGroupWithDataGrid)}` : ""}
						${item.type === ItemTypes.TabGroupWithTable ? `${extractComponentName(All.TabGroupWithTable)}` : ""}
						${item.type === ItemTypes.TableBody ? `${extractComponentName(All.TableBody)}` : ""}
						${item.type === ItemTypes.TableBundle ? `${extractComponentName(All.TableBundle)}` : ""}
						${item.type === ItemTypes.TableCell ? `${extractComponentName(All.TableCell)}` : ""}
						${item.type === ItemTypes.TableHeader ? `${extractComponentName(All.TableHeader)}` : ""}
						${item.type === ItemTypes.TableRow ? `${extractComponentName(All.TableRow)}` : ""}
						${item.type === ItemTypes.TextFieldError ? `${extractComponentName(All.TextFieldError)}` : ""}
						${item.type === ItemTypes.TextFieldLabel ? `${extractComponentName(All.TextFieldLabel)}` : ""}
						${item.type === ItemTypes.TextFieldLeft ? `${extractComponentName(All.TextFieldLeft)}` : ""}
						${item.type === ItemTypes.TextFieldRight ? `${extractComponentName(All.TextFieldRight)}` : ""}
						${item.type === ItemTypes.TypographyBody1 ? `${extractComponentName(All.TypographyBody1)}` : ""}
						${item.type === ItemTypes.TypographyBody2 ? `${extractComponentName(All.TypographyBody2)}` : ""}
						${item.type === ItemTypes.TypographyBody3 ? `${extractComponentName(All.TypographyBody3)}` : ""}
						${item.type === ItemTypes.TypographyH1 ? `${extractComponentName(All.TypographyH1)}` : ""}
						${item.type === ItemTypes.TypographyGroupText ? `${extractComponentName(All.TypographyGroupText)}` : ""}
						${item.type === ItemTypes.TendonProfileConverterBottomButtons ? `${extractComponentName(All.TendonProfileConverterBottomButtons)}` : ""}
						${item.type === ItemTypes.TendonProfileConverterComposite ? `${extractComponentName(All.TendonProfileConverterComposite)}` : ""}
						${item.type === ItemTypes.TendonProfileConverterHelpIconButton ? `${extractComponentName(All.TendonProfileConverterHelpIconButton)}` : ""}
						${item.type === ItemTypes.TendonProfileConverterList ? `${extractComponentName(All.TendonProfileConverterList)}` : ""}
						${item.type === ItemTypes.TendonProfileConverterSelectButton ? `${extractComponentName(All.TendonProfileConverterSelectButton)}` : ""}
						${item.type === ItemTypes.TendonProfileConverterUpdateButton ? `${extractComponentName(All.TendonProfileConverterUpdateButton)}` : ""}
					</div>`
				)
			})}
			</Grid>
    </Box>
  )
}`;

	function remove3Comma(str:string){
		let result = str.replace(/,{3}/g, "");
		let result2 = result.replace(/>,/g, ">");
		return result2;
	}

	return (
		<CodeComponent
			language="typescript"
			title='Plugin UI React Code'
			children={String(remove3Comma(totalCode)).replace(/\n$/, "")}
		/>
	);
}