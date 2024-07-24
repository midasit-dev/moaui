import React from "react";
import ReactDOM from "react-dom/client";
import { Default as SR, NoCanvas as SR1, AutoScale as SR2 } from "@lablib/Section/2D/SolidRectangle/sample";
import { Default as HS, NoCanvas as HS1, AutoScale as HS2 } from "@lablib/Section/2D/HSection/sample";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				<SR />
				<SR1 />
				<SR2 />
				<HS />
				<HS1 />
				<HS2 />
      </React.Fragment>
    );
  })()
);
