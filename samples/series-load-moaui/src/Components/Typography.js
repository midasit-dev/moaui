import * as React from 'react';
import MoaStack from '@midasit-dev/moaui/Stack';
import MoaTypography from '@midasit-dev/moaui/Typography';

export default function StyledTypo(title) {
  return (
    <MoaStack marginX={1} marginY={.5}>
      <MoaTypography variant="h1">{title}</MoaTypography>
    </MoaStack>
  );
}