import { bucket, db } from '../../../infrastructure/firebase';
import { Recipe } from '../entities/Recipe';
export interface IRecipeRepository {
  getAllRecipes(): Promise<Recipe[]>;
  getRecipe(recipeId: string): Promise<Recipe | null>;
  createRecipe(data: Recipe): Promise<string>;
  updateRecipe(id: string, data: Partial<Recipe>): Promise<void>;
  deleteRecipe(id: string): Promise<void>;
}

export class RecipeRepository implements IRecipeRepository {
  async getRecipe(recipeId: string): Promise<Recipe | null> {
    const snapshot = await db.collection(this.collectionName).doc(recipeId).get();

    if (snapshot.exists) {
      const data = snapshot.data() as Recipe;
      return { id: snapshot.id, ...data };
    } else {
      // Se o documento com o ID fornecido não existir
      return null;
    }
  }
  private collectionName = 'recipes';
  async getAllRecipes(): Promise<Recipe[]> {
    const snapshot = await db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Recipe) }));
  }

  async createRecipe(data: Recipe): Promise<any> {
    const destination = `images/${data.image?.name}`; // Nome da imagem baseado no título (ajuste conforme necessário)
    try {
      const file = bucket.file(destination);
      const stream = file.createWriteStream({
        metadata: {
          contentType: data.image?.type
        }
      });

      stream.end(data?.image?.buffer);

      // Aguarda o término do upload
      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      // Obter a URL da imagem no Firebase Storage
      const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });

      const updatedData = { ...data, image: url };

      const docRef = await db.collection(this.collectionName).add(updatedData);
      return docRef.id;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
    await db.collection(this.collectionName).doc(id).update(data);
  }

  async deleteRecipe(id: string): Promise<void> {
    await db.collection(this.collectionName).doc(id).delete();
  }
}
