import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders table cell', () => {
  render(<Demo />);
  const element = screen.getAllByText(/TableCellDemo/i);
  expect(element[0]).toBeInTheDocument();
});