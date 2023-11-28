import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ButtonIcon from "./IconCompo/ButtonIconCompo";
import TextFieldIcon from "./IconCompo/TextFieldIconCompo";

const DraggableComponent: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <ButtonIcon />
      {/* <TextFieldIcon/> */}
    </div>
  );
};

export default DraggableComponent;
