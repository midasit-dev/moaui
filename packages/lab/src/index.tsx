import React from "react";
import ReactDOM from "react-dom/client";
import { Default as SR, NoCanvas as SR1 } from "@lablib/Section/2D/SolidRectangle/sample";
import { Default as HS, NoCanvas as HS1 } from "@lablib/Section/2D/HSection/sample";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				<SR />
				{/* <SR1 /> */}
				<HS />
				{/* <HS1 /> */}
      </React.Fragment>
    );
  })()
);
