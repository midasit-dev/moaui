import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const MainColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#0288D1"),
  fontWeight : 'bold',
  backgroundColor: "#0288D1",
  '&:hover': {
    backgroundColor: "#4DABDF",
  },
}));

const SubColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#F3BB2C"),
  fontWeight : 'bold',
  backgroundColor: "#F3BB2C",
  '&:hover': {
    backgroundColor: "#F7CF6B",
  },
}));

export function MainButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <MainColorButton size="small" variant={types} onClick = {clickevent} sx={{width:170,height:40}}>{texts}</MainColorButton>
    </Stack>
  );
};

export function SubButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <SubColorButton size="small" variant={types} onClick = {clickevent} sx={{width:170,height:40}}>{texts}</SubColorButton>
    </Stack>
  );
};

export function NodeButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <MainColorButton size="small" variant={types} onClick = {clickevent} sx={{width:100,height:40}}>{texts}</MainColorButton>
    </Stack>
  );
};
