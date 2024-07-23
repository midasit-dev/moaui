import { SolidRectangle } from '@lablib/Section/2D';

const Sample = () => {
	return (
    <SolidRectangle
      canvas={{
        background: "#e7e8e9",
        dimension: [300, 300],
      }}
      shape={{
        startCoords: [100, 100],
        fill: "white",
        stroke: "black",
        strokeWeight: 1,
      }}
      dimensionLine={{
        b: {
          offset: 20,
          lineExtension: 5,
          lineExtensionAngle: 5,
          lineColor: "blue",
          lineWeight: 1,
          text: null,
          textColor: "red",
          textSize: 14,
          textOffset: 15,
        },
        h: {
          offset: 20,
          lineExtension: 5,
          lineExtensionAngle: 5,
          lineColor: "black",
          lineWeight: 1,
          text: null,
          textColor: "black",
          textSize: 14,
          textOffset: 15,
        },
      }}
      b={100}
      h={100}
    />
  );
};

export default Sample;