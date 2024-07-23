import React from "react";
import ReactDOM from "react-dom/client";
import SampleSolidRectangle from "@lablib/Section/2D/SolidRectangle/sample";
import SampleHSection from "@lablib/Section/2D/HSection/sample";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				<SampleSolidRectangle />
				<SampleHSection />
      </React.Fragment>
    );
  })()
);
