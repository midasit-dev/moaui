import { useState, useRef, useEffect } from "react";
import { ReactSVGPanZoom, TOOL_PAN, type Tool, type Value } from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader } from "react-svg-pan-zoom-loader";
import { Node_BP_Data } from "../variables";

const Viewer = (props: any) => {
  const { width, height } = props;
  const Viewer = useRef(null);
  const [tool, setTool] = useState<Tool>(TOOL_PAN);
  const [value, setValue] = useState<Value | null>(null);
  //const smaple = 'https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/svg/midas_ci_mono_350_150.svg';
  
  const [timeStamp, setTimeStamp] = useState<string>('');

  useEffect(() => {
    const curTime = new Date().getTime().toString();
    setTimeStamp(curTime);

  }, []);
  
  return (
    <ReactSvgPanZoomLoader
      src={`https://api.job-runner.dwg.kr-dv-midasit.com/result.svg?${timeStamp}`}
      render={(content) => (
        <ReactSVGPanZoom
          ref={Viewer}
          width={width}
          height={height}
          tool={tool}
          onChangeTool={setTool}
          value={value}
          onChangeValue={setValue}
          onZoom={(e) => console.log("zoom")}
          onPan={(e) => console.log("pan")}
          onClick={(event) =>
            console.log("click", event.x, event.y, event.originalEvent)
          }
        >
          <svg width={width} height={height}>
            {content}
          </svg>
        </ReactSVGPanZoom>
      )}
    />
  );
};

export default Viewer;