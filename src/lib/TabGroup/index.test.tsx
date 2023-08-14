import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders tab group', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/Item!/i);
  expect(linkElement).toBeInTheDocument();
});
