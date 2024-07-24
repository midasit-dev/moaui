import React from "react";
import ReactDOM from "react-dom/client";
// import SampleSolidRectangle from "@lablib/Section/2D/SolidRectangle/sample";
// import SampleHSection from "@lablib/Section/2D/HSection/sample";
// import SamplesHSection from "@lablib/Section/2D/HSection/samples";
import SampleFlex from "@lablib/Section/2D/Flex/Sample";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				{/* <SampleSolidRectangle /> */}
				{/* <SampleHSection /> */}
				{/* <SamplesHSection /> */}
				<SampleFlex />
      </React.Fragment>
    );
  })()
);
