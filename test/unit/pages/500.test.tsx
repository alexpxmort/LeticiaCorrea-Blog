import React from 'react';

import Custom500 from '@pages/500';
import { render, screen } from '@testing-library/react';

describe('Custom500', () => {
  test('renders 500 page', () => {
    render(<Custom500 />);

    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
