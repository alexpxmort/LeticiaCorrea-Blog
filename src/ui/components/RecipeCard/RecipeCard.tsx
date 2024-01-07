// components/RecipeCard.js
const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <a href={`/receitas/${id}`} className="hover:no-underline">
      <div className="w-full border-1 border-gray-300 rounded-lg overflow-hidden shadow-md mb-8 mx-auto">
        <img src={image} alt={title} className="object-cover w-full h-48 md:h-64 lg:h-64 xl:h-64" />
        <div className="p-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default RecipeCard;
