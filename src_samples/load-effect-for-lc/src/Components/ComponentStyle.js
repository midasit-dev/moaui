//ComponentStyle.js
import React, { useState } from "react";
import { DropList, GuideBox, Typography, TextFieldV2 } from "@midasit-dev/moaui";

const StyleList = ({ onStyleChange }) => {
  const [numbFormType, setNumbFormType] = useState(1);
  const numbTypeOptions = [
    { value: 0, label: "Default" },
    { value: 1, label: "Fixed" },
    { value: 2, label: "Scientific" },
    { value: 3, label: "General" },
  ];
  const [value, setValue] = useState(2);

  const handleFormTypeChange = (e) => {
    const newFormType = e.target.value;
    setNumbFormType(newFormType);
    onStyleChange("style", { format: numbTypeOptions[newFormType].label, place: value });
  };

  const handleValueChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onStyleChange("style", { format: numbTypeOptions[numbFormType].label, place: newValue });
  };

  return (
    <GuideBox column width="100%" verCenter horLeft spacing={1}>
      <Typography variant="h1">Style</Typography>
    <GuideBox row width="100%" verCenter horSpaceBetween>
      <Typography variant="h2">Format</Typography>
      <DropList
        title="NumberType"
        width={75}
        itemList={() => {
          let map = new Map();
          for (const value of numbTypeOptions) {
            map.set(value.label, value.value);
          }
          return map;
        }}
        value={numbFormType}
        onChange={handleFormTypeChange}
      />
      <Typography variant="h2">Place</Typography>
      <TextFieldV2
        width={75}
        defaultValue="2"
        placeholder="Input value ..."
        onChange={handleValueChange}
        value={value}
        disabled={false}
        type='number'
        numberOptions={{
          min: 1.0,
          max: 6.0,
          step: 1.0,
          onlyInteger: true,
        }}
      />
    </GuideBox>
    </GuideBox>
  );
}

export default StyleList;
