
import * as React from 'react';
import DraggableComponents from './DraggableComponents';
import DropTarget from './DropTarget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import SizeOptCompo from './SizeOptCompo';
import { TemplateWidth, TemplateHeight } from './recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import Button from "@mui/material/Button";

export default function Playground(): React.ReactElement {
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
  const [openCode, setOpenCode] = React.useState(false);

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
                <DropTarget openCode={openCode}/>
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