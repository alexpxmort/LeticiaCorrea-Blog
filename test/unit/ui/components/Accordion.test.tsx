import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Accordion from '@ui/components/Accordion';

const renderComponent = () => {
  render(
    <Accordion title="Test Accordion">
      <div>Accordion Content</div>
    </Accordion>
  );
};

describe('Accordion', () => {
  test('Accordion component toggles open and close correctly', () => {
    renderComponent();
    expect(screen.queryByText('Accordion Content')).toBeNull();

    fireEvent.click(screen.getByText('Test Accordion'));

    expect(screen.getByText('Accordion Content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Accordion'));

    expect(screen.queryByText('Accordion Content')).toBeNull();
  });
});
