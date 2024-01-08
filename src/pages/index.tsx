// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { recipeApi } from '@services/RecipeFetchApi';
import RecipeCard from 'src/ui/components/RecipeCard/RecipeCard';
import { Recipe } from 'src/domains/recipes/entities/Recipe'; // Adjust the path based on your project structure

interface HomeProps {
  originalRecipes: Recipe[];
}

const Home: React.FC<HomeProps> = ({ originalRecipes }) => {
  const [additionalRecipes, setAdditionalRecipes] = useState<Recipe[]>([]);

  const fetchAdditionalRecipes = async () => {
    try {
      // Fetch additional recipes from your API using recipeApi
      const fetchedRecipes = await recipeApi.getAllRecipes();
      setAdditionalRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error fetching additional recipes:', error);
      // Handle error if necessary
    }
  };

  useEffect(() => {
    // On initial load, you might want to fetch additional recipes immediately
    fetchAdditionalRecipes();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const combinedRecipes = [...originalRecipes, ...additionalRecipes];

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
          {combinedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      <button onClick={fetchAdditionalRecipes}>Reload Recipes</button>
    </>
  );
};

Home.defaultProps = {
  originalRecipes: [
    // Initial recipes here
    {
      id: 'bolo-chocolate',
      name: 'Bolo de Chocolate',
      image: '/images/bolo-de-chocolate.jpeg',
      description: 'Delicioso bolo de chocolate para satisfazer seus desejos.',
    },
    {
      id: 'lasanha',
      name: 'Lasanha',
      image: '/images/lasanha.jpeg',
      description: 'Deliciosa lasanha',
    },
  ],
};

export default Home;
