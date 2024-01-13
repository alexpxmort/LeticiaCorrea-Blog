
/* eslint-disable max-len */
// pages/recipes/bolo-de-chocolate.js
import React, { useEffect, useState } from 'react';
import RecipePostPage from 'src/ui/components/RecipePostPage/RecipePostPage';
import { recipeApi } from '@services/RecipeFetchApi';
import { useRouter } from 'next/router';

const Page = () => {

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
