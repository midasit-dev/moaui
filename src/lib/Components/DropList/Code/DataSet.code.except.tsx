import { useEffect, useState } from 'react';/**${comma}*/
import { DropList } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsDropListDataSet = () => {
	const [value, setValue] = useState(1);

	useEffect(() => {
		const element = document.getElementById('drop-list-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value')
			console.log(curValue);
		}
	}, [value]);

	return (
    <DropList
      id="drop-list-data-set"
      itemList={[
        ["Korean", 1],
        ["American", 2],
        ["Asia", 3],
        ["Midas", 4],
      ]}
      width="100px"
      defaultValue="Korean"
      value={value}
      onChange={(event: any) => setValue(event.target.value)}
    />
  );
}/**${comma}*/

export default ComponentsDropListDataSet;
