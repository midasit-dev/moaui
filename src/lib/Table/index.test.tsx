import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders table', () => {
  render(<Demo />);
  const headElement = screen.getAllByText(/head/i);
  headElement.forEach((element) => {
	expect(element).toBeInTheDocument();
 });
  const bodyElement = screen.getAllByText(/body/i);
  bodyElement.forEach((element) => {
	expect(element).toBeInTheDocument();
  });
});