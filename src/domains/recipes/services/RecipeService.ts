// src/domains/Recipes/services/RecipeService.ts
import { Recipe } from '../entities/Recipe';
import { IRecipeRepository } from '../repositories/RecipeRepository';

export class RecipeService {
  private recipeRepository: IRecipeRepository;

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.getAllRecipes();
  }

  async createRecipe(data: Recipe): Promise<string> {
    return this.recipeRepository.createRecipe(data);
  }

  async updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
    return this.recipeRepository.updateRecipe(id, data);
  }

  async deleteRecipe(id: string): Promise<void> {
    return this.recipeRepository.deleteRecipe(id);
  }
}
