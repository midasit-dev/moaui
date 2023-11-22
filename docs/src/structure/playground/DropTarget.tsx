import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import MoaButton from "./MoaCompo/MoaButton";
import MoaTextField from "./MoaCompo/MoaTexField";
import { TemplateWidth, TemplateHeight } from '../../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import { Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const fontStyle = {
  fontFamily: "Prentendard",
  fontSize:"0.6875rem",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1rem",
}

function DraggedComponent(props: any) : any {
  const itemType = props.itemType;

  if(itemType.type === ItemTypes.BUTTON){
    return(
      <MoaButton />
    )
  }
  else if(itemType.type === ItemTypes.TEXTFIELD){
    return (
      <MoaTextField />
    )
  }
}

const DropTarget: React.FC = () => {
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
  const [dropped, setDropped] = useState<React.ReactNode[] | [null]>([null]);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.TEXTFIELD], // 허용할 드래그 타입
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        const Compo = [...dropped];
        Compo.push(<DraggedComponent itemType={item}/>);
        setDropped( Compo );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  function onClickClear(){
    setDropped([null]);
  }

  return (
    <div>
      <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant='subtitle2'>{Sizewidth} X {Sizeheight}</Typography>
        <IconButton sx={{padding:"0.2rem", m:0, ...fontStyle}} onClick={onClickClear}><RefreshIcon/>Clear</IconButton>
      </Box>
      <Box sx={{width: `${Sizewidth}px`,height: `${Sizeheight}px`,
            border: '1px solid #000',}}>
        <div
          ref={drop}
          style={{
            width: `100%`,
            height: `100%`,
            border: isActive ? '1px dashed gray' : '0',
            backgroundColor: isActive ? '#EEE' : 'transparent',
          }}
        >
          {isActive ? '' : (dropped === null ? '여기로 아이템을 드래그하세요' : "")}
          <div>{dropped}</div>
        </div>
      </Box>
    </div>
  );
};

export default DropTarget;
