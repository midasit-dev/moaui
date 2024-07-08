import { GuideBox } from '@midasit-dev/moaui';
import React from 'react';
import { type Layers } from '../../../types';
import { useRecoilValue } from 'recoil';
import { LayersState } from '../recoilState';

const BoxContainerAbsolute = (props: { data: Layers }) => {
  return (
    <div style={{ position: 'relative' }}>
      {props.data.map((box) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${box.props.x}px`,
          top: `${box.props.y}px`,
          width: `${box.props.width}px`,
          height: `${box.props.height}px`,
          border: '1px solid black',
        };

        return (
          <div key={box.id} style={style}>
            {/* You can add content for each box here. */}
          </div>
        );
      })}
    </div>
  );
};

// const BoxContainerRelative = (props: { data: LayoutSchemas }) => {
//   const calculateMarginTop = (box: LayoutSchema, previousBox: LayoutSchema | null): number => {
//     return previousBox ? box.y - (previousBox.y + previousBox.height) : box.y;
//   };

//   const calculateMarginLeft = (box: LayoutSchema, previousBox: LayoutSchema | null): number => {
//     return box.x;
//   };

//   const renderBoxes = (parentId: string | null): React.ReactNode => {
//     return props.data
//       .filter((box) => box.parent === parentId)
//       .map((box, index, array) => {
//         const prevBox = array[index - 1] || null;
//         const marginTop = calculateMarginTop(box, prevBox);
//         const marginLeft = calculateMarginLeft(box, prevBox);

//         const boxStyle: React.CSSProperties = {
//           position: 'relative',
//           width: `${box.width}px`,
//           height: `${box.height}px`,
//           border: '1px solid black',
//           marginTop: `${marginTop}px`,
//           marginLeft: `${marginLeft}px`,
//           boxSizing: 'border-box',
//         };

//         return (
//           <div key={box.id} style={boxStyle}>
//             {renderBoxes(box.id)}
//             {/* You can add content for each box here. */}
//           </div>
//         );
//       });
//   };

//   return <div>{renderBoxes(null)}</div>;
// };

const App = () => {
	const layers = useRecoilValue(LayersState);
	if (!layers) {
		console.error('No layout schemas provided.');
		return null;
	}

  return (
    <div>
      <GuideBox row spacing={3}>
        <GuideBox>
          <BoxContainerAbsolute data={layers} />
        </GuideBox>
      </GuideBox>
    </div>
  );
};

export default App;
