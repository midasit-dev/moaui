import * as React from "react";
import MoaRadioGroup from "@midasit-dev/moaui/Components/RadioGroup";
import MoaRadioButton from "@midasit-dev/moaui/Components/Radio";
import MoaGuideBox from "@midasit-dev/moaui/Components/GuideBox";

const values = [
  { key: "MCS", label: "Monotone Cubic Hermite Spline" },
  { key: "NCS", label: "Natural Cubic Spline" },
  { key: "CCS", label: "Clamped Cubic Spline" },
];

export default function RadioButtonSpline(defaultOp, setValue) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <MoaGuideBox marginLeft={2}>
      <MoaRadioGroup
        value={defaultOp}
        onChange={handleChange}
        name="Radio Button Group"
      >
        {values.map((value) => (
          <MoaRadioButton
            key={value.key}
            value={value.key}
            name={value.label}
          />
        ))}
      </MoaRadioGroup>
    </MoaGuideBox>
  );
}
