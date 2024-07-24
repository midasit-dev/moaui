import { SolidRectangle } from '@lablib/Section/2D';

export const Default = () => {
	return (
    <SolidRectangle
      canvas={{
        background: "#e7e8e9",
        dimension: [300, 300],
      }}
      shape={{
        fill: "white",
        stroke: "black",
        strokeWeight: 1,
      }}
      referLine={{
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

export const NoCanvas = () => {
	return (
		<SolidRectangle
			referLine={{
				b: {},
				h: {},
			}}
			b={100}
			h={100}
		/>
	)
}

export const AutoScale = () => {
	return (
		<SolidRectangle
			canvas={{
				dimension: {
					width: 500,
					height: 500,
				},
				autoScale: true, // 기본 값
			}}
			referLine={{ b: {}, h: {}, }}
			b={100}
			h={100}
		/>
	)
}

export const Scale = () => {
	return (
		<SolidRectangle
			canvas={{
				dimension: {
					width: 500,
					height: 500,
				},
				autoScale: false,
				scale: 3,
			}}
			referLine={{ b: {}, h: {}, }}
			b={100}
			h={100}
		/>
	)
}