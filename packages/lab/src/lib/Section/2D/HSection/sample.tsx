import { HSection } from '@lablib/Section/2D';

export const Default = () => {
	return (
    <HSection
			canvas={{
				dimension: {
					width: 400,
					height: 400,
				}
			}}
			referLine={{ h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {}, }}
      h={200}
			tw={30}
			b1={200}
			tf1={50}
			b2={200}
			tf2={50}
			r1={0}
			r2={0}
    />
  );
};

export const NoCanvas = () => {
	return (
    <HSection
			canvas={{
				dimension: {
					width: 500,
					height: 500,
				},
				autoScale: false,
			}}
      referLine={{ h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {}, }}
      h={200}
      tw={30}
      b1={200}
      tf1={50}
      b2={200}
      tf2={50}
      r1={0}
      r2={0}
    />
  );
}

export const AutoScale = () => {
	return (
    <HSection
			canvas={{
				dimension: {
					width: 500,
					height: 500,
				},
				autoScale: true, // 기본 값
			}}
      referLine={{ h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {}, }}
      h={200}
      tw={30}
      b1={200}
      tf1={50}
      b2={200}
      tf2={50}
      r1={10}
      r2={10}
    />
  );
}

export const Scale = () => {
	return (
    <HSection
			canvas={{
				dimension: {
					width: 500,
					height: 500,
				},
				autoScale: false,
				scale: 2,
			}}
      referLine={{ h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {}, }}
      h={200}
      tw={30}
      b1={200}
      tf1={50}
      b2={200}
      tf2={50}
      r1={10}
      r2={10}
    />
  );
}

export const Rotate = () => {
	return (
    <HSection
			canvas={{
				dimension: {
					width: 500,
					height: 500,
				},
				autoScale: false,
				scale: 2,
				rotate: 45,
			}}
      referLine={{ h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {}, }}
      h={200}
      tw={30}
      b1={200}
      tf1={50}
      b2={200}
      tf2={50}
      r1={10}
      r2={10}
    />
  );
}

export const Offset = () => {
	return (
    <>
      <HSection
				canvas={{
					dimension: {
						width: 500,
						height: 500
					},
					autoScale: false,
					rotate: 45,
				}}
        referLine={{
          h: {},
          tw: {},
          b1: {
						offset: 100,
					},
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
        tf2={50}
        r1={10}
        r2={10}
      />
    </>
  );
}

export const Guide = () => {
	return (
    <>
      <HSection
				canvas={{
					dimension: {
						width: 500,
						height: 500
					},
					autoScale: true,
					rotate: 0,
					guideLine: false,
				}}
      
        h={200}
        tw={30}
        b1={200}
        tf1={50}
        b2={200}
        tf2={50}
        r1={10}
        r2={10}
      />
    </>
  );
}