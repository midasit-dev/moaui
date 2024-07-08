import * as React from 'react';
import MoaStack from '@midasit-dev/moaui/Components/Stack';
import MoaTypography from '@midasit-dev/moaui/Components/Typography';

export default function StyledTypo(title) {
  return (
    <MoaStack marginX={1} marginY={.5}>
      <MoaTypography variant="h1">{title}</MoaTypography>
    </MoaStack>
  );
}