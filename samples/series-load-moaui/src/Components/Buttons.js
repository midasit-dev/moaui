import * as React from 'react';
import MoaButton from '@midasit-dev/moaui/Button';

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