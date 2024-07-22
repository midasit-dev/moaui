import React from "react";
import ReactDOM from "react-dom/client";
import { Box } from "@lablib/Sketch/2D";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
  (() => {
    return (
      <React.Fragment>
				<Box 
					canvas={{
						background: '#e7e8e9',
						dimension: [300, 300]
					}}
					shape={{
						startCoords: [100, 100],
						fill: 'white',
						stroke: 'black',
						strokeWeight: 1
					}}
					dimensionLine={{
						bottom: {
							offset: 20,
							lineExtension: 5,
							lineExtensionAngle: 5,
							lineColor: 'black',
							lineWeight: 1,
							text: null,
							textColor: 'black',
							textSize: 14,
							textOffset: 15,
						},
						right: {
							offset: 20,
							lineExtension: 5,
							lineExtensionAngle: 5,
							lineColor: 'black',
							lineWeight: 1,
							text: null,
							textColor: 'black',
							textSize: 14,
							textOffset: 15,
						},
						top: {
							offset: 20,
							lineExtension: 5,
							lineExtensionAngle: 5,
							lineColor: 'black',
							lineWeight: 1,
							text: null,
							textColor: 'black',
							textSize: 14,
							textOffset: 15,
						},
						left: {
							offset: 20,
							lineExtension: 5,
							lineExtensionAngle: 5,
							lineColor: 'black',
							lineWeight: 1,
							text: null,
							textColor: 'black',
							textSize: 14,
							textOffset: 15,
						}
					}}
					b={100} 
					h={100} 
				/>
      </React.Fragment>
    );
  })()
);

//node_modules/@midasit-dev/moaui
//node_modules/@midasit-dev/moaui-base
//node_modules/@lablib
