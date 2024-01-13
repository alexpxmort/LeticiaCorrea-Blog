import { NextApiRequest, NextApiResponse } from 'next';

import formidable from 'formidable';
import fs from 'fs';

import { IRecipeRepository, RecipeRepository } from 'src/domains/recipes/repositories/RecipeRepository';
import { RecipeService } from 'src/domains/recipes/services/RecipeService';

const recipeRepository: IRecipeRepository = new RecipeRepository();
const recipeService = new RecipeService(recipeRepository);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await recipeService.getAllRecipes();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const imageFile = files['image']?.[0];

    // Obtém o caminho do arquivo temporário
    const filePath = imageFile.filepath;

    // Lê o conteúdo do arquivo
    const imageBuffer = fs.readFileSync(filePath);

    const newRecipeId = await recipeService.createRecipe({
      name: fields?.['name']?.[0],
      description: fields?.['description']?.[0],
      linkName: fields?.['linkName']?.[0],
      image: {
        buffer: imageBuffer,
        name: imageFile.originalFilename,
        type: imageFile.mimetype
      }
    });
    return res.status(201).json({
      id: newRecipeId
    });
  } else if (req.method === 'PUT') {
    

      const form = formidable({});
    const [fields] = await form.parse(req);

    const id= fields?.['id']?.[0]
    const data = fields?.['data']?.[0]

      
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
