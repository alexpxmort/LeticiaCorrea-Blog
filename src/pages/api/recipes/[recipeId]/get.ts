import { NextApiRequest, NextApiResponse } from 'next';

import { IRecipeRepository, RecipeRepository } from 'src/domains/recipes/repositories/RecipeRepository';
import { RecipeService } from 'src/domains/recipes/services/RecipeService';

const recipeRepository: IRecipeRepository = new RecipeRepository();
const recipeService = new RecipeService(recipeRepository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { recipeId } = req.query;
    const actualRecipeId = typeof recipeId === 'string' ? recipeId : recipeId[0];

    const recipe = await recipeService.getRecipe(actualRecipeId);
    res.status(200).json(recipe);
  } else {
    res.status(405).end(); // Método não permitido
  }
}
