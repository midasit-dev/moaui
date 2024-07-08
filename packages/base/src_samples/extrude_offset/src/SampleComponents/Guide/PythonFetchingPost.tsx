
import { Button, CodeBlock, GuideBox, Typography } from "@midasit-dev/moaui";
import React from "react";
import { dbCreate } from "../../utils_pyscript";

const Script = () => {
	return `import { dbCreate } from "../utils_pyscript";

	const result = dbCreate("NODE", {
		"1": {
			"X": 0,
			"Y": 0,
			"Z": 0
		},
		"2": {
			"X": 5,
			"Y": 0,
			"Z": 3.6
		}
	});
	console.log(result);`
}
const PostComponent = () => {
	const [dbResult, setDbResult] = React.useState('');

  return (
    <GuideBox width={520} spacing={5} center paddingBottom={1}>
      <CodeBlock language="typescript" title="script" width={490}>
        {Script()}
      </CodeBlock>
			<Button 
				color='negative' 
				onClick={() => {
					const result = dbCreate("NODE", {
						"1": {
							"X": 0,
							"Y": 0,
							"Z": 0
						},
						"2": {
							"X": 5,
							"Y": 0,
							"Z": 3.6
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
			<PostComponent />
		</GuideBox>
  );
};

export default PythonFetchingExamples;
