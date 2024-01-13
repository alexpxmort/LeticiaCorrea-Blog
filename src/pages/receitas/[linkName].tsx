
/* eslint-disable max-len */
// pages/recipes/bolo-de-chocolate.js
import React, { useEffect, useState } from 'react';
import { Recipe } from 'src/domains/recipes/entities/Recipe';
import RecipePostPage from 'src/ui/components/RecipePostPage/RecipePostPage';
import { recipeApi } from '@services/RecipeFetchApi';
import { useRouter } from 'next/router';

const Page = () => {

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  
  return (
    <RecipePostPage
      sections={sections}
      recipe={{
        title: 'Bolo de Chocolate',
        image: '/images/bolo-de-chocolate.jpeg'
      }}
    />
  );
};

export default Page;
