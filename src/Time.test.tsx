import { render, screen } from '@testing-library/react';

import React from 'react';
import { Time } from './Time';

describe('TEST APP Time', () => {
  test('renders learn react link', () => {
    render(<Time hours={0} minutes={0} seconds={0}/>);
    const helloWorldElem = screen.getByText(/0/i);
    expect(helloWorldElem).toBeInTheDocument();
  });
});