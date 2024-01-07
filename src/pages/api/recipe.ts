import { NextApiRequest, NextApiResponse } from 'next';

import { Recipe } from 'src/domains/recipes/entities/Recipe';
import { IRecipeRepository, RecipeRepository } from 'src/domains/recipes/repositories/RecipeRepository';
import { RecipeService } from 'src/domains/recipes/services/RecipeService';

const recipeRepository: IRecipeRepository = new RecipeRepository();
const recipeService = new RecipeService(recipeRepository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await recipeService.getAllRecipes();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const postData: Recipe = req.body;
    const recipeId = await recipeService.createRecipe(postData);
    res.status(201).json({ id: recipeId });
  } else if (req.method === 'PUT') {
    const { id, data } = req.body;
    await recipeService.updateRecipe(id, data);
    res.status(200).end();
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await recipeService.deleteRecipe(id);
    res.status(200).end();
  } else {
    res.status(405).end(); // Método não permitido
  }
}
