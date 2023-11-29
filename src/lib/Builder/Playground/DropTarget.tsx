import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
// import MoaButton from "./MoaCompo/MoaButton";
import MoaButton from "../../Components/Button";
import MoaTextField from "../../Components/TextField";
import { TemplateWidth, TemplateHeight, CodeString } from './recoil/PlaygroundAtom';
import { useRecoilState } from 'recoil';
import { Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TotalCodeString from './ComponentString/TotalString';

const DropAcceptList = [
  ItemTypes.BUTTON,
  ItemTypes.TEXTFIELD,
  ItemTypes.CHECKBOX,
  ItemTypes.RADIO,
  ItemTypes.SWITCH,
  ItemTypes.SEPERATOR,
  ItemTypes.TYPOGRAPHY,
  ItemTypes.DROPLIST,
  ItemTypes.TAB,
  ItemTypes.TABLE,
  ItemTypes.BOX
];

const fontStyle = {
  fontFamily: "Prentendard",
  fontSize:"0.6875rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "1rem",
  color:"#000",
}

function DraggedComponent(props: any) : any {
  const item = props.item;

  if(item.type === ItemTypes.BUTTON){
    return(
      <MoaButton
        variant={"contained"}
        color={"normal"}
        width={"100%"}
        disabled={false}
      >
        MoaButton
      </MoaButton>
    )
  }
  else if(item.type === ItemTypes.TEXTFIELD){
    return (
      <MoaTextField
        width={"auto"}
        placeholder={"Moa TextField"}
        title={"Title"}
        titlePosition={"left"}
        disabled={false}
        defaultValue={""}
        error={false}
      />
    )
  }
}

function getComponentType(droppedItems: any){
  let ComponentType: string[] = [];
  for(let i=0; i<droppedItems.length; i++){
    if(droppedItems[i]["props"]["item"]["type"] === ItemTypes.BUTTON){
      ComponentType.push(ItemTypes.BUTTON);
    } else if(droppedItems[i]["props"]["item"]["type"] === ItemTypes.TEXTFIELD){
      ComponentType.push(ItemTypes.TEXTFIELD);
    }
  }
  return ComponentType;
}

const DropArea = ({ index, dropped, setDropped, columnCount, rowCount } : any) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [...DropAcceptList],
    drop: (item, monitor) => {
        if (monitor.isOver()) {
          if(dropped.length !== 0){
            const Compo = [...dropped[index]];
            if (Compo.length === 2) {
              alert('해당 영역에 더이상 컴포넌트를 추가할 수 없습니다.');
            } else {
              Compo.push(<DraggedComponent item={item} />);
            }
            setDropped((prev: any) => {
              const newDropped = [...prev];
              newDropped[index] = Compo;
              return newDropped;
            });
          } else {
            const Compo = [...dropped];
            Compo.push(<DraggedComponent item={item} />);
            setDropped((prev: any) => {
              const newDropped = [...prev];
              newDropped[index] = Compo;
              return newDropped;
            });
          }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <Grid item xs={12 / columnCount} style={{height: `${Math.floor(100 / rowCount)}%`}}>
      <div
        ref={drop}
        style={{
          width: '100%',
          height: '100%',
          border: dropped.length === 0 ?
                    (isActive ? '1px solid gray' : '1px dashed gray' )
                  :
                    (dropped[index].length === 0 ? (isActive ? '1px dashed gray' : '1px solid gray') : "0"),
          backgroundColor: isActive ? '#EEE' : 'transparent',
          margin: "0.1rem"
        }}
      >
        <Box display="flex" justifyContent={"center"} alignItems={"center"}>
          {dropped.length === 0 ? <></> :
            <>
            {dropped[index] !== undefined ? <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{dropped[index][0]}</div> : <></>}
            {dropped[index] !== undefined ? <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem"}}>{dropped[index][1]}</div> : <></>}
            </>
          }
        </Box>
      </div>
    </Grid>
  );
};

const DropTarget = (props:any) => {
  const isopenCode = props.openCode;
  const rowCount = props.rowCount;
  const columnCount = props.columnCount;
  const [sizewidth, setSizewidth] = useRecoilState(TemplateWidth);
  const [sizeheight, setSizeHeight] = useRecoilState(TemplateHeight);
  const [codestring, setCodestring] = useRecoilState(CodeString);

  const [dropped, setDropped] = useState<Array<React.ReactNode[] | any>>([]);

  useEffect(() => {
    if(rowCount !== 0 && columnCount !== 0){
      setDropped(Array(rowCount * columnCount).fill([]));
      setCodestring(Array(rowCount * columnCount).fill([]));
    }
  }, [rowCount, columnCount]);

  useEffect(() => {
    function makeCodeString(){
      const Codetype = dropped.map(drop => drop.length !== 0 ? getComponentType(drop) : []);
      setCodestring(Codetype);
    }
    if(dropped.length !== 0){
      makeCodeString();
    }
  }, [dropped]);
  
  const onClickClear = () => {
    setDropped(Array(rowCount * columnCount).fill([]));
  };

  function onClickBack(){
    setSizeHeight("");
    setSizewidth("");
  }

  return (
    <React.Fragment key={"d_d"}>
      {
        isopenCode === false ? (
        <div key={"d_d_div"}>
          <Box display="flex" justifyContent={"space-between"} alignItems={"center"} sx={{mb:"0.5rem"}}>
            <IconButton sx={{float:"left", padding:"0.2rem", m:0, ...fontStyle}} onClick={onClickBack}><ArrowBackIcon/>Back</IconButton>
            <Typography variant='subtitle2'>{sizewidth} X {sizeheight}</Typography>
            <IconButton sx={{padding:"0.2rem", m:0, ...fontStyle}} onClick={onClickClear}><RefreshIcon/>Clear</IconButton>
          </Box>
          <Box sx={{width: `${sizewidth}px`,height: `${sizeheight}px`, border: '1px solid #000', p:"0.5rem"}}>
            <Grid container spacing={0} style={{height:"100%"}}>
              {Array.from({ length: rowCount }).map((_, rowIndex) =>
                Array.from({ length: columnCount }).map((_, columnIndex) => {
                  const index = rowIndex * columnCount + columnIndex;
                  return <DropArea key={index} index={index} dropped={dropped} setDropped={setDropped} columnCount={columnCount} rowCount={rowCount}/>;
                })
              )}
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