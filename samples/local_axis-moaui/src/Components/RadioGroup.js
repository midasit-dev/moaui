import * as React from 'react';

import MoaRadioGroup from '@midasit-dev/moaui/RadioGroup';
import MoaRadioButton from '@midasit-dev/moaui/Radio';

export default function RadioButtonsGroup(defaultOp,setValue) {
  
  const handleChange=(event) => {
    setValue(event.target.value);
  }
  
  return (
	<MoaRadioGroup
		name="Cubic Spline Radio Group"
		aria-labelledby="Cubic Spline Radio Group Label"
		onChange={handleChange}
		value={defaultOp}
	>
		<MoaRadioButton value="MCS" name="Monotone Cubic Hermite Spline" />
		<MoaRadioButton value="NCS" name="Natural Cubic Spline" />
		<MoaRadioButton value="CCS" name="Clamped Cubic Spline" />
	</MoaRadioGroup>
  );
}