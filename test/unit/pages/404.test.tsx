import React from 'react';
import { render, screen } from '@testing-library/react';
import Custom404 from '@pages/404';

describe('Custom404', () => {
  test('renders 404 page', () => {
    render(<Custom404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
