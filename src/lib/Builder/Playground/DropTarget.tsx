import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import MoaButton from "./MoaCompo/MoaButton";
import MoaTextField from "./MoaCompo/MoaTexField";
import { TemplateWidth, TemplateHeight, CodeString } from './recoil/PlaygroundAtom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TotalCodeString from './ComponentString/TotalString';

const fontStyle = {
  fontFamily: "Prentendard",
  fontSize:"0.6875rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "1rem",
  color:"#000",
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

function makeCodeString(droppedItems: any){
  let ComponentType: string[] = [];
  for(let i=0; i<droppedItems.length; i++){
    if(droppedItems[i]["props"]["itemType"]["type"] === ItemTypes.BUTTON){
      ComponentType.push(ItemTypes.BUTTON);
    } else if(droppedItems[i]["props"]["itemType"]["type"] === ItemTypes.TEXTFIELD){
      ComponentType.push(ItemTypes.TEXTFIELD);
    }
  }
  return ComponentType;
}

const DropTarget = (props:any) => {
  const isopenCode = props.openCode;
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
  const [codestring, setCodestring] = useRecoilState(CodeString);
  const [code, setCode] = useState("");
  const [dropped, setDropped] = useState<React.ReactNode[] | any>([]);
  const [dropped1, setDropped1] = useState<React.ReactNode[] | any>([]);
  const [dropped2, setDropped2] = useState<React.ReactNode[] | any>([]);
  const [dropped3, setDropped3] = useState<React.ReactNode[] | any>([]);

  React.useEffect(() => {
    function setComponentsCode(){
      const Codetype = [...codestring];
      const ComponentTypes = makeCodeString(dropped);
      Codetype[0] = ComponentTypes;
      console.log(Codetype);
      setCodestring(Codetype);
    }
    if(dropped.length !== 0){
      setComponentsCode();
    }
  }, [dropped]);

  const [{ canDrop: canDrop0, isOver: isOver0 }, drop0] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.TEXTFIELD],
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        const Compo = [...dropped];
        if (Compo.length === 2) {
          alert('해당 영역에 더이상 컴포넌트를 추가할 수 없습니다.');
        } else {
          Compo.push(<DraggedComponent itemType={item} />);
        }
        console.log(Compo);
        setDropped(Compo);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ canDrop: canDrop1, isOver: isOver1 }, drop1] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.TEXTFIELD],
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        const Compo = [...dropped1];
        if (Compo.length === 2) {
          alert('해당 영역에 더이상 컴포넌트를 추가할 수 없습니다.');
        } else {
          Compo.push(<DraggedComponent itemType={item} />);
        }
        setDropped1(Compo);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ canDrop: canDrop2, isOver: isOver2 }, drop2] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.TEXTFIELD],
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        const Compo = [...dropped2];
        if (Compo.length === 2) {
          alert('해당 영역에 더이상 컴포넌트를 추가할 수 없습니다.');
        } else {
          Compo.push(<DraggedComponent itemType={item} />);
        }
        setDropped2(Compo);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ canDrop: canDrop3, isOver: isOver3 }, drop3] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.TEXTFIELD],
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        const Compo = [...dropped3];
        if (Compo.length === 2) {
          alert('해당 영역에 더이상 컴포넌트를 추가할 수 없습니다.');
        } else {
          Compo.push(<DraggedComponent itemType={item} />);
        }
        setDropped3(Compo);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // 각 영역의 isActive 변수
  const isActive0 = canDrop0 && isOver0;
  const isActive1 = canDrop1 && isOver1;
  const isActive2 = canDrop2 && isOver2;
  const isActive3 = canDrop3 && isOver3;

  function onClickClear(){
    setDropped([]);
    setDropped1([]);
    setDropped2([]);
    setDropped3([]);
  }
  
  function onClickBack(){
  }

  return (
    <React.Fragment>
      {
        isopenCode === false ? (
        <div>
          <Box display="flex" justifyContent={"space-between"} alignItems={"center"} sx={{mb:"0.5rem"}}>
            <IconButton sx={{float:"left", padding:"0.2rem", m:0, ...fontStyle}} onClick={onClickBack}><ArrowBackIcon/>Back</IconButton>
            <Typography variant='subtitle2'>{Sizewidth} X {Sizeheight}</Typography>
            <IconButton sx={{padding:"0.2rem", m:0, ...fontStyle}} onClick={onClickClear}><RefreshIcon/>Clear</IconButton>
          </Box>
          <Box sx={{width: `${Sizewidth}px`,height: `${Sizeheight}px`, border: '1px solid #000', p:"0.5rem"}}>
            <Grid container spacing={0} style={{height:"100%"}}>
              <Grid item xs={6} style={{height:"50%"}}>
                <div
                  key="0"
                  id='drop0-0'
                  ref={drop0}
                  style={{
                    width: `100%`,
                    height: `100%`,
                    border: isActive0 ? '1px dashed gray' : '0',
                    backgroundColor: isActive0 ? '#EEE' : 'transparent',
                  }}
                >
                  {isActive0 ? '' : (dropped.length === 0 ? '여기로 아이템을 드래그하세요' : "")}
                  <div>0,0</div>
                  <Box display="flex" justifyContent={"center"} alignItems={"center"} >
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{dropped[0]}</div>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem"}}>{dropped[1]}</div>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={6} style={{height:"50%"}}>
                <div
                  key="1"
                  id='drop0-1'
                  ref={drop1}
                  style={{
                    width: `100%`,
                    height: `100%`,
                    border: isActive1 ? '1px dashed gray' : '0',
                    backgroundColor: isActive1 ? '#EEE' : 'transparent',
                  }}
                >
                  {isActive1 ? '' : (dropped1.length === 0 ? '여기로 아이템을 드래그하세요' : "")}
                  <div>0,1</div>
                  <Box display="flex" justifyContent={"center"} alignItems={"center"} >
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{dropped1[0]}</div>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem"}}>{dropped1[1]}</div>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={6} style={{height:"50%"}}>
                <div
                  key="2"
                  id='drop1-0'
                  ref={drop2}
                  style={{
                    width: `100%`,
                    height: `100%`,
                    border: isActive2 ? '1px dashed gray' : '0',
                    backgroundColor: isActive2 ? '#EEE' : 'transparent',
                  }}
                >
                  {isActive2 ? '' : (dropped2.length === 0 ? '여기로 아이템을 드래그하세요' : "")}
                  <div>1,0</div>
                  <Box display="flex" justifyContent={"center"} alignItems={"center"} >
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{dropped2[0]}</div>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem"}}>{dropped2[1]}</div>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={6} style={{height:"50%"}}>
                <div
                  key="3"
                  id='drop1-1'
                  ref={drop3}
                  style={{
                    width: `100%`,
                    height: `100%`,
                    border: isActive3 ? '1px dashed gray' : '0',
                    backgroundColor: isActive3 ? '#EEE' : 'transparent',
                  }}
                >
                  {isActive3 ? '' : (dropped3.length === 0 ? '여기로 아이템을 드래그하세요' : "")}
                  <div>1,1</div>
                  <Box display="flex" justifyContent={"center"} alignItems={"center"} >
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{dropped3[0]}</div>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem"}}>{dropped3[1]}</div>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
        )
        :
        <Box sx={{width:"800px", minHeight:"500px"}}>
          <TotalCodeString />
        </Box>
      }
    </React.Fragment>
  );
};

export default DropTarget;