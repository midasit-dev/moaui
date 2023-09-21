import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders typography group', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/test title/i);
  expect(linkElement).toBeInTheDocument();
});
