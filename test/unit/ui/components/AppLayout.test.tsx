import React from 'react';

import { render, screen } from '@testing-library/react';
import AppLayout from '@ui/components/Layout/AppLayout';

const MockChildComponent = () => <div data-testid="child-component">Mock Child Component</div>;

const renderComponent = children => {
  render(<AppLayout>{children}</AppLayout>);
};

describe('AppLayout', () => {
  test('renders header, main content, and footer sections', () => {
    renderComponent(<MockChildComponent />);

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('© 2023 DexTI')).toBeInTheDocument();
  });
});
