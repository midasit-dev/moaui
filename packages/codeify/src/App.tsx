import { useState } from "react";
import { Stack, Tabs, Tab, Box } from "@mui/material";
import { XlsxToCode, XlsxToJson, JsonToRender } from "./lib";
import MonacoEditor from "@monaco-editor/react";

const TestApp = () => {
  const [tabValue, setTabValue] = useState<number>(1);

  const [json, setJson] = useState<any>({});

  return (
    <Stack spacing={2}>
      <Tabs
        value={tabValue}
        onChange={(e: any, newValue: any) => setTabValue(newValue)}
      >
        <Tab label="JSON 변환" value={1} />
        <Tab label="JSON 렌더링" value={2} />
        <Tab label="TSX 코드 추출" value={3} />
      </Tabs>

      {tabValue === 1 && <JSONConvert {...{ json, setJson }} />}
      {tabValue === 2 && <JSONRendering json={json} />}
      {tabValue === 3 && <TSXExtractFromExcel />}
    </Stack>
  );
};

export default TestApp;

const JSONConvert = (props: any) => {
  const { setJson } = props;

  return <XlsxToJson onChange={(json: any) => setJson(json)} />;
};

const JSONRendering = (props: any) => {
  const { json } = props;
  const [forRenderJson, setForRenderJson] = useState<any>(json);

  return (
    <Box sx={{ height: "400px", marginTop: "20px" }}>
      <MonacoEditor
        theme="vs-dark"
        height="500px"
        language="json"
        value={JSON.stringify(json, null, 2)}
        options={{
          readOnly: false,
          minimap: { enabled: false },
        }}
        onChange={(value) => setForRenderJson(JSON.parse(value || "{}"))}
      />
      <JsonToRender json={forRenderJson} />
    </Box>
  );
};

const TSXExtractFromExcel = () => {
  return <XlsxToCode />;
};
