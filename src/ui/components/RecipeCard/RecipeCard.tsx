// components/RecipeCard.js
const RecipeCard = ({ recipe }) => {
  const { id, name, image, description, sections = [] } = recipe;

  return (
    <a
      data-testid={`${name?.trim()?.toLowerCase()}`}
      href={`/receitas/${id}`}
      className="w-full max-w-screen-sm hover:no-underline"
    >
      <div className=" border-1 border-gray-300 rounded-lg overflow-hidden shadow-md mb-8 mx-auto">
        <img src={image} alt={name} className="object-cover w-full h-48 md:h-64 lg:h-64 xl:h-64" />
        <div className="p-4">
          <h2 className="text-lg font-medium" style={{ color: '#555' }}>
            {name}
          </h2>
          <p className="text-sm" style={{ color: '#333' }}>
            {description}
          </p>
        </div>

        {!sections || (sections?.length <= 0 && <a href={`/receitas/${id}/sections/new`}>Completar cadastro</a>)}
      </div>
    </a>
  );
};

export default RecipeCard;
