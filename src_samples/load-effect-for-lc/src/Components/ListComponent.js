import React from "react";
import { Scrollbars } from "rc-scrollbars";
import { updateCheckState } from "../utils";

import Stack from "@midasit-dev/moaui/Components/Stack";
import Checkbox from "@midasit-dev/moaui/Components/Check";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import MoaButton from "@midasit-dev/moaui/Components/Button";
import Typography from "@midasit-dev/moaui/Components/Typography";
import MoaTypography from "@midasit-dev/moaui/Components/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { GuideBox, VerifyUtil } from "@midasit-dev/moaui";

const baseWidth = 6;
const innerWidth = baseWidth + "rem";

ListComponent.defaultProps = {
  checkList: [],
  loader: () => {},
  userData: { user: [] },
  width: "100%",
  height: innerWidth,
};

const isEmpty = (array) => {
  return array && array.length !== 0;
};

const ColoredContainer = (props) => (
  <Stack
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{ height: "100%", backgroundColor: "#F5F4FF" }}
  >
    {props.children}
  </Stack>
);

const awaiter = async (setPending, setListData, func, userData) => {
  try {
    setPending(true);
    if (VerifyUtil.getMapiKey() !== "") setListData(await func(userData));
    setPending(false);
  } catch (_) {
    console.log(_);
  }
};

export function ListComponent(props) {
  const {
    checkList,
    setCheckList,
    doUpdate,
    setDoUpdate,
    Loader,
    label,
    userData,
    width,
  } = props;
  const [listData, setListData] = React.useState([]);
  const [isPending, setPending] = React.useState(false);

  React.useEffect(() => {
    awaiter(setPending, setListData, Loader, userData);
    // eslint-disable-next-line
  }, []);

  const changeCheckedList = (data) => {
    const newCheckList = [...checkList];
    if (newCheckList.includes(data))
      newCheckList.splice(newCheckList.indexOf(data), 1);
    else newCheckList.push(data);
    setCheckList(newCheckList);
  };

  React.useEffect(() => {
    if (doUpdate === "SELECT") {
      updateCheckState(setCheckList, listData);
    } else if (doUpdate === "DESELECT") {
      updateCheckState(setCheckList, []);
    } else if (doUpdate === "INIT") {
      updateCheckState(setCheckList, []);
      awaiter(setPending, setListData, Loader, userData);
    }
    setDoUpdate("");
  }, [doUpdate, setDoUpdate, setCheckList, listData, Loader, userData]);

  const isExistInCheckList = (data) => checkList.includes(data);

  const isFullyChecked = Boolean(listData === checkList);

  const handleOnClick = () => {
    updateCheckState(setCheckList, isFullyChecked ? [] : listData);
  };

  return (
    <Stack width={width} border="1px solid #edf0f2">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ListItem key={label} disableGutters disablePadding>
          <div
            style={{
              paddingTop: "12px",
              paddingBottom: "6px",
              paddingLeft: "8px",
            }}
          >
            <Typography color="disable" variant="body2">
              {label}
            </Typography>
          </div>
        </ListItem>
      </Stack>
      <div style={{ height: props?.height }}>
        {isPending && (
          <ColoredContainer>
            <CircularProgress />
          </ColoredContainer>
        )}
        {!isPending && !isEmpty(listData) && (
          <ColoredContainer>
            <Typography>No Items.</Typography>
          </ColoredContainer>
        )}
        {!isPending && isEmpty(listData) && (
          <Scrollbars
            autoHeight
            autoHeightMax={props?.height}
            autoHeightMin={props?.height}
            autoHide
          >
            <List sx={{ height: props?.height }}>
              {listData.map((value) => (
                <ListItem
                  key={value}
                  disableGutters
                  disablePadding
                >
                  <ListItemButton onClick={() => changeCheckedList(value)}>
										<GuideBox width="100%" row horSpaceBetween verCenter>
											<MoaTypography>{value}</MoaTypography>
											<Checkbox
												checked={isExistInCheckList(value)}
												onClick={() => changeCheckedList(value)}
											/>
										</GuideBox>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Scrollbars>
        )}
      </div>
      <Stack display="flex" justifyContent="center">
        <MoaButton variant="text" onClick={handleOnClick}>
          {!isFullyChecked ? "Select All" : "Clear All"}
        </MoaButton>
      </Stack>
    </Stack>
  );
}
