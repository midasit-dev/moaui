import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders panel', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/h1 테스트!/i);
  expect(linkElement).toBeInTheDocument();
});
