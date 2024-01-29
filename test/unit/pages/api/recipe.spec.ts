// handler.test.ts
import handler from '@pages/api/recipe';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('formidable');

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  apps: [],
  firestore: jest.fn(),
  storage: jest.fn().mockReturnValue({
    bucket: jest.fn()
  }),
  credential: {
    cert: jest.fn()
  }
  // Outros métodos que você precisa mockar, se houver
}));

jest.mock('@domains/recipes/services/RecipeService', () => ({
  ...jest.requireActual('@domains/recipes/services/RecipeService'),
  RecipeService: jest.fn(() => ({
    getAllRecipes: jest.fn().mockResolvedValue([{ id: '1', name: 'Recipe 1' }]),
    createRecipe: jest.fn(),
    updateRecipe: jest.fn(),
    deleteRecipe: jest.fn()
  }))
}));

describe('API handler', () => {
  let mockReq: NextApiRequest;
  let mockRes: NextApiResponse;

  beforeEach(() => {
    mockReq = { method: 'GET' } as NextApiRequest;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    } as any;
  });

  it('GET /api/recipes should return all recipes', async () => {
    mockReq.method = 'GET';

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([{ id: '1', name: 'Recipe 1' }]);
  });
});
