
import * as React from 'react';
import DraggableComponents from './DraggableComponents';
import DropTarget from './DropTarget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import SizeOptCompo from './SizeOptCompo';
import { TemplateWidth, TemplateHeight, RowCount, ColumnCount } from './recoil/PlaygroundAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from "@mui/material/Button";

export default function Playground(): React.ReactElement {
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
  const [openCode, setOpenCode] = React.useState(false);
  const [rowCount, setRowCount] = useRecoilState(RowCount);
  const [columnCount, setColumnCount] = useRecoilState(ColumnCount);

  React.useEffect(() => {
    const columnCountMap: { [key: string]: number } = {
      "400": 1,
      "600": 2,
      "800": 3,
    };

    setColumnCount(columnCountMap[Sizewidth] || 0);
  }, [Sizewidth]);

  React.useEffect(() => {
    const sizeToRowCountMap: { [key: string]: number } = {
      "400": 10,
      "600": 15,
      "800": 20,
    };

    setRowCount(sizeToRowCountMap[Sizeheight] || 0);
  }, [Sizeheight]);

  function onClickCodeButton(){
    setOpenCode(!openCode);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{width:"100%"}}>
        {Sizewidth !== "" && Sizeheight !== "" ?
          <Box>
            <Stack direction={"row"}>
              <Stack>
              <Box display="flex" flexDirection={"row"} justifyContent={"space-between"}sx={{paddingLeft:"0.7rem", paddingRight:"0.7rem"}}>
                <Button onClick={onClickCodeButton} sx={{ minWidth:"0rem"}} disabled={openCode === false ? true : false}>
                  UI
                </Button>
                <Box display="flex" justifyContent="center" alignItems="center">
                  / 
                </Box>
                <Button onClick={onClickCodeButton} sx={{p:"0rem", minWidth:"0rem"}} disabled={openCode === true ? true : false}>
                  Code
                </Button>
              </Box>
              <Box sx={{height:"100%", width:"100%",mr:"1rem"}}>
                <DraggableComponents />
              </Box>
              </Stack>
              <Box sx={{ml:"1rem"}}>
                <DropTarget openCode={openCode} columnCount={columnCount} rowCount={rowCount}/>
              </Box>
            </Stack>
          </Box>
          :
          <SizeOptCompo />
        }
      </Box>

    </DndProvider>
  );
}