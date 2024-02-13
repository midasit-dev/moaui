/// <amd-module name="@midasit-dev/moaui"/>


// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝

import './Style/Font';

// moaui style
import { default as Color } from "./Style/Color";
import { default as Font } from "./Style/Font";

// moaui components
import { default as Button, type StyledProps as ButtonProps } from "./Components/Button";
import { default as Check, type StyledProps as CheckProps } from "./Components/Check";
import { default as CheckGroup } from "./Components/CheckGroup";
import { default as DataGrid } from "./Components/DataGrid";
import { default as DropList } from "./Components/DropList";
import { default as Grid } from "./Components/Grid";
import { default as IconButton } from "./Components/IconButton";
import { default as Panel, type StyledProps as PanelProps } from "./Components/Panel";
import { default as Radio } from "./Components/Radio";
import { default as RadioGroup } from "./Components/RadioGroup";
import { default as Separator } from "./Components/Separator";
import { default as Stack } from "./Components/Stack";
import { default as Switch } from "./Components/Switch";
import { default as SwitchGroup } from "./Components/SwitchGroup";
import { default as Tab } from "./Components/Tab";
import { default as TabGroup } from "./Components/TabGroup";
import { default as Table } from "./Components/Table";
import { default as TableBody } from "./Components/TableBody";
import { default as TableCell } from "./Components/TableCell";
import { default as TableHead } from "./Components/TableHead";
import { default as TableRow } from "./Components/TableRow";
import { default as TextField, type StyledProps as TextFieldProps } from "./Components/TextField";
import { default as TextFieldV2, type StyledProps as TextFieldV2Props } from "./Components/TextFieldV2";
import { default as Typography } from "./Components/Typography";
import { default as TypographyGroup } from "./Components/TypographyGroup";
import { default as Icon } from "./Components/Icon";
import { default as CodeBlock } from "./Components/CodeBlock";
import { default as Scrollbars } from "./Components/Scrollbars";
import { default as List } from "./Components/List";
import { default as ListItem } from "./Components/ListItem";
import { default as ListItemButton } from "./Components/ListItemButton";
import { default as MidasController } from './Components/MidasController';
import { default as Dialog } from "./Components/Dialog";
import { default as ChartLine } from "./Components/ChartLine";
import { default as GuideBox, type StyledProps as GuideBoxProps, fillColor as GuideBoxFillColor } from "./Components/GuideBox";
import { default as Alert } from "./Components/Alert";
import { default as Chip } from "./Components/Chip";
import { default as Tooltip } from "./Components/Tooltip";
import { default as FloatingBox, type StyledProps as FloatingBoxProps } from "./Components/FloatingBox";

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
  Button,
  Check,
  CheckGroup,
  DataGrid,
  DropList,
  Grid,
  IconButton,
  Panel,
  Radio,
  RadioGroup,
  Separator,
  Stack,
  Switch,
  SwitchGroup,
  Tab,
  TabGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TextFieldV2,
  Typography,
  TypographyGroup,
  Icon,
  CodeBlock,
  Scrollbars,
  List,
  ListItem,
  ListItemButton,
	MidasController,
  Dialog,
  ChartLine,
  GuideBox,
  Alert,
  Chip,
  Tooltip,
	FloatingBox,
  VerifyDialog,
  VerifyUtil,
  Signature,
};

export default Moaui;

// ███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// █████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝

export {
  Color,
  Font,
  Button,
	ButtonProps,
  Check,
	CheckProps,
  CheckGroup,
  DataGrid,
  DropList,
  Grid,
  IconButton,
  Panel,
	PanelProps,
  Radio,
  RadioGroup,
  Separator,
  Stack,
  Switch,
  SwitchGroup,
  Tab,
  TabGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
	TextFieldProps,
  TextFieldV2,
	TextFieldV2Props,
  Typography,
  TypographyGroup,
  Icon,
  CodeBlock,
  Scrollbars,
  List,
  ListItem,
  ListItemButton,
	MidasController,
  Dialog,
  ChartLine,
  GuideBox,
	GuideBoxProps,
	GuideBoxFillColor,
  Alert,
  Chip,
  Tooltip,
	FloatingBox,
	FloatingBoxProps,
  VerifyDialog,
  VerifyUtil,
  Signature,
};

// testing Components
export * from "./testingCompsExports";
