// Import necessary dependencies and the RecipeRepository
import { RecipeRepository } from '@domains/recipes/repositories/RecipeRepository';
import { db, bucket } from '@infra/firebase';

// Mock firebase and bucket
jest.mock('@infra/firebase', () => ({
  db: {
    collection: jest.fn()
  },
  bucket: {
    file: jest.fn()
  }
}));

const mockCollection = jest.fn();
const mockDoc = jest.fn();
const mockGet = jest.fn();

const mockFile = {
  createWriteStream: jest.fn(),
  getSignedUrl: jest.fn()
};

(bucket.file as jest.Mock).mockReturnValueOnce(mockFile);
(db.collection as jest.Mock).mockImplementation(mockCollection);
describe('RecipeRepository', () => {
  let recipeRepository: RecipeRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    recipeRepository = new RecipeRepository();
  });

  describe('getRecipe', () => {
    it('should get a recipe by ID', async () => {
      const mockRecipeId = '123';
      const mockSnapshot = {
        exists: true,
        id: mockRecipeId,
        data: jest.fn(() => ({ name: 'Mock Recipe' }))
      };

      mockCollection.mockReturnValueOnce({
        add: jest.fn().mockResolvedValueOnce({ id: 'mock-document-id' }),
        doc: mockDoc.mockReturnValueOnce({
          get: mockGet.mockResolvedValueOnce(mockSnapshot)
        })
      });

      const result = await recipeRepository.getRecipe(mockRecipeId);

      expect(result).toEqual({ id: mockRecipeId, name: 'Mock Recipe' });
      expect(mockCollection).toHaveBeenCalledWith('recipes');
    });

    it('should return null if the recipe with the given ID does not exist', async () => {
      const mockRecipeId = '123';
      const mockSnapshot = {
        exists: false
      };

      mockCollection.mockReturnValueOnce({
        add: jest.fn().mockResolvedValueOnce({ id: 'mock-document-id' }),
        doc: mockDoc.mockReturnValueOnce({
          get: mockGet.mockResolvedValueOnce(mockSnapshot)
        })
      });
      const result = await recipeRepository.getRecipe(mockRecipeId);

      expect(result).toBeNull();
    });
  });

  describe('getAllRecipes', () => {
    it('should get all recipes', async () => {
      const mockSnapshot = {
        exists: true,
        docs: [
          { id: '1', data: jest.fn(() => ({ name: 'Mock Recipe' })) },
          { id: '2', data: jest.fn(() => ({ name: 'Mock Recipe 2' })) }
        ]
      };

      mockCollection.mockReturnValueOnce({
        add: jest.fn().mockResolvedValueOnce({ id: 'mock-document-id' }),
        get: mockGet.mockResolvedValueOnce(mockSnapshot)
      });

      const result = await recipeRepository.getAllRecipes();

      expect(result.length).toBe(2);
      expect(mockCollection).toHaveBeenCalledWith('recipes');
    });
  });

  describe('deleteRecipe', () => {
    it('should delete recipe by id', async () => {
      mockCollection.mockReturnValueOnce({
        add: jest.fn().mockResolvedValueOnce({ id: 'mock-document-id' }),
        doc: mockDoc.mockReturnValueOnce({
          delete: jest.fn().mockResolvedValueOnce(undefined)
        })
      });
      await recipeRepository.deleteRecipe('id');

      expect(mockCollection).toHaveBeenCalledWith('recipes');
    });
  });

  describe('updateRecipe', () => {
    it('should update recipe by id', async () => {
      mockCollection.mockReturnValueOnce({
        add: jest.fn().mockResolvedValueOnce({ id: 'mock-document-id' }),
        doc: mockDoc.mockReturnValueOnce({
          update: jest.fn().mockResolvedValueOnce(undefined)
        })
      });
      await recipeRepository.updateRecipe('id', { name: 'test' });

      expect(mockCollection).toHaveBeenCalledWith('recipes');
    });
  });

  describe('createRecipe', () => {
    it('should create a new recipe', async () => {
      const mockData = {
        name: 'Mock Recipe',
        image: {
          name: 'mock-image.jpg',
          type: 'image/jpeg',
          buffer: Buffer.from('fake-image-content')
        }
      };

      const mockUrl = 'https://mock-url.com';

      mockFile.createWriteStream.mockImplementation(() => {
        const stream = {
          end: jest.fn(),
          on: jest.fn()
        };
        stream.on.mockImplementation((event, callback) => {
          if (event === 'finish') {
            callback();
          }
        });
        return stream;
      });

      (mockFile.getSignedUrl as jest.Mock).mockResolvedValueOnce([mockUrl]);
      mockCollection.mockReturnValueOnce({
        add: jest.fn().mockResolvedValueOnce({ id: 'mock-document-id' })
      });

      const result = await recipeRepository.createRecipe(mockData as any);
      console.log(result);
      expect(result).toEqual('mock-document-id');
    });
  });
});
