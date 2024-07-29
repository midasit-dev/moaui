/// <amd-module name="@midasit-dev/moaui-components-v1"/>


// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝

import './Style/Font';

// moaui common
import { type CustomUnionType } from './Common/UnionType';

// moaui style
import { default as Color } from "./Style/Color";
import { default as Font } from "./Style/Font";

// moaui components
import { default as Alert, type AlertProps, AlertSample } from "./Components/Alert";
import { default as Button, type ButtonProps, ButtonSample } from "./Components/Button";
import { default as ChartLine, type ChartLineProps, ChartLineSample } from "./Components/ChartLine";
import { default as Check, type CheckProps, CheckSample } from "./Components/Check";
import { default as CheckGroup, type CheckGroupProps, CheckGroupSample } from "./Components/CheckGroup";
import { default as Chip, type ChipProps, ChipSample } from "./Components/Chip";
import { default as CodeBlock, type CodeBlockProps, CodeBlockSample } from "./Components/CodeBlock";
import { default as ColorPicker, type ColorPickerProps, ColorPickerSample } from "./Components/ColorPicker";
import { default as Dialog, type DialogProps, DialogSample } from "./Components/Dialog";
import { default as DataGrid, DataGridToolbar, DataGridToolbarContainer, DataGridToolbarExport, type DataGridProps, DataGridSample } from "./Components/DataGrid";
import { default as DropList, type DropListProps, DropListSample } from "./Components/DropList";
import { default as FloatingBox, type FloatingBoxProps, FloatingBoxSample } from "./Components/FloatingBox";
import { default as Grid, type GridProps, GridSample } from "./Components/Grid";
import { default as GuideBox, type GuideBoxProps, GuideBoxSample, GuideBoxFillColor } from "./Components/GuideBox";
import { default as Icon, type IconProps, IconSample } from "./Components/Icon";
import { default as IconButton, type IconButtonProps, IconButtonSample } from "./Components/IconButton";
import { default as List, type ListProps, ListSample } from "./Components/List";
import { default as ListItem, type ListItemProps, ListItemSample } from "./Components/ListItem";
import { default as ListItemButton, type ListItemButtonProps, ListItemButtonSample } from "./Components/ListItemButton";
import { default as MidasController, type MidasControllerProps, MidasControllerSample } from './Components/MidasController';
import { default as Panel, type PanelProps, PanelSample } from "./Components/Panel";
import { default as Radio, type RadioProps, RadioSample } from "./Components/Radio";
import { default as RadioGroup, type RadioGroupProps, RadioGroupSample } from "./Components/RadioGroup";
import { default as ScatterPlot, type ScatterPlotProps, ScatterPlotSample } from "./Components/ScatterPlot";
import { default as Scrollbars, type ScrollbarsProps, ScrollbarsSample } from "./Components/Scrollbars";
import { default as Separator, type SeparatorProps, SeparatorSample } from "./Components/Separator";
import { default as Stack, type StackProps, StackSample } from "./Components/Stack";
import { default as Switch, type SwitchProps, SwitchSample } from "./Components/Switch";
import { default as SwitchGroup, type SwitchGroupProps, SwitchGroupSample } from "./Components/SwitchGroup";
import { default as Tab, type TabProps, TabSample } from "./Components/Tab";
import { default as TabGroup, type TabGroupProps, TabGroupSample } from "./Components/TabGroup";
import { default as Table, type TableProps, TableSample } from "./Components/Table";
import { default as TableBody } from "./Components/TableBody";
import { default as TableCell } from "./Components/TableCell";
import { default as TableHead } from "./Components/TableHead";
import { default as TableRow } from "./Components/TableRow";
import { default as TextField, type TextFieldProps, TextFieldSample } from "./Components/TextField";
import { default as TextFieldV2, type TextFieldV2Props, TextFieldV2Sample } from "./Components/TextFieldV2";
import { default as Tooltip, type TooltipProps, TooltipSample } from "./Components/Tooltip";
import { default as Typography, type TypographyProps, TypographySample } from "./Components/Typography";
import { default as TypographyGroup, type TypographyGroupProps, TypographyGroupSample } from "./Components/TypographyGroup";
import { default as SVG, type SVGProps, SVGSample } from "./Components/SVG";

import { default as AutoDropList, AutoDropListSample } from "./Templates/AutoDropList/Code/AutoDropList.code";

// moaui authentication
import { default as VerifyDialog } from "./Authentication/VerifyDialog";
import { default as VerifyUtil } from "./Authentication/VerifyUtil";

// Signature Logger
import { default as Signature } from "./Signature";

// ███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗     ██╗██╗   ██╗ █████╗ ██████╗ ██╗ 
// ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔╝██║   ██║██╔══██╗██╔══██╗╚██╗
// █████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗    ██║ ██║   ██║███████║██████╔╝ ██║
// ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║    ██║ ╚██╗ ██╔╝██╔══██║██╔══██╗ ██║
// ███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║    ╚██╗ ╚████╔╝ ██║  ██║██║  ██║██╔╝
// ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝     ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ 

