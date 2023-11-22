import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { ReactComponent as TextFieldIcon } from "../../../svg/TextField.svg";

export default function TextFieldIconCompo(): React.ReactElement {
	const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXTFIELD,
		item: {type:ItemTypes.TEXTFIELD},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

	return (
		<div 
			ref={drag}
			style={{
        cursor: 'grab',
				opacity: isDragging ? 0.5 : 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<TextFieldIcon />
		</div>
	)
}