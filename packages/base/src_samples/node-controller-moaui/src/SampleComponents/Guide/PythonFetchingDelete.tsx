
import { Button, CodeBlock, GuideBox, Typography } from "@midasit-dev/moaui";
import React from "react";
import { dbDelete } from "../../utils_pyscript";

const Script = () => {
	return `import { dbDelete } from "../utils_pyscript";

	const result = dbDelete("NODE", 1);
	console.log(result);`
}
const DeleteComponent = () => {
	const [dbResult, setDbResult] = React.useState('');

  return (
    <GuideBox width={520} spacing={5} center paddingBottom={1}>
      <CodeBlock language="typescript" title="script" width={490}>
        {Script()}
      </CodeBlock>
			<Button 
				color='negative' 
				onClick={() => {
					const result = dbDelete("NODE", 1);
					console.log(result);
					setDbResult(JSON.stringify(result, null, 2));
				}}
			>
				Execution
			</Button>
			{dbResult !== "" && <Typography size="medium">{dbResult}</Typography>}
    </GuideBox>
  );
};

export default DeleteComponent;
