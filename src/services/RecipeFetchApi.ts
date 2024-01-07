import { Recipe } from 'src/domains/recipes/entities/Recipe';

class RecipeFetchApi {
  private baseUrl = '/api/recipe';

  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(`${this.baseUrl}`);
    if (!response.ok) {
      throw new Error('Erro ao obter os Recipes da API');
    }

    return response.json();
  }

  async createRecipe(recipeData: Recipe): Promise<string> {
    const response = await fetch(`${this.baseUrl}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(recipeData)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar um novo Recipe via API');
    }

    const result = await response.json();
    return result.id;
  }

  async updateRecipe(recipeId: string, recipeData: Partial<Recipe>): Promise<void> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: recipeId, data: recipeData })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar um Recipe via API');
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: recipeId })
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir um Recipe via API');
    }
  }
}

export const recipeApi = new RecipeFetchApi();
