// Component: UnitList
import React from "react";
import { DropList, GuideBox, Typography } from "@midasit-dev/moaui";

const UnitList = ({ onUnitChange }) => {
  const [forceType, setForceType] = React.useState(3);
  const [lengthType, setLengthType] = React.useState(2);
  const forceTypeOptions = [
    { value: 0, label: "KGF" },
    { value: 1, label: "TONF" },
    { value: 2, label: "N" },
    { value: 3, label: "KN" },
    { value: 4, label: "LBF" },
  ];
  const lengthTypeOptions = [
    { value: 0, label: "MM" },
    { value: 1, label: "CM" },
    { value: 2, label: "M" },
    { value: 3, label: "IN" },
    { value: 4, label: "FT" },
  ];

  const handleForceTypeChange = (e) => {
    const newForceType = e.target.value;
    setForceType(newForceType);
    onUnitChange("unit", { force: forceTypeOptions[newForceType].label, dist: lengthTypeOptions[lengthType].label });
  };

  const handleLengthTypeChange = (e) => {
    const newLengthType = e.target.value;
    setLengthType(newLengthType);
    onUnitChange("unit", { force: forceTypeOptions[forceType].label, dist: lengthTypeOptions[newLengthType].label });
  };

  return (
    <GuideBox column width="100%" verCenter horLeft spacing={1}>
      <Typography variant="h1">Unit</Typography>
      <GuideBox row width="100%" verCenter horSpaceBetween>
        <Typography variant="h2">Force</Typography>
        <DropList
          title="forceType"
          width={75}
          itemList={() => {
            let map = new Map();
            for (const value of forceTypeOptions) {
              map.set(value.label, value.value);
            }
            return map;
          }}
          value={forceType}
          onChange={handleForceTypeChange}
        />
        <Typography variant="h2">Dist</Typography>
        <DropList
          title="lengthType"
          width={75}
          itemList={() => {
            let map = new Map();
            for (const value of lengthTypeOptions) {
              map.set(value.label, value.value);
            }
            return map;
          }}
          value={lengthType}
          onChange={handleLengthTypeChange}
        />
      </GuideBox>
    </GuideBox>
  );
}

export default UnitList;
