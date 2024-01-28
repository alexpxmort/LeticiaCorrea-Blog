import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@ui/components/Spinner';

const renderComponent = () => {
  render(<LoadingSpinner />);
};

describe('LoadingSpinner', () => {
  it('should render component properly', () => {
    renderComponent();
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
});
