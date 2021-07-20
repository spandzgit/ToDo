import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ToDo App Header', () => {
  render(<App />);
  const linkElement = screen.getByText(/To Do 's/i);
  expect(linkElement).toBeInTheDocument();
});
