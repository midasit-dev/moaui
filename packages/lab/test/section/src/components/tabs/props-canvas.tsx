import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import * as _ from 'lodash';
import { Android12Switch } from '../switch';
import ColorPicker from './color-picker';

const PropsCanvas = (props: any) => {
	const { allProps, setAllProps } = props;

	const handleCanvas = _.debounce((value: any) => {
		setAllProps((prev: any) => {
			return {
				...prev,
				canvas: {
					...prev.canvas,
					...value,
				}
			};
		});
	}, 500);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">🎨 Canvas</Typography>
        <Android12Switch
          checked={allProps.canvas !== undefined}
          onChange={(e: any) => {
            if (!e.target.checked) {
              const newObj = { ...allProps };
              delete newObj.canvas;
              setAllProps(newObj);
            } else {
              setAllProps({
                ...allProps,
                canvas: defaultCanvasValue,
              });
            }
          }}
        />
      </Stack>
      {allProps.canvas && (
        <Stack spacing={1}>
          <ColorPicker
            title="background"
            defaultValue={defaultCanvasValue.background}
            onChange={(color: any) => handleCanvas({ background: color })}
          />
          <TextField
            {...textfieldStyle}
            defaultValue={allProps.canvas.dimension.width}
            onChange={(e: any) =>
              handleCanvas({
                dimension: {
                  ...allProps.canvas.dimension,
                  width: e.target.value,
                },
              })
            }
            helperText={`dimension-width`}
          />
          <TextField
            {...textfieldStyle}
            defaultValue={allProps.canvas.dimension.height}
            onChange={(e: any) =>
              handleCanvas({
                dimension: {
                  ...allProps.canvas.dimension,
                  height: e.target.value,
                },
              })
            }
            helperText={`dimension-height`}
          />
          <TextField
            {...textfieldStyle}
            defaultValue={allProps.canvas.translateCoords}
            onChange={(e: any) =>
              handleCanvas({
                translateCoords: e.target.value.split(",").map(Number) as [
                  number,
                  number
                ],
              })
            }
            helperText={`translateCoords (x, y)`}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" minWidth={130}>
              auto Scale
            </Typography>
            <Android12Switch
              checked={allProps.canvas.autoScale}
              onChange={(e: any) =>
                handleCanvas({ autoScale: e.target.checked })
              }
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body2" minWidth={130}>
              scale
            </Typography>
            <Slider
              disabled={allProps.canvas.autoScale}
              aria-label="Scale"
              defaultValue={1}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={0.1}
              marks
              min={1}
              max={3}
              onChange={(e: any, value: number | number[]) =>
                handleCanvas({ scale: value })
              }
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body2" minWidth={130}>
              rotate
            </Typography>
            <Slider
              aria-label="Rotate"
              defaultValue={1}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={0}
              step={15}
              marks
              min={0}
              max={360}
              onChange={(e: any, value: number | number[]) =>
                handleCanvas({ rotate: value })
              }
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" minWidth={130}>
              guide Line
            </Typography>
            <Android12Switch
              checked={allProps.canvas.guideLine}
              onChange={(e: any) =>
                handleCanvas({ guideLine: e.target.checked })
              }
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default PropsCanvas;

const textfieldStyle = {
	fullWidth: true,
	defaultValue: "",
	size: "small",
	variant: "standard",
	hiddenLabel: true,
} as TextFieldProps;

const defaultCanvasValue = {
	background: '#f4f6f7',
	dimension: { width: 500, height: 500 },
	translateCoords: '0, 0',
	autoScale: true,
	scale: 1,
	rotate: 0,
	guideLine: false,
}