import * as React from 'react';
import MoaRadioGroup from '@midasit-dev/moaui/RadioGroup';
import MoaRadioButton from '@midasit-dev/moaui/Radio';

const values = [
	{ key: "MCS", label: 'Monotone Cubic Hermite Spline' },
	{ key: "NCS", label: 'Natural Cubic Spline' },
	{ key: "CCS", label: 'Clamped Cubic Spline' },
];

export default function RadioButtonSpline(defaultOp, setValue) {
  const handleChange=(event) => {
    setValue(event.target.value);
  }
  
  return (
	<React.Fragment>
		<MoaRadioGroup value={defaultOp} onChange={handleChange} name="Radio Button Group">
			{
				values.map((value) => (
					<MoaRadioButton key={value.key} value={value.key} name={value.label} />
				))
			}
		</MoaRadioGroup>
	</React.Fragment>
  );
}