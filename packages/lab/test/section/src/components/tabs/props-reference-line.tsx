import { Slider, Stack, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ExpandIcon from '@mui/icons-material/Expand';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { Android12Switch } from '../switch';
import ColorPicker from './color-picker';

const PropsReferLine = (props: any) => {
	const { allProps, setAllProps, titles } = props;

	const handleReferLine = _.debounce((value: any) => {
		setAllProps((prev: any) => {
			return {
				...prev,
				referLine: {
					...prev.referLine,
					...value,
				}
			};
		});
	}, 500);

	useEffect(() => {
		console.log(allProps.referLine);
	}, [allProps.referLine]);

	return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">🌌 Reference Line</Typography>
        {/* <Android12Switch
          checked={allProps.referLine !== undefined}
          onChange={(e: any) => {
            if (!e.target.checked) {
              const newObj = { ...allProps };
              delete newObj.referLine;
              setAllProps(newObj);
            } else {
              setAllProps({
                ...allProps,
                referLine: defaultReferLineValue,
              });
            }
          }}
        /> */}
      </Stack>
      {titles.map((title: string) => {
        return (
          <PropsDimLine
            key={title}
            allProps={allProps}
            setAllProps={setAllProps}
            title={title}
            handleReferLine={handleReferLine}
          />
        );
      })}
    </>
  );
}

export default PropsReferLine;

const PropsDimLine = (props: any) => {
	const { allProps, setAllProps, title, handleReferLine } = props;

	const [isExpand, setIsExpand] = useState(false);

	return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6">{title}</Typography>
          <Android12Switch
            checked={allProps.referLine[title] !== undefined}
            onChange={(e: any) => {
              if (!e.target.checked) {
                const newReferLine = { ...allProps.referLine };
                delete newReferLine[title];
                setAllProps({ ...allProps, referLine: newReferLine });
              } else {
                setAllProps({
                  ...allProps,
                  referLine: {
                    ...allProps.referLine,
                    [title]: defaultDimLine,
                  },
                });
              }
            }}
          />
        </Stack>
        <IconButton
          aria-label="expand"
          onClick={() => setIsExpand(!isExpand)}
          disabled={allProps.referLine[title] === undefined}
        >
          <ExpandIcon />
        </IconButton>
      </Stack>
      {isExpand && allProps.referLine[title] !== undefined && (
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={150}>
              Offset
            </Typography>
            <Slider
              aria-label="Offset"
              defaultValue={defaultDimLine.offset}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={20}
              step={5}
              marks
              min={0}
              max={100}
              onChange={(e: any, value: number | number[]) => {
                handleReferLine({
                  [title]: {
                    ...allProps.referLine[title],
                    offset: value,
                  },
                });
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={150}>
              line extension
            </Typography>
            <Slider
              aria-label="line extension"
              defaultValue={defaultDimLine.lineExtension}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={5}
              step={1}
              marks
              min={0}
              max={30}
              onChange={(e: any, value: number | number[]) => {
                handleReferLine({
                  [title]: {
                    ...allProps.referLine[title],
                    lineExtension: value,
                  },
                });
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={150}>
              line extension angle
            </Typography>
            <Slider
              aria-label="line extension angle"
              defaultValue={defaultDimLine.lineExtensionAngle}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={5}
              step={5}
              marks
              min={0}
              max={360}
              onChange={(e: any, value: number | number[]) => {
                handleReferLine({
                  [title]: {
                    ...allProps.referLine[title],
                    lineExtensionAngle: value,
                  },
                });
              }}
            />
          </Stack>
          <ColorPicker
            title="line color"
            defaultValue={defaultDimLine.lineColor}
            onChange={(color: any) => {
              handleReferLine({
                [title]: {
                  ...allProps.referLine[title],
                  lineColor: color,
                },
              });
            }}
          />
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={150}>
              line weight
            </Typography>
            <Slider
              aria-label="line weight"
              defaultValue={defaultDimLine.lineWeight}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks
              min={0}
              max={10}
              onChange={(e: any, value: number | number[]) => {
                handleReferLine({
                  [title]: {
                    ...allProps.referLine[title],
                    lineWeight: value,
                  },
                });
              }}
            />
          </Stack>
          <TextField
            {...textfieldStyle}
            defaultValue={defaultDimLine.text}
            onChange={(e: any) =>
              handleReferLine({
                [title]: { ...allProps.referLine[title], text: e.target.value },
              })
            }
            helperText="text"
            placeholder={allProps[title]}
          />
          <ColorPicker
            title="text color"
            defaultValue={defaultDimLine.textColor}
            onChange={(color: any) => {
              handleReferLine({
                [title]: {
                  ...allProps.referLine[title],
                  textColor: color,
                },
              });
            }}
          />
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={150}>
              text size
            </Typography>
            <Slider
              aria-label="text size"
              defaultValue={defaultDimLine.textSize}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={defaultDimLine.textSize}
              step={1}
              marks
              min={0}
              max={30}
              onChange={(e: any, value: number | number[]) => {
                handleReferLine({
                  [title]: {
                    ...allProps.referLine[title],
                    textSize: value,
                  },
                });
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" minWidth={150}>
              text offset
            </Typography>
            <Slider
              aria-label="text offset"
              defaultValue={defaultDimLine.textOffset ?? 0}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              shiftStep={defaultDimLine.textOffset ?? 0}
              step={5}
              marks
              min={0}
              max={100}
              onChange={(e: any, value: number | number[]) => {
                handleReferLine({
                  [title]: {
                    ...allProps.referLine[title],
                    textOffset: value,
                  },
                });
              }}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

const textfieldStyle = {
	fullWidth: true,
	defaultValue: "",
	size: "small",
	variant: "standard",
	hiddenLabel: true,
} as TextFieldProps;

const defaultDimLine = {
	offset: 20,
	lineExtension: 5,
	lineExtensionAngle: 5,
	lineColor: 'black',
	lineWeight: 1,
	text: null,
	textColor: 'black',
	textSize: 14,
	textOffset: null,
};
