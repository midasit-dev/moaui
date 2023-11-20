import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders tab', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
