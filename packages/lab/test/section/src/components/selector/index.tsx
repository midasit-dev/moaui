import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Selector(props: any) {
	const { selectIdx, setSelectIdx } = props;
  const handleSelector = (event: SelectChangeEvent) => setSelectIdx(event.target.value);

  return (
    <FormControl sx={{ m: 1, minWidth: 250, background: 'white' }} size="small">
      <InputLabel>Select a Section</InputLabel>
      <Select
        value={selectIdx}
        label="Select a Section"
        onChange={handleSelector}
      >
        <MenuItem value={1}>Solid Rectangle</MenuItem>
        <MenuItem value={2}>H Section</MenuItem>
      </Select>
    </FormControl>
  );
}