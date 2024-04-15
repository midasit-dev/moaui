import { Button, CodeBlock, GuideBox, Typography } from "@midasit-dev/moaui";
import React from "react";
import { dbUpdate } from "../../utils_pyscript";

const Script = () => {
	return `import { dbUpdate } from "../utils_pyscript";

	const result = dbUpdate("NODE", {
		"1": {
			"X": 1,
			"Y": 2,
			"Z": 3
		},
		"2": {
			"X": 4,
			"Y": 5,
			"Z": 6.1
		}
	});
	console.log(result);`
}
const Putcomponent = () => {
	const [dbResult, setDbResult] = React.useState('');

  return (
    <GuideBox width={520} spacing={5} center paddingBottom={1}>
      <CodeBlock language="typescript" title="script" width={490}>
        {Script()}
      </CodeBlock>
			<Button 
				color='negative' 
				onClick={() => {
					const result = dbUpdate("NODE", {
						"1": {
							"X": 1,
							"Y": 2,
							"Z": 3
						},
						"2": {
							"X": 4,
							"Y": 5,
							"Z": 6.1
						}
					});
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

const PythonFetchingExamples = () => {
  return (
    <GuideBox>
			<Putcomponent />
		</GuideBox>
  );
};

export default PythonFetchingExamples;
