import React from "react";
import ReactDOM from "react-dom/client";
import {
  Default as SR,
  NoCanvas as SR1,
  AutoScale as SR2,
  Scale as SR3,
  Rotate as SR4,
  Offset as SR5,
	Guide as SR6,
} from "@lablib/Section/2D/SolidRectangle/sample";
import {
  Default as HS,
  NoCanvas as HS1,
  AutoScale as HS2,
  Scale as HS3,
  Rotate as HS4,
  Offset as HS5,
	Guide as HS6,
} from "@lablib/Section/2D/HSection/sample";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				{/* <SR />
				<SR1 />
				<SR2 />
				<SR3 />
				<SR4 /> */}
				{/* <SR5 /> */}
				<SR6 />
				{/* <HS />
				<HS1 />
				<HS2 />
				<HS3 />
				<HS4 /> */}
				{/* <HS5 />  */}
				<HS6 />
      </React.Fragment>
    );
  })()
);
