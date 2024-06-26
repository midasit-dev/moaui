//ComponentSortOption.js
import React from 'react';
import { DropList, Typography, GuideBox } from "@midasit-dev/moaui";



const SortOptionSelector = ({ onSortChange,currentUnit}) => {
  const [sortFormType, setSortFormType] = React.useState(0);
  const sortTypeOptions = [
    { value: 0, label: "Absolute" },
    { value: 1, label: "Max/Min" }
  ];

  const handleSortOptionChange = (e) => {
    const newSortType = e.target.value;
    setSortFormType(newSortType);
    console.log(sortTypeOptions[newSortType].value); // 0 or 1
    onSortChange(sortTypeOptions[newSortType].value); // 0 or 1
  };

  React.useEffect(() => {
    console.log("currentUnit", currentUnit);
  }, [currentUnit]);
 

  return (
        <GuideBox row width="99%" verCenter horRight spacing={2} >
          <Typography variant="h1">Units:</Typography>
          <Typography variant="h1" color='skyblue'>{currentUnit.force || '-'}</Typography>
          <Typography variant="h1" color='skyblue'>{currentUnit.dist || '-'}</Typography>

  
          <Typography variant="h1">Sort By</Typography>
          <DropList
            title="Sort By"
            width={150}
            itemList={() => {
              let map = new Map();
              for (const value of sortTypeOptions) {
                map.set(value.label, value.value);
              }
              return map;
            }}
            value={sortFormType}
            onChange={handleSortOptionChange}
          />
        </GuideBox>

 
  );
};

export default SortOptionSelector;