const Moaui = {
  Color,
  Font,
	VerifyDialog,
  VerifyUtil,
  Signature,

	Alert, AlertSample,
  Button, ButtonSample,
	ChartLine, ChartLineSample,
  Check, CheckSample,
  CheckGroup, CheckGroupSample,
	Chip, ChipSample,
	CodeBlock, CodeBlockSample,
  ColorPicker, ColorPickerSample,
  DataGrid, DataGridToolbar, DataGridToolbarContainer, DataGridToolbarExport, DataGridSample,
  Dialog, DialogSample,
  DropList, DropListSample,
	FloatingBox, FloatingBoxSample,
  Grid, GridSample,
	GuideBox, GuideBoxSample,
	Icon, IconSample,
  IconButton, IconButtonSample,
	List, ListSample,
	ListItem, ListItemSample,
	ListItemButton, ListItemButtonSample,
	MidasController, MidasControllerSample,
  Panel, PanelSample,
  Radio, RadioSample, 
  RadioGroup, RadioGroupSample,
	ScatterPlot, ScatterPlotSample,
  Scrollbars, ScrollbarsSample,
  Separator, SeparatorSample,
  Stack, StackSample,
  Switch, SwitchSample,
  SwitchGroup, SwitchGroupSample,
  Tab, TabSample,
	TabGroup, TabGroupSample,
  Table, TableSample,
  TableBody, TableCell, TableHead, TableRow,
  TextField, TextFieldSample,
  TextFieldV2, TextFieldV2Sample,
  Tooltip, TooltipSample,
  Typography, TypographySample,
  TypographyGroup, TypographyGroupSample,
	SVG, SVGSample,
  AutoDropList, AutoDropListSample,
};

export default Moaui;

// ███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// █████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝

export {
	CustomUnionType,
  Color,
  Font,
	VerifyDialog,
  VerifyUtil,
  Signature,

	Alert, AlertSample, type AlertProps,
  Button, ButtonSample, type ButtonProps,
	ChartLine, ChartLineSample, type ChartLineProps,
  Check, CheckSample, type CheckProps,
  CheckGroup, CheckGroupSample, type CheckGroupProps,
	Chip, ChipSample, type ChipProps,
	CodeBlock, CodeBlockSample, type CodeBlockProps,
  ColorPicker, ColorPickerSample, type ColorPickerProps,
  DataGrid, DataGridToolbar, DataGridToolbarContainer, DataGridToolbarExport, DataGridSample, type DataGridProps,
  Dialog, DialogSample, type DialogProps,
	DropList, DropListSample, type DropListProps,
	FloatingBox, FloatingBoxSample, type FloatingBoxProps,
	Grid, GridSample, type GridProps,
	GuideBox, GuideBoxSample, type GuideBoxProps, GuideBoxFillColor,
	Icon, IconSample, type IconProps,
  IconButton, IconButtonSample, type IconButtonProps,
	List, ListSample, type ListProps,
  ListItem, ListItemSample, type ListItemProps,
  ListItemButton, ListItemButtonSample, type ListItemButtonProps,
	MidasController, MidasControllerSample, type MidasControllerProps,
  Panel, PanelSample, type PanelProps,
  Radio, RadioSample, type RadioProps,
  RadioGroup, RadioGroupSample, type RadioGroupProps,
	ScatterPlot, ScatterPlotSample, type ScatterPlotProps,
  Scrollbars, ScrollbarsSample, type ScrollbarsProps,
  Separator, SeparatorSample, type SeparatorProps,
  Stack, StackSample, type StackProps,
  Switch, SwitchSample, type SwitchProps,
  SwitchGroup, SwitchGroupSample, type SwitchGroupProps,
  Tab, TabSample, type TabProps,
  TabGroup, TabGroupSample, type TabGroupProps,
  Table, TableSample, TableProps,
  TableBody, TableCell, TableHead, TableRow, 
	TextField, TextFieldSample, type TextFieldProps,
  TextFieldV2, TextFieldV2Sample, type TextFieldV2Props,
  Tooltip, TooltipSample, type TooltipProps,
  Typography, TypographySample, type TypographyProps,
  TypographyGroup, TypographyGroupSample, type TypographyGroupProps,
	SVG, SVGProps, SVGSample,
  AutoDropList, AutoDropListSample,
};

// experimental Components
export { default as ExperimentalLanguageDropList } from "./Experimental/LanguageDropList";
export { default as ExperimentalPolygon, type StyledProps as ExperimentalPolygonType } from "./Experimental/Polygon";
export { default as ExperimentalPolygons } from "./Experimental/Polygons";
export { default as ExperimentalSpreadSheet } from "./Experimental/SpreadSheet";

// testing Components
export * from "./testingCompsExports";
