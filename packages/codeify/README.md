<!-- markdownlint-disable-next-line -->
<h1 align="center">codeify</h1>

<p align="center">
  The <strong>codeify</strong> library extracts JSON from Excel files, provides a React component to render the data, and even generates TSX code based on the JSON data. It's designed to streamline the process of working with Excel data in web applications.
</p>

## Concept

`codeify` enables seamless integration of Excel data into your React projects by providing tools to convert Excel files to JSON, render the data, and generate TypeScript code.

### Key Features:
- **XlsxToJson**: Converts Excel files into JSON format.
- **JsonToRender**: Renders the JSON data using React components.
- **XlsxToCode**: Generates TypeScript (TSX) code based on the extracted JSON data.

## Installation

You can install the `codeify` library using npm, yarn, or pnpm:

```bash
$ npm install codeify
or
$ yarn add codeify
or
$ pnpm add codeify
```

## Usage
Here's a basic example demonstrating how to use codeify in a React project:  
```typescript
import { useState } from "react";
import { Stack } from "@mui/material";
import { XlsxToCode, XlsxToJson, JsonToRender } from "codeify";

const TestApp = () => {
  const [json, setJson] = useState<any>({});

  return (
    <Stack>
      <div>
        <XlsxToJson onChange={(json: any) => setJson(json)} />
      </div>
      <div>
        <JsonToRender json={json} />
      </div>
    </Stack>
  );
};

export default TestApp;
```

## Components:
- XlsxToJson: A React component that accepts an Excel file and converts it into JSON format.
- JsonToRender: A React component that renders the JSON data in a structured format.
- XlsxToCode: A utility that generates TypeScript (TSX) code based on the JSON data extracted from the Excel file.

## Example Use Case
Below is an example use case demonstrating how codeify can be utilized to handle Excel data:  
```typescript
import { XlsxToJson, JsonToRender, XlsxToCode } from "codeify";

// Example component usage
const ExampleComponent = () => {
  const [jsonData, setJsonData] = useState<any>({});

  return (
    <div>
      <XlsxToJson onChange={(json: any) => setJsonData(json)} />
      <JsonToRender json={jsonData} />
      <pre>{XlsxToCode(jsonData)}</pre> {/* TSX code output */}
    </div>
  );
};

export default ExampleComponent;
```

## Contributing
We welcome contributions to improve this library. Please feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License.
