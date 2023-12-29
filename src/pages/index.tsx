// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

import { Box, Grid, GridItem } from '@chakra-ui/react';

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

      <Box>
        <Grid
          templateRows="repeat(auto-fill, minmax(200px, 1fr))" // Ajuste conforme necessário
          gap={4}
          ml="4rem" // Adiciona um espaçamento à esquerda para compensar o GridItem
        >
          {recipes.map(recipe => (
            <GridItem key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
