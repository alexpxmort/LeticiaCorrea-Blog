// pages/index.tsx
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

export default Home;
