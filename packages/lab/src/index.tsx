import React from "react";
import ReactDOM from "react-dom/client";
import {
	Default as PG,
} from "@lablib/Section/2D/Polygon/sample";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				<PG />
      </React.Fragment>
    );
  })()
);
