import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders textfieldV2', () => {
  render(<Demo />);
  const linkElement = screen.getAllByText(/TextField V2 Demo/i);
  expect(linkElement[0]).toBeInTheDocument();
});