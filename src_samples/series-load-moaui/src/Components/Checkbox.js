import * as React from 'react';
import MoaCheck from '@midasit-dev/moaui/Check';

export default function CheckboxOption(Title, checked, setChecked) {
  return (
	<MoaCheck name={Title} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  );
}