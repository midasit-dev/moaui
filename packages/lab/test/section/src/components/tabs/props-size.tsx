import { Stack, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import * as _ from 'lodash';

const PropsSize = (props: any) => {
	const { allProps, setAllProps, titles } = props;

	const handleSize = _.debounce((value: any) => {
		setAllProps((prev: any) => {
			return {
				...prev,
				...value,
			};
		});
	}, 500);

	return (
    <>
      <Typography variant="h6">📐 Size</Typography>
      <Stack spacing={1}>
				{titles.map((title: string) => {
					return (
						<TextField {...textfieldStyle}
							defaultValue={allProps[title]}
							onChange={(e: any) => handleSize({ [title]: Number(e.target.value) })}
							helperText={`${title}`}
						/>
					)
				})}
      </Stack>
    </>
  );
}

export default PropsSize;

const textfieldStyle = {
	fullWidth: true,
	defaultValue: "",
	size: "small",
	variant: "standard",
	hiddenLabel: true,
} as TextFieldProps;