import React from 'react';
import { CheckGroup, Check, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsCheckGroupControlled = () => {
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
      <Typography>
        {`Checked : ${Object.entries(values).reduce( (acc, [key, value]) => acc + (value ? `${key} ` : ""), "" )}`}
      </Typography>
    </>
  );
}/**${comma}*/

export default ComponentsCheckGroupControlled;