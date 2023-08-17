import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders table head', () => {
  render(<Demo />);
});