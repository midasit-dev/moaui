import { GuideBox, ExperimentalPolygon as Polygon } from "@midasit-dev/moaui";

const coordinates = [
	[0, 0],
	[0, 20],
	[20, 20],
	[20, 0]
];

const App = () => {
  return (
		<GuideBox tag="rows" spacing={2}>
			<GuideBox tag="row-1" row spacing={2}>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="butt"
					strokeLinejoin="round"
					strokeDasharray="1 1"
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="leftTop"
				/>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="bevel"
					strokeDasharray="10 2 3"
					strokeDashoffset={1}
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="top"
				/>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeDasharray="10"
					strokeDashoffset={1}
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="rightTop"
				/>
			</GuideBox>
			<GuideBox tag="row-2" row spacing={2}>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="butt"
					strokeLinejoin="round"
					strokeDasharray="1 1"
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="left"
				/>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="bevel"
					strokeDasharray="10 2 3"
					strokeDashoffset={1}
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="center"
				/>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeDasharray="10"
					strokeDashoffset={1}
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="right"
				/>
				
			</GuideBox>
			<GuideBox tag="row-3" row spacing={2}>
				
				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="butt"
					strokeLinejoin="round"
					strokeDasharray="1 1"
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="leftBottom"
				/>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="bevel"
					strokeDasharray="10 2 3"
					strokeDashoffset={1}
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="bottom"
				/>

				<Polygon
					coordinates={coordinates}
					scale={10}
					fill="#f5f6f7"
					fillRule="evenodd"
					stroke="#a1a1a1"
					strokeWidth="1"
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeDasharray="10"
					strokeDashoffset={1}
					labels={[ 'Label 1', 'Label 2', 'Label 3' ]}
					labelSpacing={1}
					labelPosition="rightBottom"
				/>

			</GuideBox>
		</GuideBox>
  );
}

export default App;