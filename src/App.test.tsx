import { act, render, screen, waitFor } from '@testing-library/react';

import App from './App';
import userEvent from '@testing-library/user-event';

describe('App test', () => {
  test('disables input when stopwatch starts', async () => {
    render(<App />);
    const innerInput =
      screen.getByTestId('input-minutes').children[1].firstChild;
    expect(innerInput).not.toHaveAttribute('disabled');

    const startButton = screen.getByTestId('start-button');
    await act(async () => {
      await userEvent.click(startButton);
    });

    await waitFor(() => {
      expect(innerInput).toHaveAttribute('disabled');
      const startButtonClicked = screen.queryByTestId('start-button');
      expect(startButtonClicked).toBeNull();
    });

    screen.debug();
  });
});