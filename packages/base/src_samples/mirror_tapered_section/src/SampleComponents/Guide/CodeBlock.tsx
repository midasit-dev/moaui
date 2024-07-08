import React from "react";
import { CodeBlock } from "@midasit-dev/moaui";

const CodeBlockComponent = () => {
  return (
    <CodeBlock language="typescript" width={505}>
      {`import React from 'react';
import DataGridSet from './SampleComponents/Guide/DataGridSet';

function App() {
return <DataGridSet />;
}

export default App;`}
    </CodeBlock>
  );
};

export default CodeBlockComponent;
