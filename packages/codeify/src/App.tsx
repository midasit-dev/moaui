import { useState } from "react";
import { Stack } from "@mui/material";
import { XlsxToCode, XlsxToJson, JsonToRender } from "./lib";

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
