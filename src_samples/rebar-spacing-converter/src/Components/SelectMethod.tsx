import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { GuideBox, Typography, RadioGroup, Radio,Panel } from "@midasit-dev/moaui";

const OutputType: Array<[string, number]> = [
  ["1=>1", 1], ["2=>1", 2], ["1=>2", 3], ["2=>2", 4]
];

export const VarOutputTypeList = atom({
  key: 'VarOutputTypeList',
  default: OutputType,
});

export const VarOutputType = atom({
  key: 'VarOutputType',
  default: 1,
});

const CompOutputType = () => {
  const [value, setValue] = useRecoilState(VarOutputType);
  const outputTypeOptions = OutputType; // Assuming this comes from the Recoil atom

  const handleChange = (event: React.ChangeEvent, newValue: string) => {
    // Convert the string representation of the value to a number
    const numericValue = outputTypeOptions.find(option => option[0] === newValue)?.[1];
    if (numericValue !== undefined) {
      setValue(numericValue);
    }
  };

  return (
    <GuideBox width="100%">
      <Typography variant="h1" height={25} verCenter >
        Input Method
      </Typography>
      <GuideBox padding={2} width='100%' horSpaceBetween>
        <RadioGroup onChange={handleChange} value={outputTypeOptions.find(option => option[1] === value)?.[0] || ''} row>
          {outputTypeOptions.map((option, index) => (
            <Radio
              key={index}
              name={option[0]}
              value={option[0]}
              marginLeft={index ? 10 : 0}
            />
          ))}
        </RadioGroup>
      </GuideBox>
    </GuideBox>
  );
};

export default CompOutputType;
