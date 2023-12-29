/* eslint-disable max-len */
// pages/recipes/bolo-de-chocolate.js
import RecipePostPage from 'src/ui/components/RecipePostPage/RecipePostPage';

const sections = [
  {
    title: 'Ingredientes',
    content: [],
    isList: false,
    subsections: [
      {
        title: 'Massa',
        content: [
          '3 ovos',
          '1 e meia xícara de chá de açúcar',
          'Meia xícara de chá de óleo',
          '1 xícara de chá de chocolate em pó',
          '2 xícaras de chá de farinha de trigo',
          '1 xícara de chá de água quente',
          '1 colher de sopa de fermento em pó'
        ],
        isList: true
      }
    ]
  },
  {
    title: 'Modo de Preparo',
    content: [''],
    isList: false,
    subsections: [
      {
        title: 'Massa',
        content: [
          'Em uma tigela, coloque 3 ovos, 1 e meia xícara de chá de açúcar, meia xícara de chá de óleo, 1 xícara de chá de chocolate em pó e 2 xícaras de chá de farinha de trigo. Misture delicadamente os ingredientes.'
        ],
        isList: true
      }
    ]
  }
];

const BoloDeChocolate = () => {
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

export default BoloDeChocolate;
