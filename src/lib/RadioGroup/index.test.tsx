import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders radio group', () => {
  render(<Demo />);
  const linkElement = screen.getAllByText(/test title/i);
  expect(linkElement[0]).toBeInTheDocument();
});
