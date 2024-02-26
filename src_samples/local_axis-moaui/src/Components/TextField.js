import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment';

//Base Text Style
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle2,
  backgroundColor: theme.palette.background.paper,
  marginTop: "3px",
  padding: theme.spacing(0),
}));

//Text Field Style
function StyledTextField(props) {
  const {defaultValue, units, value, onChange, disabled} = props;

  return(
    <TextField
      disabled={disabled}
      hiddenLabel
      defaultValue={defaultValue}
      variant="standard"
      type="number"
      size="small"
      value={value}
      onChange={e=>onChange(e.target.value)}
      //type="number"
      InputProps={{
        sx: {
          fontSize: "14px",
          width:90,
          "& input":{
            textAlign:"right",
          },
            '& input[type=number]::-webkit-inner-spin-button': {
            //'-webkit-appearance': 'none',
            opacity: 1,
            margin: 0,
            marginLeft:"5px",
          },
        },
        endAdornment: 
          <InputAdornment position="end">
            <Div>{units}</Div>
          </InputAdornment>,
        inputProps:{
          step:0.01
        }
      }}
    />
  )
}

StyledTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default function TextFieldInput(title=NaN, values, SetValue, Display) {
  return (
    <Box sx={{margin:1.0}}>
      <Stack direction="row" component="form" spacing={2} justifyContent="space-between">
          <Div>{title}</Div>
        <StyledTextField units="" value={values} onChange={SetValue} disabled={Display}/>
      </Stack>
    </Box>
  );
}