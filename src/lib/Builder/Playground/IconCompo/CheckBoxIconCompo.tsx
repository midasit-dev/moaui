import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
// import { ReactComponent as ButtonIcon } from "../svg/Button.svg";

export default function CheckBoxIconCompo(): React.ReactElement {
	const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CHECKBOX,
		item: {type:ItemTypes.CHECKBOX},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

	return (
		<div 
			ref={drag}
			style={{
				width: '100%',
        cursor: 'grab',
				opacity: isDragging ? 0.5 : 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			CheckBox
		</div>
	)
}