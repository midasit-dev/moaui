import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders data grid', () => {
  render(<Demo />);
});