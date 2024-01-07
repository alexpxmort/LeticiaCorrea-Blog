import { db } from '../../../infrastructure/firebase';
import { Recipe } from '../entities/Recipe';
export interface IRecipeRepository {
  getAllRecipes(): Promise<Recipe[]>;
  createRecipe(data: Recipe): Promise<string>;
  updateRecipe(id: string, data: Partial<Recipe>): Promise<void>;
  deleteRecipe(id: string): Promise<void>;
}

export class RecipeRepository implements IRecipeRepository {
  private collectionName = 'recipes';
  async getAllRecipes(): Promise<Recipe[]> {
    const snapshot = await db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Recipe) }));
  }

  async createRecipe(data: Recipe): Promise<string> {
    const docRef = await db.collection(this.collectionName).add(data);
    return docRef.id;
  }

  async updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
    await db.collection(this.collectionName).doc(id).update(data);
  }

  async deleteRecipe(id: string): Promise<void> {
    await db.collection(this.collectionName).doc(id).delete();
  }
}
