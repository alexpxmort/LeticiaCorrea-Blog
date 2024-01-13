
/* eslint-disable max-len */
// pages/recipes/bolo-de-chocolate.js
import RecipePostPage from 'src/ui/components/RecipePostPage/RecipePostPage';


const Page = () => {
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
