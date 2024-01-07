import type { NextPage } from 'next';
import Head from 'next/head';

import RecipeCard from 'src/ui/components/RecipeCard/RecipeCard';

const recipes: any[] = [
  {
    id: 'bolo-chocolate',
    title: 'Bolo de Chocolate',
    image: '/images/bolo-de-chocolate.jpeg',
    description: 'Delicioso bolo de chocolate para satisfazer seus desejos.'
  },
  {
    id: 'lasanha',
    title: 'Lasanha',
    image: '/images/lasanha.jpeg',
    description: 'Deliciosa lasanha'
  }
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Leticia Correa</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 space-y-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default Home;
