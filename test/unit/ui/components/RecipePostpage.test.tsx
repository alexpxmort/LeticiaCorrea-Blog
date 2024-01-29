import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import RecipePostPage from '@ui/components/RecipePostPage/RecipePostPage';

const sampleRecipe = {
  title: 'Test Recipe',
  image: 'test-image.jpg'
};

const subSections = [
  {
    title: 'Section 1',
    content: 'Content of section 1',
    isList: false
  }
];

const sampleSections = [
  {
    title: 'Section 1',
    content: 'Content of section 1',
    subsections: subSections,
    isList: false
  },
  {
    title: 'Section 2',
    content: ['Item 1', 'Item 2'],
    subsections: [],
    isList: true
  }
];

const renderComponent = (recipe, sections) => {
  render(
    <ChakraProvider>
      <RecipePostPage recipe={recipe} sections={sections} />
    </ChakraProvider>
  );
};

describe('RecipePostPage', () => {
  test('renders recipe details correctly', () => {
    renderComponent(sampleRecipe, sampleSections);

    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByAltText('Test Recipe')).toBeInTheDocument();
  });
});
