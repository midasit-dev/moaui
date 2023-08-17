import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders table body', () => {
  render(<Demo />);
  const bodyElement = screen.getAllByText(/body/i);
  expect(bodyElement[0]).toBeInTheDocument();
});