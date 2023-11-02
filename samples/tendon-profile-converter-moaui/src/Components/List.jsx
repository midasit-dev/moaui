import React from "react";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MoaTypography from "@midasit-dev/moaui/Typography";
import MoaCheck from "@midasit-dev/moaui/Check";

List.defaultProps = {
	items: {},
	selected: {},
	state: "",
	setState: () => {},
	setSelected: () => {},
};

export default function List(props) {
	const { items, selected, setSelected, state, setState } = props;

	const handleListItemClick = React.useCallback(
		(key, value) => {
			let newSelected = { ...selected };
			if (newSelected[key] !== undefined) {
				delete newSelected[key];
			} else {
				newSelected[key] = value;
			}
			setSelected(newSelected);
		},
		[selected, setSelected]
	);

	React.useEffect(() => {
		if (state === "select-all") {
			setSelected(items);
		} else if (state === "deselect-all") {
			setSelected({});
		}

		setState("");
	}, [state, setState, items, setSelected]);

	return (
		<MuiList
			disablePadding
			dense
		>
			{Object.entries(items).map(([key, value]) => {
				return (
				<MuiListItem
					disableGutters
					onClick={() => handleListItemClick(key, value)}
					key={key}
					sx={{padding: 0}}
					secondaryAction={<MoaCheck checked={selected[key] !== undefined} />}
				>
					<MuiListItemButton sx={{padding: 0.8}}>
						<MoaTypography marginLeft={1}>{value?.NAME || ""}</MoaTypography>
					</MuiListItemButton>
				</MuiListItem>
			)
			})}
		</MuiList>
	);
}