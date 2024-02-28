import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import userEvent from '@testing-library/user-event';

describe('App test', () => {
  test('disables input when stopwatch starts', async () => {
    render(<App />);
    const startButton = screen.getByTestId('start-button');
    userEvent.click(startButton);
    expect(startButton).toBeInTheDocument();

    await waitFor(() => {
      const innerInput =
        screen.getByTestId('input-minutes').children[1].firstChild;
      expect(innerInput).toHaveAttribute('disabled');
    });
  });
});