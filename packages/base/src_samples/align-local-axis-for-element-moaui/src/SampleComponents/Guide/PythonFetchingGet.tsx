
import { Button, CodeBlock, GuideBox, Panel, DataGrid } from "@midasit-dev/moaui";
import React from "react";
import { dbRead } from "../../utils_pyscript";

interface InputObject {
  [key: string]: {
    X: number;
    Y: number;
    Z: number;
  };
}
const ComponentsDataGrid = ({
	inputObject
}: {
	inputObject: InputObject;
}) => {
	const columns = [
		{ field: 'id', headerName: 'Node', width: 70, editable: false, },
		{ field: 'x', headerName: 'X', width: 130, editable: false },
		{ field: 'y', headerName: 'Y', width: 130, editable: false },
		{ field: 'z', headerName: 'Z', width: 130, editable: false },
	];

	const rows = Object.entries(inputObject).map(([id, values]) => ({
		id: parseInt(id, 10),
		x: values.X,
		y: values.Y,
		z: values.Z
	}));

	return (
		<Panel width='100%' height='200px' variant="box">
			<DataGrid 
				rows={rows}
				columns={columns}
        pagination={undefined}
			/>
		</Panel>
	);
}

const Script = () => {
	return `import { dbRead } from "../utils_pyscript";

	const result = dbRead("NODE");
	console.log(result);`
}
const GetComponent = () => {
	const [dbResult, setDbResult] = React.useState({});

  return (
    <GuideBox width={520} spacing={5} center paddingBottom={1}>
      <CodeBlock language="typescript" title="script" width={490}>
        {Script()}
      </CodeBlock>
			<Button 
				color='negative' 
				onClick={() => {
					const result = dbRead("NODE");
					console.log(result);
					setDbResult(result);
				}}
			>
				Execution
			</Button>
			{dbResult !== "" && <ComponentsDataGrid inputObject={dbResult as InputObject} />}
    </GuideBox>
  );
};

export default GetComponent;
