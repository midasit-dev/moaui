// ComponentEndList.js
import React from "react";
import { DropList, GuideBox, Typography } from "@midasit-dev/moaui";

const EndList = ({ onChange }) => {
  const [endType, setEndType] = React.useState("Part I");
  const typeValueOptions = [
    { value: "Part I", label: "Part I" },
    { value: "Part J", label: "Part J" },
  ];

  const handleChange = (e) => {
    setEndType(e.target.value);
    onChange("part", e.target.value);
  };

  return (
    <GuideBox column width="100%" verCenter horLeft spacing={2}>
    <GuideBox row width="100%" verCenter horSpaceBetween>
      <Typography variant="h1">Position</Typography>
      <DropList
        title="endType"
        width={75}
        itemList={() => {
          let map = new Map();
          for (const value of typeValueOptions) {
            map.set(value.label, value.value);
          }
          return map;
        }}
        value={endType}
        onChange={handleChange}
      />
    </GuideBox>
    </GuideBox>
  );
}

export default EndList;
