import React from "react";
import ReactDOM from "react-dom/client";
import { Box, UserDefinedBox } from "@lab/Sketch/2D";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  (() => {
		const boxType1 = {
			canvas: {
				background: '#d1d1d1',
				dimension: [200, 200]
			},
			shape: {
				startCoords: [50, 50],
				fill: 'white',
				stroke: 'red',
				strokeWeight: 5
			}
		} as UserDefinedBox;

		const boxType2 = {
			canvas: {
				dimension: [200, 200]
			},
			shape: {
				startCoords: [50, 50],
				fill: 'white',
				stroke: 'red',
				strokeWeight: 4
			}
		} as UserDefinedBox;

		const boxType3 = {
			shape: {
				startCoords: [50, 50],
				fill: 'white',
				stroke: 'red',
				strokeWeight: 3
			}
		} as UserDefinedBox;

		const boxType4 = {
			shape: {
				fill: 'white',
				stroke: 'red',
				strokeWeight: 2
			}
		} as UserDefinedBox;

		const boxType5 = {
			shape: {
				stroke: 'red',
				strokeWeight: 1
			}
		} as UserDefinedBox;

		const boxType6 = {
			shape: {
				strokeWeight: 3
			}
		} as UserDefinedBox;

    return (
      <React.Fragment>
        <Box {...boxType1} b={100} h={100} />
				<Box {...boxType2} b={100} h={100} />
				<Box {...boxType3} b={100} h={100} />
				<Box {...boxType4} b={100} h={100} />
				<Box {...boxType5} b={100} h={100} />
				<Box {...boxType6} b={100} h={100} />
				<Box b={100} h={100} />
      </React.Fragment>
    );
  })()
);
