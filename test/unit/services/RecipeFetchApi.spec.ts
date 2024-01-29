// RecipeFetchApi.test.js
import { recipeApi } from '@services/RecipeFetchApi';

describe('RecipeFetchApi', () => {
  describe('getAllRecipes', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should fetch all recipes successfully', async () => {
      const recipes = [{ id: '1', name: 'Recipe 1' }];
      global.fetch.mockResolvedValueOnce({ ok: true, json: () => recipes });

      const result = await recipeApi.getAllRecipes();

      expect(result).toEqual(recipes);
    });

    it('should handle errors when fetching all recipes', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(recipeApi.getAllRecipes()).rejects.toThrow('Erro ao obter os Recipes da API');
    });
  });

  describe('getRecipe', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should fetch a single recipe successfully', async () => {
      const recipeId = '1';
      const recipe = { id: recipeId, name: 'Recipe 1' };
      global.fetch.mockResolvedValueOnce({ ok: true, json: () => recipe });

      const result = await recipeApi.getRecipe(recipeId);

      expect(result).toEqual(recipe);
    });

    it('should handle errors when fetching a single recipe', async () => {
      const recipeId = '1';
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(recipeApi.getRecipe(recipeId)).rejects.toThrow('Erro ao obter os Recipe da API');
    });
  });

  describe('createRecipe', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should create a new recipe successfully', async () => {
      const recipeData = { name: 'New Recipe' };
      const response = { id: '1' };
      global.fetch.mockResolvedValueOnce({ ok: true, json: () => response });

      const result = await recipeApi.createRecipe(recipeData);

      expect(result).toEqual(response.id);
    });

    it('should handle errors when creating a new recipe', async () => {
      const recipeData = { name: 'New Recipe' };
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(recipeApi.createRecipe(recipeData)).rejects.toThrow('Erro ao criar um novo Recipe via API');
    });
  });

  describe('updateRecipe', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should update a recipe successfully', async () => {
      const recipeId = '1';
      const recipeData = { name: 'Updated Recipe' };
      global.fetch.mockResolvedValueOnce({ ok: true });

      await expect(recipeApi.updateRecipe(recipeId, recipeData)).resolves.toBeUndefined();
    });

    it('should handle errors when updating a recipe', async () => {
      const recipeId = '1';
      const recipeData = { name: 'Updated Recipe' };
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(recipeApi.updateRecipe(recipeId, recipeData)).rejects.toThrow('Erro ao atualizar um Recipe via API');
    });
  });

  describe('deleteRecipe', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should delete a recipe successfully', async () => {
      const recipeId = '1';
      global.fetch.mockResolvedValueOnce({ ok: true });

      await expect(recipeApi.deleteRecipe(recipeId)).resolves.toBeUndefined();
    });

    it('should handle errors when deleting a recipe', async () => {
      const recipeId = '1';
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(recipeApi.deleteRecipe(recipeId)).rejects.toThrow('Erro ao excluir um Recipe via API');
    });
  });
});
