import { HSection } from '@lablib/Section/2D';

export const Default = () => {
	return (
    <HSection
      canvas={{ dimension: [350, 350], }}
			referLine={{ h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {}, }}
      h={200}
			tw={30}
			b1={130}
			tf1={50}
			b2={200}
			tf2={50}
			r1={0}
			r2={0}
    />
  );
};

export const NoCanvas = () => {
	return <></>;
}