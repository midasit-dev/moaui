import React from 'react';/**${comma}*/
import { CheckGroup, Check } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsCheckGroupStateful = () => {
	const [values, setValues] = React.useState({
		"test1" : true,
		"test2" : false,
		"test3" : false,
	});

	const handleCheckboxChange = (e: React.SyntheticEvent, checked: boolean) => {
		const event = e as React.ChangeEvent<HTMLInputElement>;
		setValues({ ...values, [event.target.name] : checked, })
	}

	return (
    <>
      <CheckGroup text="title">
        <Check name="test1" checked={values.test1} onChange={handleCheckboxChange} />
        <Check name="test2" checked={values?.test2} onChange={handleCheckboxChange} />
        <Check name="test3" checked={values?.test3} onChange={handleCheckboxChange} />
      </CheckGroup>
    </>
  );
}/**${comma}*/

export default ComponentsCheckGroupStateful;