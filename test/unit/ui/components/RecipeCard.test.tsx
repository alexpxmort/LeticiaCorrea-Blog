import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeCard from '@ui/components/RecipeCard/RecipeCard';

const sampleRecipe = {
  id: '1',
  name: 'Test Recipe',
  image: 'test-image.jpg',
  description: 'This is a test recipe',
  sections: []
};

const renderComponent = recipe => {
  render(<RecipeCard recipe={recipe} />);
};

describe('RecipeCard', () => {
  test('renders recipe details correctly', () => {
    renderComponent(sampleRecipe);

    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByAltText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('This is a test recipe')).toBeInTheDocument();
    expect(screen.getByText('Completar cadastro')).toBeInTheDocument();
  });
});
