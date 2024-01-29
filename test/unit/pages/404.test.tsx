import React from 'react';

import Custom404 from '@pages/404';
import { render, screen } from '@testing-library/react';

describe('Custom404', () => {
  test('renders 404 page', () => {
    render(<Custom404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
