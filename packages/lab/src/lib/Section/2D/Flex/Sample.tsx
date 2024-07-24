import { Flex } from "@lablib/Section/2D";

const Sample = () => {
	return (
		<Flex 
			canvas={{
				background: '#d1d1d1',
				dimension: {
					width: 500,
					height: 700,
				},
			}}

			solidRectangle={{
				shape: {
					startCoords: [100, 500],
					fill: 'white',
				},
				referLine: {
					b: {}, h: {}
				},
				b: 100,
				h: 100,
			}}

			hSection={{
				shape: {
					startCoords: [100, 100],
				},
				referLine: {
					h: {}, tw: {}, b1: {}, tf1: {}, b2: {}, tf2: {}, r1: {}, r2: {},
				},
				h: 200,
				tw: 30,
				b1: 200,
				tf1: 30,
				b2: 150,
				tf2: 50,
				r1: 15,
				r2: 15,
			}}
		/>
	)
}

export default Sample;