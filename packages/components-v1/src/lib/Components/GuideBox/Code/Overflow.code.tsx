import React from "react"; /**${comma}*/
import { GuideBox, Panel, TextField } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsGuideBoxRowDirection = () => {
  const [width, setWidth] = React.useState<string>("100%");
  const [padding, setPadding] = React.useState<number>(2);

  return (
    <GuideBox show width={300} fill="1" padding={2} spacing={2}>
      <TextField
				width='100%'
				title="width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <TextField
				width='100%'
        title="padding"
        value={padding.toString()}
        onChange={(e) => setPadding(+e.target.value)}
      />

      <Panel width={width} padding={padding}>
        {`width: ${width}`}
      </Panel>
      <Panel width={width} padding={padding}>
        {`padding: ${padding}`}
      </Panel>
      <GuideBox show width={width} padding={padding}>
        <GuideBox show width={width} padding={padding}>
          <GuideBox show width={width} padding={padding} center>
            Center
          </GuideBox>
        </GuideBox>
      </GuideBox>
    </GuideBox>
  );
}; /**${comma}*/

export default ComponentsGuideBoxRowDirection;
