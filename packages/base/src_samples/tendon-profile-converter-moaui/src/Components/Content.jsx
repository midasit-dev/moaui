import React from "react";

import { GuideBox, Typography as MoaTypography } from "@midasit-dev/moaui";
import MoaButton from "@midasit-dev/moaui/Components/Button";
import IconButton from "@mui/material/IconButton";
import MoaStack from "@midasit-dev/moaui/Components/Stack";
import Scrollbars from "rc-scrollbars";
import List from "./List";

import HelpIcon from "./HelpIcon";
import HelpDlg from "./Help";

import ListEmpty from "./ListEmpty";
import ListLoading from "./ListLoading";
import { importTdnaFromProduct } from "../Workers/Downstream";
import { useUpstream } from "../Workers/Upstream";
import { Panel } from "@midasit-dev/moaui";

export default function Contents() {
	const [selected, setSelected] = React.useState({});
	const [state, setState] = React.useState("");
	const [showHelp, setShowHelp] = React.useState(false);
	const [items, setItems] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const { makeData, updateData } = useUpstream();

	const isSelectedEmpty = React.useCallback(() => Object.values(selected).length === 0, [selected]);
	const isItemsEmpty = React.useCallback(() => Object.values(items).length === 0, [items]);

	const handleSelectAll = React.useCallback(() => {
		if (isSelectedEmpty()) {
			setState("select-all");
		} else {
			setState("deselect-all");
		}
	}, [isSelectedEmpty]);

	const handleImportData = React.useCallback(() => {
		const callback = async() => {
			setLoading(true);
			try {
				setItems(await importTdnaFromProduct());
			} catch {}
			setLoading(false);
			setSelected([]);
		};
		callback();
	}, []);

	return (
		<React.Fragment>
			<HelpDlg open={showHelp} setOpen={setShowHelp} />
			<MoaStack width="100%" direction="column" justifyContent="center" spacing={2}>
				<MoaButton onClick={handleImportData} disabled={loading} color="negative">Import Tendon Profile List</MoaButton>
				<Panel width={380} variant='shadow2'>
					<MoaStack border={"solid 1px #E6E6E6"} borderRadius="4px">
						<MoaStack padding={1.5}>
							<MoaTypography variant="body2" color="disable">Convertable Tendon Profile List</MoaTypography>
						</MoaStack>
						<Scrollbars autoHeight autoHeightMin="287px" autoHeightMax="287px">
							{loading && <ListLoading height="287px" />}
							{isItemsEmpty() && <ListEmpty height="287px" />}
							{!isItemsEmpty() && <List
								items={items}
								state={state}
								setState={setState}
								selected={selected}
								setSelected={setSelected}
							/>}
						</Scrollbars>
					</MoaStack>
					<GuideBox width="100%" center marginTop={1}>
						<MoaButton variant="text" onClick={handleSelectAll} disabled={loading || isItemsEmpty()}>
							{isSelectedEmpty() ? "Select All" : "Deselect All"}
						</MoaButton>
					</GuideBox>
				</Panel>
				<MoaStack direction="row" justifyContent="space-between">
					<IconButton onClick={() => setShowHelp(true)}>
						<HelpIcon />
					</IconButton>
					<MoaStack direction="row" spacing={1} alignItems="center">
						<MoaTypography variant="h1">Convert to</MoaTypography>
						<MoaButton
							onClick={() => {
								const awaiter = async() => {
									setLoading(true);
									await makeData(selected);
									handleImportData();
									setLoading(false);
								};
								awaiter();
							}}
							disabled={loading || isItemsEmpty() || isSelectedEmpty()}
						>
							New
						</MoaButton>
						<MoaButton
							onClick={() => {
								const awaiter = async() => {
									setLoading(true);
									await updateData(selected);
									handleImportData();
									setLoading(false);
								};
								awaiter();
							}}
							disabled={loading || isItemsEmpty() || isSelectedEmpty()}
						>
							Modify
						</MoaButton>
					</MoaStack>
				</MoaStack>
			</MoaStack>
		</React.Fragment>
	);
}