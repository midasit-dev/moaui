import * as React from 'react';
import Stack from "@midasit-dev/moaui/Components/Stack";
import Button from "@midasit-dev/moaui/Components/Button";
export function MainButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <Button size="small" variant={types} onClick={clickevent} color="negative">{texts}</Button>
    </Stack>
  );
};
export function NormalButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <Button size="small" variant={types} onClick={clickevent} color="normal">{texts}</Button>
    </Stack>
  );
};


export function SubButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <Button size="small" variant={types} onClick={clickevent}>{texts}</Button>
    </Stack>
  );
};

export function NodeButton(types, texts, clickevent) {
  return (
    <Stack spacing={2} direction="row">
      <Button size="small" variant={types} onClick={clickevent}>{texts}</Button>
    </Stack>
  );
};
