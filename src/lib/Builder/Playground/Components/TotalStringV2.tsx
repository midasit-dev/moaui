import React from "react";
import { TemplateWidth, TemplateHeight, LayoutsInfo } from '../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import CodeComponent from "../../../Components/CodeBlock";
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
	return code.importCodes[0];
}

export default function TotalCodeString(){
	const Sizewidth = useRecoilValue(TemplateWidth);
	const Sizeheight = useRecoilValue(TemplateHeight);
	const Layoutsinfo = useRecoilValue(LayoutsInfo);

	function makeImportlist() : string {
		let importlist : string[] = Layoutsinfo.map((value: any) => {
			let extractCode : string = "";
			if(value.type === ItemTypes.ButtonContained || value.type === ItemTypes.ButtonComposite || value.type === ItemTypes.ButtonNegative || value.type === ItemTypes.ButtonNormal || value.type === ItemTypes.ButtonOutlined || value.type === ItemTypes.ButtonText || value.type === ItemTypes.ButtonWidth)
				extractCode = extractComponentImport(All.ButtonContained);
			else if(value.type === ItemTypes.CheckNotRequired || value.type === ItemTypes.CheckRequired || value.type === ItemTypes.CheckGroupStateful || value.type === ItemTypes.CheckGroupUnControlled)
				extractCode = extractComponentImport(All.CheckNotRequired);
			else if(value.type === ItemTypes.DataGridPagination)
				extractCode = extractComponentImport(All.DataGridPagination);
			else if(value.type === ItemTypes.DialogHelpButton || value.type === ItemTypes.DialogHelpIconButton)
				extractCode = extractComponentImport(All.DialogHelpButton);
			else if(value.type === ItemTypes.DropListDropdown)
				extractCode = extractComponentImport(All.DropListDropdown);
			else if(value.type === ItemTypes.GridColumn || value.type === ItemTypes.GridItems || value.type === ItemTypes.GridRow)
				extractCode = extractComponentImport(All.GridColumn);
			else if(value.type === ItemTypes.IconAdd || value.type === ItemTypes.IconClose)
				extractCode = extractComponentImport(All.IconAdd);
			else if(value.type === ItemTypes.IconButtonAdd || value.type === ItemTypes.IconButtonClose)
				extractCode = extractComponentImport(All.IconButtonAdd);
			else if(value.type === ItemTypes.ListControlled || value.type === ItemTypes.ListDynamic || value.type === ItemTypes.ListUnControlled)
				extractCode = extractComponentImport(All.ListControlled);
			else if(value.type === ItemTypes.ListItemDefault)
				extractCode = extractComponentImport(All.ListItemDefault);
			else if(value.type === ItemTypes.ListItemButtonDefault)
				extractCode = extractComponentImport(All.ListItemButtonDefault);
			else if(value.type === ItemTypes.PanelBox || value.type === ItemTypes.PanelShadow || value.type === ItemTypes.PanelStrock)
				extractCode = extractComponentImport(All.PanelBox);
			else if(value.type === ItemTypes.RadioName)
				extractCode = extractComponentImport(All.RadioName);
			else if(value.type === ItemTypes.RadioGroupControlled || value.type === ItemTypes.RadioGroupUnControlled)
				extractCode = extractComponentImport(All.RadioGroupControlled);
			else if(value.type === ItemTypes.ScrollbarsCheckGroup || value.type === ItemTypes.ScrollbarsList)
				extractCode = extractComponentImport(All.ScrollbarsCheckGroup);
			else if(value.type === ItemTypes.SeperatorHorizontal || value.type === ItemTypes.SeperatorVertical)
				extractCode = extractComponentImport(All.SeperatorHorizontal);
			else if(value.type === ItemTypes.StackColumn || value.type === ItemTypes.StackRow)
				extractCode = extractComponentImport(All.StackColumn);
			else if(value.type === ItemTypes.SwitchLabel)
				extractCode = extractComponentImport(All.SwitchLabel);
			else if(value.type === ItemTypes.SwitchGroupControlled || value.type === ItemTypes.SwitchGroupUnControlled)
				extractCode = extractComponentImport(All.SwitchGroupControlled);
			else if(value.type === ItemTypes.TabLabel)
				extractCode = extractComponentImport(All.TabLabel);
			else if(value.type === ItemTypes.TabGroupHorizontal || value.type === ItemTypes.TabGroupVertical)
				extractCode = extractComponentImport(All.TabGroupHorizontal);
			else if(value.type === ItemTypes.TableBody || value.type === ItemTypes.TableBundle)
				extractCode = extractComponentImport(All.TableBody);
			else if(value.type === ItemTypes.TableCell || value.type === ItemTypes.TableHeader || value.type === ItemTypes.TableRow)
				extractCode = extractComponentImport(All.TableCell);
			else if(value.type === ItemTypes.TextFieldBasic || value.type === ItemTypes.TextFieldError || value.type === ItemTypes.TextFieldLabel || value.type === ItemTypes.TextFieldLeft || value.type === ItemTypes.TextFieldRight)
				extractCode = extractComponentImport(All.TextFieldError);
			else if(value.type === ItemTypes.TypographyBody1 || value.type === ItemTypes.TypographyBody2 || value.type === ItemTypes.TypographyBody3 || value.type === ItemTypes.TypographyH1 || value.type === ItemTypes.TypographyGroupText)
				extractCode = extractComponentImport(All.TypographyBody1);
			else if(value.type === ItemTypes.TendonProfileConverterBottomButtons)
				extractCode = extractComponentImport(All.TendonProfileConverterBottomButtons);
			else if(value.type === ItemTypes.TendonProfileConverterComposite)
				extractCode = extractComponentImport(All.TendonProfileConverterComposite);
			else if(value.type === ItemTypes.TendonProfileConverterHelpIconButton)
				extractCode = extractComponentImport(All.TendonProfileConverterHelpIconButton);
			else if(value.type === ItemTypes.TendonProfileConverterList)
				extractCode = extractComponentImport(All.TendonProfileConverterList);
			else if(value.type === ItemTypes.TendonProfileConverterSelectButton)
				extractCode = extractComponentImport(All.TendonProfileConverterSelectButton);
			else if(value.type === ItemTypes.TendonProfileConverterUpdateButton)
				extractCode = extractComponentImport(All.TendonProfileConverterUpdateButton);
			
			extractCode = extractCode.replace(/import { /ig, "");
			extractCode = extractCode.replace(/ } from "@midasit-dev\/moaui";/ig, "");
			return extractCode;
		});
		importlist.splice(0,1);
		// console.log("Import List : ", importlist); // ex) ["button", "button"]
		// remove duplicate elements
		let firstSetImportList: string[] = Array.from(new Set(importlist));
		// console.log("firstSetImportList : ", firstSetImportList.join(", ")); // ex) ["button"]
		let firstSetImportListText = firstSetImportList.join(", ");
		firstSetImportListText = firstSetImportListText.replace(/ ,/ig, ",");
		const splitRemakeImportList = firstSetImportListText.split(", ");
		// console.log("splitRemakeImportList: ",splitRemakeImportList);
		const SetImportList: string[] = Array.from(new Set(splitRemakeImportList));
		const importString = `import { ${SetImportList.join(", ")} } from "@midasit-dev/moaui";`;
		//console.log("importString : ", importString); // ex) import { button } from "@midasit-dev/moaui";
		return importString;
	}

	function makeCompoCodeList(){
		const uniqueLayoutTypes = Array.from(new Set(Layoutsinfo.map((value: any) => value.type)));
		const compoCodeList = uniqueLayoutTypes.map((value: any) => {
			let extractCode : any = "";
			if(value === ItemTypes.VerifyDialogDefault)
				extractCode = extractComponentCode(All.VerifyDialogDefault);
			else if(value === ItemTypes.ButtonComposite)
				extractCode = extractComponentCode(All.ButtonComposite);
			else if(value === ItemTypes.ButtonContained)
				extractCode = extractComponentCode(All.ButtonContained);
			else if(value === ItemTypes.ButtonNegative)
				extractCode = extractComponentCode(All.ButtonNegative);
			else if(value === ItemTypes.ButtonNormal)
				extractCode = extractComponentCode(All.ButtonNormal);
			else if(value === ItemTypes.ButtonOutlined)
				extractCode = extractComponentCode(All.ButtonOutlined);
			else if(value === ItemTypes.ButtonText)
				extractCode = extractComponentCode(All.ButtonText);
			else if(value === ItemTypes.ButtonWidth)
				extractCode = extractComponentCode(All.ButtonWidth);
			else if(value === ItemTypes.ChartLineAxisLegend)
				extractCode = extractComponentCode(All.ChartLineAxisLegend);
			else if(value === ItemTypes.ChartLineAxisPointSize)
				extractCode = extractComponentCode(All.ChartLineAxisPointSize);
			else if(value === ItemTypes.ChartLineAxisTopRight)
				extractCode = extractComponentCode(All.ChartLineAxisTopRight);
			else if(value === ItemTypes.CheckNotRequired)
				extractCode = extractComponentCode(All.CheckNotRequired);
			else if(value === ItemTypes.CheckRequired)
				extractCode = extractComponentCode(All.CheckRequired);
			else if(value === ItemTypes.CheckGroupStateful)
				extractCode = extractComponentCode(All.CheckGroupStateful);
			else if(value === ItemTypes.CheckGroupUnControlled)
				extractCode = extractComponentCode(All.CheckGroupUnControlled);
			else if(value === ItemTypes.CodeBlockJavascript)
				extractCode = extractComponentCode(All.CodeBlockJavascript);
			else if(value === ItemTypes.CodeBlockTypescript)
				extractCode = extractComponentCode(All.CodeBlockTypescript);
			else if(value === ItemTypes.DataGridPagination)
				extractCode = extractComponentCode(All.DataGridPagination);
			else if(value === ItemTypes.DialogHelpButton)
				extractCode = extractComponentCode(All.DialogHelpButton);
			else if(value === ItemTypes.DialogHelpIconButton)
				extractCode = extractComponentCode(All.DialogHelpIconButton);
			else if(value === ItemTypes.DropListDropdown)
				extractCode = extractComponentCode(All.DropListDropdown);
			else if(value === ItemTypes.GridColumn)
				extractCode = extractComponentCode(All.GridColumn);
			else if(value === ItemTypes.GridItems)
				extractCode = extractComponentCode(All.GridItems);
			else if(value === ItemTypes.GridRow)
				extractCode = extractComponentCode(All.GridRow);
			else if(value === ItemTypes.IconAdd)
				extractCode = extractComponentCode(All.IconAdd);
			else if(value === ItemTypes.IconClose)
				extractCode = extractComponentCode(All.IconClose);
			else if(value === ItemTypes.IconButtonAdd)
				extractCode = extractComponentCode(All.IconButtonAdd);
			else if(value === ItemTypes.IconButtonClose)
				extractCode = extractComponentCode(All.IconButtonClose);
			else if(value === ItemTypes.ListControlled)
				extractCode = extractComponentCode(All.ListControlled);
			else if(value === ItemTypes.ListDynamic)
				extractCode = extractComponentCode(All.ListDynamic);
			else if(value === ItemTypes.ListTypographyRadio)
				extractCode = extractComponentCode(All.ListTypographyRadio);
			else if(value === ItemTypes.ListUnControlled)
				extractCode = extractComponentCode(All.ListUnControlled);
			else if(value === ItemTypes.ListItemDefault)
				extractCode = extractComponentCode(All.ListItemDefault);
			else if(value === ItemTypes.ListItemButtonDefault)
				extractCode = extractComponentCode(All.ListItemButtonDefault);
			else if(value === ItemTypes.PanelBox)
				extractCode = extractComponentCode(All.PanelBox);
			else if(value === ItemTypes.PanelShadow)
				extractCode = extractComponentCode(All.PanelShadow);
			else if(value === ItemTypes.PanelStrock)
				extractCode = extractComponentCode(All.PanelStrock);
			else if(value === ItemTypes.PanelTypographyDropList)
				extractCode = extractComponentCode(All.PanelTypographyDropList);
			else if(value === ItemTypes.PanelTypographyTextField)
				extractCode = extractComponentCode(All.PanelTypographyTextField);
			else if(value === ItemTypes.RadioName)
				extractCode = extractComponentCode(All.RadioName);
			else if(value === ItemTypes.RadioGroupControlled)
				extractCode = extractComponentCode(All.RadioGroupControlled);
			else if(value === ItemTypes.RadioGroupUnControlled)
				extractCode = extractComponentCode(All.RadioGroupUnControlled);
			else if(value === ItemTypes.ScrollbarsCheckGroup)
				extractCode = extractComponentCode(All.ScrollbarsCheckGroup);
			else if(value === ItemTypes.ScrollbarsList)
				extractCode = extractComponentCode(All.ScrollbarsList);
			else if(value === ItemTypes.SeperatorHorizontal)
				extractCode = extractComponentCode(All.SeperatorHorizontal);
			else if(value === ItemTypes.SeperatorVertical)
				extractCode = extractComponentCode(All.SeperatorVertical);
			else if(value === ItemTypes.StackColumn)
				extractCode = extractComponentCode(All.StackColumn);
			else if(value === ItemTypes.StackRow)
				extractCode = extractComponentCode(All.StackRow);
			else if(value === ItemTypes.SwitchLabel)
				extractCode = extractComponentCode(All.SwitchLabel);
			else if(value === ItemTypes.SwitchGroupControlled)
				extractCode = extractComponentCode(All.SwitchGroupControlled);
			else if(value === ItemTypes.SwitchGroupUnControlled)
				extractCode = extractComponentCode(All.SwitchGroupUnControlled);
			else if(value === ItemTypes.TabLabel)
				extractCode = extractComponentCode(All.TabLabel);
			else if(value === ItemTypes.TabGroupHorizontal)
				extractCode = extractComponentCode(All.TabGroupHorizontal);
			else if(value === ItemTypes.TabGroupVertical)
				extractCode = extractComponentCode(All.TabGroupVertical);
			else if(value === ItemTypes.TabGroupWithDataGrid)
				extractCode = extractComponentCode(All.TabGroupWithDataGrid);
			else if(value === ItemTypes.TabGroupWithTable)
				extractCode = extractComponentCode(All.TabGroupWithTable);
			else if(value === ItemTypes.TableBody)
				extractCode = extractComponentCode(All.TableBody);
			else if(value === ItemTypes.TableBundle)
				extractCode = extractComponentCode(All.TableBundle);
			else if(value === ItemTypes.TableCell)
				extractCode = extractComponentCode(All.TableCell);
			else if(value === ItemTypes.TableHeader)
				extractCode = extractComponentCode(All.TableHeader);
			else if(value === ItemTypes.TableRow)
				extractCode = extractComponentCode(All.TableRow);
			else if(value === ItemTypes.TextFieldBasic)
				extractCode = extractComponentCode(All.TextFieldBasic);
			else if(value === ItemTypes.TextFieldError)
				extractCode = extractComponentCode(All.TextFieldError);
			else if(value === ItemTypes.TextFieldLabel)
				extractCode = extractComponentCode(All.TextFieldLabel);
			else if(value === ItemTypes.TextFieldLeft)
				extractCode = extractComponentCode(All.TextFieldLeft);
			else if(value === ItemTypes.TextFieldRight)
				extractCode = extractComponentCode(All.TextFieldRight);
			else if(value === ItemTypes.TypographyBody1)
				extractCode = extractComponentCode(All.TypographyBody1);
			else if(value === ItemTypes.TypographyBody2)
				extractCode = extractComponentCode(All.TypographyBody2);
			else if(value === ItemTypes.TypographyBody3)
				extractCode = extractComponentCode(All.TypographyBody3);
			else if(value === ItemTypes.TypographyH1)
				extractCode = extractComponentCode(All.TypographyH1);
			else if(value === ItemTypes.TypographyGroupText)
				extractCode = extractComponentCode(All.TypographyGroupText);
			else if(value === ItemTypes.TendonProfileConverterBottomButtons)
				extractCode = extractComponentCode(All.TendonProfileConverterBottomButtons);
			else if(value === ItemTypes.TendonProfileConverterComposite)
				extractCode = extractComponentCode(All.TendonProfileConverterComposite);
			else if(value === ItemTypes.TendonProfileConverterHelpIconButton)
				extractCode = extractComponentCode(All.TendonProfileConverterHelpIconButton);
			else if(value === ItemTypes.TendonProfileConverterList)
				extractCode = extractComponentCode(All.TendonProfileConverterList);
			else if(value === ItemTypes.TendonProfileConverterSelectButton)
				extractCode = extractComponentCode(All.TendonProfileConverterSelectButton);
			else if(value === ItemTypes.TendonProfileConverterUpdateButton)
				extractCode = extractComponentCode(All.TendonProfileConverterUpdateButton);
		
			return extractCode;
		});

		return compoCodeList.join("");
	}

	function makeComponentlist(){
		const componentlist = Layoutsinfo.map((item:any, index:any) => {
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
					${item.type === ItemTypes.VerifyDialogLoading ? `${extractComponentName(All.VerifyDialogLoading)}` : ""}
					${item.type === ItemTypes.AlertError ? `${extractComponentName(All.AlertError)}` : ""}
					${item.type === ItemTypes.ButtonComposite ? `${extractComponentName(All.ButtonComposite)}` : ""}
					${item.type === ItemTypes.ButtonContained ? `${extractComponentName(All.ButtonContained)}` : ""}
					${item.type === ItemTypes.ButtonLoading ? `${extractComponentName(All.ButtonLoading)}` : ""}
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
					${item.type === ItemTypes.CheckGroupStateful ? `${extractComponentName(All.CheckGroupStateful)}` : ""}
					${item.type === ItemTypes.CheckGroupUnControlled ? `${extractComponentName(All.CheckGroupUnControlled)}` : ""}
					${item.type === ItemTypes.ChipDefault ? `${extractComponentName(All.ChipDefault)}` : ""}
					${item.type === ItemTypes.CodeBlockHideTitle ? `${extractComponentName(All.CodeBlockHideTitle)}` : ""}
					${item.type === ItemTypes.CodeBlockJavascript ? `${extractComponentName(All.CodeBlockJavascript)}` : ""}
					${item.type === ItemTypes.CodeBlockTypescript ? `${extractComponentName(All.CodeBlockTypescript)}` : ""}
					${item.type === ItemTypes.DataGridPagination ? `${extractComponentName(All.DataGridPagination)}` : ""}
					${item.type === ItemTypes.DialogDialogButton ? `${extractComponentName(All.DialogDialogButton)}` : ""}
					${item.type === ItemTypes.DialogHelpButton ? `${extractComponentName(All.DialogHelpButton)}` : ""}
					${item.type === ItemTypes.DialogHelpIconButton ? `${extractComponentName(All.DialogHelpIconButton)}` : ""}
					${item.type === ItemTypes.DialogOnClose ? `${extractComponentName(All.DialogOnClose)}` : ""}
					${item.type === ItemTypes.DropListDropdown ? `${extractComponentName(All.DropListDropdown)}` : ""}
					${item.type === ItemTypes.GridColumn ? `${extractComponentName(All.GridColumn)}` : ""}
					${item.type === ItemTypes.GridItems ? `${extractComponentName(All.GridItems)}` : ""}
					${item.type === ItemTypes.GridRow ? `${extractComponentName(All.GridRow)}` : ""}
					${item.type === ItemTypes.GuideBoxBasic300x300 ? `${extractComponentName(All.GuideBoxBasic300x300)}` : ""}
					${item.type === ItemTypes.GuideBoxLayout1 ? `${extractComponentName(All.GuideBoxLayout1)}` : ""}
					${item.type === ItemTypes.GuideBoxLayout2 ? `${extractComponentName(All.GuideBoxLayout2)}` : ""}
					${item.type === ItemTypes.GuideBoxLayout3 ? `${extractComponentName(All.GuideBoxLayout3)}` : ""}
					${item.type === ItemTypes.GuideBoxLayout4 ? `${extractComponentName(All.GuideBoxLayout4)}` : ""}
					${item.type === ItemTypes.GuideBoxLayout5 ? `${extractComponentName(All.GuideBoxLayout5)}` : ""}
					${item.type === ItemTypes.GuideBoxLoading ? `${extractComponentName(All.GuideBoxLoading)}` : ""}
					${item.type === ItemTypes.GuideBoxOpacity ? `${extractComponentName(All.GuideBoxOpacity)}` : ""}
					${item.type === ItemTypes.GuideBoxPulse ? `${extractComponentName(All.GuideBoxPulse)}` : ""}
					${item.type === ItemTypes.GuideBoxRowDirection ? `${extractComponentName(All.GuideBoxRowDirection)}` : ""}
					${item.type === ItemTypes.IconAdd ? `${extractComponentName(All.IconAdd)}` : ""}
					${item.type === ItemTypes.IconClose ? `${extractComponentName(All.IconClose)}` : ""}
					${item.type === ItemTypes.IconButtonAdd ? `${extractComponentName(All.IconButtonAdd)}` : ""}
					${item.type === ItemTypes.IconButtonClose ? `${extractComponentName(All.IconButtonClose)}` : ""}
					${item.type === ItemTypes.IconButtonWithName ? `${extractComponentName(All.IconButtonWithName)}` : ""}
					${item.type === ItemTypes.ListControlled ? `${extractComponentName(All.ListControlled)}` : ""}
					${item.type === ItemTypes.ListDynamic ? `${extractComponentName(All.ListDynamic)}` : ""}
					${item.type === ItemTypes.ListTypographyRadio ? `${extractComponentName(All.ListTypographyRadio)}` : ""}
					${item.type === ItemTypes.ListUnControlled ? `${extractComponentName(All.ListUnControlled)}` : ""}
					${item.type === ItemTypes.ListItemDefault ? `${extractComponentName(All.ListItemDefault)}` : ""}
					${item.type === ItemTypes.ListItemButtonDefault ? `${extractComponentName(All.ListItemButtonDefault)}` : ""}
					${item.type === ItemTypes.PanelBox ? `${extractComponentName(All.PanelBox)}` : ""}
					${item.type === ItemTypes.PanelShadow ? `${extractComponentName(All.PanelShadow)}` : ""}
					${item.type === ItemTypes.PanelShadow2 ? `${extractComponentName(All.PanelShadow2)}` : ""}
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
					${item.type === ItemTypes.TableWithTitle ? `${extractComponentName(All.TableWithTitle)}` : ""}
					${item.type === ItemTypes.TextFieldBasic ? `${extractComponentName(All.TextFieldBasic)}` : ""}
					${item.type === ItemTypes.TextFieldError ? `${extractComponentName(All.TextFieldError)}` : ""}
					${item.type === ItemTypes.TextFieldLabel ? `${extractComponentName(All.TextFieldLabel)}` : ""}
					${item.type === ItemTypes.TextFieldLeft ? `${extractComponentName(All.TextFieldLeft)}` : ""}
					${item.type === ItemTypes.TextFieldMultiLine ? `${extractComponentName(All.TextFieldMultiLine)}` : ""}
					${item.type === ItemTypes.TextFieldRight ? `${extractComponentName(All.TextFieldRight)}` : ""}
					${item.type === ItemTypes.TooltipRight ? `${extractComponentName(All.TooltipRight)}` : ""}
					${item.type === ItemTypes.TypographyBody1 ? `${extractComponentName(All.TypographyBody1)}` : ""}
					${item.type === ItemTypes.TypographyBody2 ? `${extractComponentName(All.TypographyBody2)}` : ""}
					${item.type === ItemTypes.TypographyBody3 ? `${extractComponentName(All.TypographyBody3)}` : ""}
					${item.type === ItemTypes.TypographyH1 ? `${extractComponentName(All.TypographyH1)}` : ""}
					${item.type === ItemTypes.TypographyGroupText ? `${extractComponentName(All.TypographyGroupText)}` : ""}
					${item.type === ItemTypes.DualComponentsTypographyDropListSpaceBetween ? `${extractComponentName(All.DualComponentsTypographyDropListSpaceBetween)}` : ""}
					${item.type === ItemTypes.DualComponentsTypographyTextFieldSpaceBetween ? `${extractComponentName(All.DualComponentsTypographyTextFieldSpaceBetween)}` : ""}
					${item.type === ItemTypes.TendonProfileConverterBottomButtons ? `${extractComponentName(All.TendonProfileConverterBottomButtons)}` : ""}
					${item.type === ItemTypes.TendonProfileConverterComposite ? `${extractComponentName(All.TendonProfileConverterComposite)}` : ""}
					${item.type === ItemTypes.TendonProfileConverterHelpIconButton ? `${extractComponentName(All.TendonProfileConverterHelpIconButton)}` : ""}
					${item.type === ItemTypes.TendonProfileConverterList ? `${extractComponentName(All.TendonProfileConverterList)}` : ""}
					${item.type === ItemTypes.TendonProfileConverterSelectButton ? `${extractComponentName(All.TendonProfileConverterSelectButton)}` : ""}
					${item.type === ItemTypes.TendonProfileConverterUpdateButton ? `${extractComponentName(All.TendonProfileConverterUpdateButton)}` : ""}
				</div>`
			)
		});

		return componentlist.join("");
	}

	const totalCode = `import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
${ makeImportlist() }

function Components(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // do something
  }

${ makeCompoCodeList() }

  return (
    <Box sx={{width: "${Sizewidth}px", height:"${Sizeheight}px", p:"0.5rem", border: '1px solid #bebebe'}}>
			<Grid container spacing={0} style={{height:"100%", position: 'relative'}}>
${ makeComponentlist() }
			</Grid>
    </Box>
  )
}

export default Components;`;

	function remove3Comma(str:string){
		let result = str.replace(/,{3}/g, "");
		result = result.replace(/,import/ig, "\nimport");
		return result;
	}

	return (
		<CodeComponent
			language="typescript"
			title='Plugin UI React Code'
			children={String(remove3Comma(totalCode)).replace(/\n$/, "")}
		/>
	);
}