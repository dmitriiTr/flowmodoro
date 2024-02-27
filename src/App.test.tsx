import { render, screen } from '@testing-library/react';

import App from './App';

describe('TEST APP', () => {
  test('renders learn react link', () => {
    render(<App />);
    const helloWorldElem = screen.getByText(/start/i);
    expect(helloWorldElem).toBeInTheDocument();
  });
});