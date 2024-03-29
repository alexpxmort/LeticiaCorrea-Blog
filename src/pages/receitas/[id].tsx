/* eslint-disable max-len */
// pages/recipes/bolo-de-chocolate.js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { recipeApi } from '@services/RecipeFetchApi';
import LoadingSpinner from '@ui/components/Spinner';

import { Recipe } from 'src/domains/recipes/entities/Recipe';
import RecipePostPage from 'src/ui/components/RecipePostPage/RecipePostPage';

const Page = () => {
  const [loadingGet, setLoadingGet] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  const getRecipe = async (id: string | string[]) => {
    const result = await recipeApi.getRecipe(id);
    setRecipe(result);
    setLoadingGet(false);
  };
  useEffect(() => {
    if (router?.query?.id) {
      getRecipe(router?.query?.id);
    }
  }, [router.query]);

  if (loadingGet) {
    return <LoadingSpinner />;
  }

  return (
    <RecipePostPage
      sections={recipe?.sections ?? []}
      recipe={{
        title: recipe?.name,
        image: recipe?.image
      }}
    />
  );
};

export default Page;
