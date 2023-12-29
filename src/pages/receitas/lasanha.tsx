// pages/recipes/lasanha.js
import RecipePostPage from 'src/ui/components/RecipePostPage/RecipePostPage';

const sections = [
  {
    title: 'Ingredientes',
    content: ['500g de carne moída', '1 pacote de massa de lasanha'],
    isList: true
  },
  {
    title: 'Modo de Preparo:',
    content: ['Cozinhe a carne moída até dourar.', 'Prepare a massa conforme as instruções...'],
    isList: true
  }
];
const Lasanha = () => {
  return (
    <RecipePostPage
      sections={sections}
      recipe={{
        title: 'Lasanha',
        image: '/images/lasanha.jpeg'
      }}
    />
  );
};

export default Lasanha;
