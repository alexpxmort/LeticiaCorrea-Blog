// src/domains/Recipes/services/RecipeService.test.ts
import { IRecipeRepository } from '@domains/recipes/repositories/RecipeRepository';
import { RecipeService } from '@domains/recipes/services/RecipeService';

// Mock of the repository
const mockRecipeRepository: jest.Mocked<IRecipeRepository> = {
  getAllRecipes: jest.fn(),
  getRecipe: jest.fn(),
  createRecipe: jest.fn(),
  updateRecipe: jest.fn(),
  deleteRecipe: jest.fn()
};

describe('RecipeService', () => {
  let recipeService: RecipeService;

  beforeEach(() => {
    jest.clearAllMocks();

    recipeService = new RecipeService(mockRecipeRepository);
  });

  describe('getAllRecipes', () => {
    it('should call getAllRecipes from the repository', async () => {
      await recipeService.getAllRecipes();
      expect(mockRecipeRepository.getAllRecipes).toHaveBeenCalled();
    });
  });

  describe('getRecipe', () => {
    it('should call getRecipe from the repository', async () => {
      const recipeId = '123';
      await recipeService.getRecipe(recipeId);
      expect(mockRecipeRepository.getRecipe).toHaveBeenCalledWith(recipeId);
    });
  });

  describe('createRecipe', () => {
    it('should call createRecipe from the repository', async () => {
      const recipeData = { name: 'Test Recipe', description: 'Description' };
      await recipeService.createRecipe(recipeData);
      expect(mockRecipeRepository.createRecipe).toHaveBeenCalledWith(recipeData);
    });
  });

  describe('updateRecipe', () => {
    it('should call updateRecipe from the repository', async () => {
      const recipeId = '123';
      const recipeData = { name: 'Updated Recipe' };
      await recipeService.updateRecipe(recipeId, recipeData);
      expect(mockRecipeRepository.updateRecipe).toHaveBeenCalledWith(recipeId, recipeData);
    });
  });

  describe('deleteRecipe', () => {
    it('should call deleteRecipe from the repository', async () => {
      const recipeId = '123';
      await recipeService.deleteRecipe(recipeId);
      expect(mockRecipeRepository.deleteRecipe).toHaveBeenCalledWith(recipeId);
    });
  });
});
