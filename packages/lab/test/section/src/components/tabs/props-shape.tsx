import { Slider, Stack, Typography } from '@mui/material';
import * as _ from 'lodash';
import { Android12Switch } from '../switch';
import ColorPicker from './color-picker';

const PropsShape = (props: any) => {
	const { allProps, setAllProps } = props;

	const handleShape = _.debounce((value: any) => {
		setAllProps((prev: any) => {
			return {
				...prev,
				shape: {
					...prev.shape,
					...value,
				}
			};
		});
	}, 500);

	return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">🔶 Shape</Typography>
        <Android12Switch
          checked={allProps.shape !== undefined}
          onChange={(e: any) => {
            if (!e.target.checked) {
              const newObj = { ...allProps };
              delete newObj.shape;
              setAllProps(newObj);
            } else {
              setAllProps({
                ...allProps,
                shape: defaultShapeValue,
              });
            }
          }}
        />
      </Stack>
      {allProps.shape && (
        <Stack spacing={1}>
					<ColorPicker
						title="fill"
						defaultValue={defaultShapeValue.fill}
						onChange={(color: any) => handleShape({ fill: color })}
					/>
					<ColorPicker
            title="stroke"
            defaultValue={defaultShapeValue.stroke}
            onChange={(color: any) => handleShape({ stroke: color })}
          />
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={100}>stroke Weight</Typography>
            <Slider
              aria-label="Stroke Weight"
              defaultValue={defaultShapeValue.strokeWeight}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks
              min={1}
              max={10}
              onChange={(e: any, value: number | number[]) => handleShape({ strokeWeight: value })}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default PropsShape;

const defaultShapeValue = {
	fill: 'white',
	stroke: '#000000',
	strokeWeight: 1,
}