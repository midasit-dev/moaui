
import * as React from 'react';
import DraggableComponents from './DraggableComponents';
import DropTarget from './DropTarget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import SizeOptCompo from './SizeOptCompo';
import { TemplateWidth, TemplateHeight } from './PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const fontStyle = {
  fontFamily: "Prentendard",
  fontSize:"0.6875rem",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1rem",
}

export default function Playground(): React.ReactElement {
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);

  function onClickBack(){
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{width:"100%"}}>
        {Sizewidth !== "" && Sizeheight !== "" ?
          <Box>
            <Stack direction={"row"}>
              <Stack>
              <Box>
                <IconButton sx={{float:"left", padding:"0.2rem", m:0, ...fontStyle}} onClick={onClickBack}><ArrowBackIcon/>Back</IconButton>
              </Box>
              <Box sx={{height:"100%", width:"100%",mr:"1rem"}}>
                <DraggableComponents />
              </Box>
              </Stack>
              <Box>
                <DropTarget />
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