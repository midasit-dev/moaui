import * as React from 'react';
import MoaButton from '@midasit-dev/moaui/Components/Button';

export function NormalButton(types, texts, clickevent) {
  return (
    <React.Fragment>
      <MoaButton size="small" variant={types} onClick={clickevent}>{texts}</MoaButton>
    </React.Fragment>
  );
};

export function WideButton(types, texts, clickevent) {
  return (
    <React.Fragment>
      <MoaButton size="small" variant={types} onClick={clickevent}>{texts}</MoaButton>
    </React.Fragment>
  );
};

export function WideButtonColor(color, types, texts, clickevent) {
  return (
    <React.Fragment>
      <MoaButton color={color} size="small" variant={types} onClick={clickevent}>{texts}</MoaButton>
    </React.Fragment>
  );
};

export function WideButtonSubColor(types, texts, clickevent) {
  return (
    <React.Fragment>
      <MoaButton variant={types} onClick={clickevent}>{texts}</MoaButton>
    </React.Fragment>
  );
};

export function ElemButton(types, texts, clickevent) {
  return (
    <React.Fragment>
      <MoaButton size="small" variant={types} onClick={clickevent}>{texts}</MoaButton>
    </React.Fragment>
  );
};