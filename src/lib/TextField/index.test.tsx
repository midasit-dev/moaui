import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './demo';

test('renders textfield', () => {
  render(<Demo />);
  const linkElement = screen.getAllByText(/TextField Demo/i);
  expect(linkElement[0]).toBeInTheDocument();
});