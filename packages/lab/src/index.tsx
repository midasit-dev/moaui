import React from "react";
import ReactDOM from "react-dom/client";
import { Box } from "@lib/Sketch/2D";
import { type CanvasDimension2D, type UserDefinedBox } from '@lib/Sketch/2D/types';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  (() => {
		const canvasDim: CanvasDimension2D = [400, 400];
    return (
      <React.Fragment>
        <Box
					canvasDim={canvasDim}
					startCoords={[200, 200]}
					b={100}
					h={100}
				/>
      </React.Fragment>
    );
  })()
);
