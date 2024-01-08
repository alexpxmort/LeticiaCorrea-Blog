// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { recipeApi } from '@services/RecipeFetchApi';
import RecipeCard from 'src/ui/components/RecipeCard/RecipeCard';
import { Recipe } from 'src/domains/recipes/entities/Recipe'; // Adjust the path based on your project structure

interface HomeProps {
  recipes: Recipe[];
}

const Home: React.FC<HomeProps> = ({ recipes }) => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch additional recipes from your API using recipeApi
        const additionalRecipes = await recipeApi.getAllRecipes();
        setAllRecipes(additionalRecipes);
      } catch (error) {
        console.error('Error fetching additional recipes:', error);
        // Handle error if necessary
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const combinedRecipes = [...recipes, ...allRecipes];

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
    </>
  );
};

Home.defaultProps = {
  recipes: [
    // Initial recipes here
  ],
};

export default Home;
