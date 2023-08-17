import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders switch', () => {
  render(<Demo />);
  const linkElement = screen.getAllByText(/test/i);
  expect(linkElement[0]).toBeInTheDocument();
});