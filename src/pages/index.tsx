// pages/index.tsx
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { recipeApi } from '@services/RecipeFetchApi';
import RecipeCard from 'src/ui/components/RecipeCard/RecipeCard';
import { Recipe } from 'src/domains/recipes/entities/Recipe'; // Adjust the path based on your project structure

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
  try {
    // Fetch all recipes from your API using recipeApi
    const allRecipes = await recipeApi.getAllRecipes();

    // Combine the original recipes with the fetched ones
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

    const recipes = [...originalRecipes, ...allRecipes];

    return {
      props: {
        recipes,
      },
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {
      notFound: true,
    };
  }
};

export default Home;
