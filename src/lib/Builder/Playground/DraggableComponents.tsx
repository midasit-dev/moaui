import React from 'react';
import ButtonIcon from "./IconCompo/ButtonIconCompo";
import TextFieldIcon from "./IconCompo/TextFieldIconCompo";
import CheckBoxIcon from "./IconCompo/CheckBoxIconCompo";
import DropListIcon from "./IconCompo/DropListIconCompo";
import RadioIcon from "./IconCompo/RadioIconCompo";
import Seperator from "./IconCompo/SeperatorIconCompo";
import Switch from "./IconCompo/SwitchIconCompo";
import Tab from "./IconCompo/TabIconCompo";
import Table from "./IconCompo/TableIconCompo";
import Typography from "./IconCompo/TypographyIconCompo";

const DraggableComponent: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
      }}
    >
      <ButtonIcon />
      <CheckBoxIcon />
      <DropListIcon />
      <RadioIcon />
      <Seperator />
      <Switch />
      <Tab />
      <Table />
      <Typography />
      {/* <TextFieldIcon/> */}
    </div>
  );
};

export default DraggableComponent;
