// handler.test.ts
import { NextApiRequest, NextApiResponse } from 'next';

import handler from '@pages/api/recipe';

jest.mock('fs');
jest.mock('formidable', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parse: jest.fn((req, callback) => {
      return Promise.resolve([
        { id: ['123'], data: ['{"name":"test"}'], name: ['test'], description: ['test'], linkName: ['link test'] },
        { image: [{ filepath: 'temp-path', originalFilename: 'image.jpg', mimetype: 'image/jpeg' }] }
      ]);
    })
  }))
}));

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
    createRecipe: jest.fn().mockResolvedValueOnce(123),
    updateRecipe: jest.fn().mockResolvedValueOnce(123),
    deleteRecipe: jest.fn().mockResolvedValueOnce(1234)
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

  it('should handle POST requests', async () => {
    mockReq.method = 'POST';

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 123 });
  });

  it('should handle DELETE requests', async () => {
    mockReq.method = 'DELETE';
    mockReq.body = { id: 1234 };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('should handle PUT requests', async () => {
    mockReq.method = 'PUT';

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('should handle 405 not allowed WHEN method is not allowed', async () => {
    mockReq.method = 'PATCH';

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(405);
  });
});
