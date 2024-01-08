// pages/index.tsx
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { recipeApi } from '@services/RecipeFetchApi';
import RecipeCard from 'src/ui/components/RecipeCard/RecipeCard';

interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface HomeProps {
  recipes: Recipe[];
}

const Home: NextPage<HomeProps> = ({ recipes }) => {
  return (
    <>
      <Head>
        <title>Leticia Correa</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Set padding on the body element for mobile spacing */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // Fetch additional recipes from your API using recipeApi
  const additionalRecipes = await recipeApi.getRecipes();

  // Combine the original recipes with the additional ones
  const originalRecipes: Recipe[] = [
    {
      id: 'bolo-chocolate',
      title: 'Bolo de Chocolate',
      image: '/images/bolo-de-chocolate.jpeg',
      description: 'Delicioso bolo de chocolate para satisfazer seus desejos.',
    },
    {
      id: 'lasanha',
      title: 'Lasanha',
      image: '/images/lasanha.jpeg',
      description: 'Deliciosa lasanha',
    },
  ];

  const recipes = [...originalRecipes, ...additionalRecipes];

  return {
    props: {
      recipes,
    },
  };
};

export default Home;
