import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders checkbox group', () => {
  render(<Demo />);
  const linkElement = screen.getAllByText(/test title/i);
  expect(linkElement[0]).toBeInTheDocument();
});
