import { render, screen } from '@testing-library/react';
import Header from '@ui/components/Header';

const renderComponent = () => {
  render(<Header />);
};

describe('Header', () => {
  it('should render component properly', () => {
    renderComponent();
    expect(screen.getByText(/Suas receitas nutritivas aqui/i)).toBeInTheDocument();
  });
});
