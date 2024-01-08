/* eslint-disable max-len */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { recipeApi } from '@services/RecipeFetchApi';
import LoadingSpinner from '@ui/components/Spinner';
import * as yup from 'yup';

import { Recipe } from 'src/domains/recipes/entities/Recipe';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  image: yup
    .mixed()
    .required('A imagem é obrigatória')
    .test('fileFormat', 'Formato de arquivo inválido', (value: any) => {
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
});

const NewRecipePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<Recipe>({
    resolver: yupResolver<yup.AnyObject>(schema)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit = async (data: Recipe) => {
    setLoading(true);
    // Aqui você pode enviar os dados do formulário para o backend

    try {
      await recipeApi.createRecipe(data);
      setLoading(false);
      setMessage({ type: 'success', content: 'Receita cadastrada com sucesso!' });
      reset();
      setTimeout(() => {
        setMessage(null);
      }, 1800);
    } catch (err: any) {
      setLoading(false);
      setMessage({ type: 'error', content: err.message });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file.name);
      setValue('image', file);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-96">
        <h3 className="text-2xl font-bold mb-4">Cadastre aqui sua Receita</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="uploadFile1"
            className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2.5 outline-none rounded w-max cursor-pointer mx-auto block font-[sans-serif]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 fill-white inline" viewBox="0 0 32 32">
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload
            <input type="file" id="uploadFile1" className="hidden" onChange={handleImageChange} />
          </label>
          {selectedImage && <p className="text-gray-500 mt-1">{selectedImage}</p>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Nome
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`mt-1 p-2 w-full border rounded-md ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-600">
              Descrição
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className={`mt-1 p-2 w-full border rounded-md ${errors.description ? 'border-red-500' : ''}`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {message && <div className={`${message.type}-message mb-4`}>{message.content}</div>}
          <div className="flex items-center justify-between">
            <button disabled={loading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Salvar
            </button>

            <Link href={'/'} className="text-blue-500">
              Ver Receitas
            </Link>
          </div>
        </form>
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default NewRecipePage;
