import { HSection } from '@lablib/Section/2D';

const Sample = () => {
	return (
    <HSection
      canvas={{
        background: "#e7e8e9",
        dimension: [400, 400],
      }}
      shape={{
        startCoords: [100, 100],
        fill: "white",
        stroke: "black",
        strokeWeight: 1,
      }}
			referLine={{
				h: {},
				tw: {},
				b1: {},
				tf1: {},
				b2: {},
				tf2: {},
				r1: {},
				r2: {},
			}}
      h={200}
			tw={30}
			b1={200}
			tf1={50}
			b2={200}
			tf2={20}
			r1={20}
			r2={20}
    />
  );
};

export default Sample;