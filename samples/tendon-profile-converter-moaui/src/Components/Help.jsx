import React from "react";
import MoaTypography from "@midasit-dev/moaui/Typography";
import MoaButton from "@midasit-dev/moaui/Button";
import MoaStack from "@midasit-dev/moaui/Stack";
import HelpIcon from "./HelpIcon";

//mui
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

Help.defaultProps = {
	open: false,
	setOpen: () => {},
};

export default function Help(props) {
	return (
		<Dialog open={props.open}>
			<MoaStack direction="column" justifyContent="center" spacing={1}>
				<MoaStack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					padding={1}
					spacing={2}
					bgcolor={"#dddddd"}
				>
					<MoaStack direction="row" alignItems="center" spacing={2}>
						<HelpIcon />
						<MoaTypography variant="h1">
							Help : Tendon Profile Converter
						</MoaTypography>
					</MoaStack>
					<IconButton
						onClick={() => props.setOpen(false)}
						disableFocusRipple
						sx={{ padding: 0 }}
					>
						<CloseIcon />
					</IconButton>
				</MoaStack>
				<MoaStack
					direction="column"
					justifyContent="center"
					padding={2}
					spacing={1}
				>
					<MoaTypography variant="h1">
						Tendon Profile Coordinate Converter
					</MoaTypography>
					<MoaTypography paddingLeft={1}>
						This Plug-in converts <b>Element</b> tendon profile to{" "}
						<b>Straight</b> tendon profile.
					</MoaTypography>
					<br />
					<MoaTypography variant="h1">Details</MoaTypography>
					<MoaStack direction="column" spacing={1}>
						<MoaButton>Import Tendon Profile List</MoaButton>
						<MoaTypography paddingLeft={1}>
							Only Import : 2D/3D, Splice, Element type tendon profile
						</MoaTypography>
					</MoaStack>
					<MoaStack direction="row" alignItems="center" spacing={1}>
						<MoaButton>New</MoaButton>
						<MoaTypography>
							Create new tendon profile as file name + _str
						</MoaTypography>
					</MoaStack>
					<MoaStack direction="row" alignItems="center" spacing={1}>
						<MoaButton>Modify</MoaButton>
						<MoaTypography>Edit imported tendon profile</MoaTypography>
					</MoaStack>
					<br />
					<MoaTypography variant="h1">
						Improper conditions
					</MoaTypography>
					<MoaTypography paddingLeft={1}>
						2D/3D : When Straight Length of Tendon,
						Transfer Length existed.
					</MoaTypography>
					<MoaTypography paddingLeft={1}>
						2D : Fix and BOT selections are not supported.
					</MoaTypography>
				</MoaStack>
			</MoaStack>
		</Dialog>
	);
}
