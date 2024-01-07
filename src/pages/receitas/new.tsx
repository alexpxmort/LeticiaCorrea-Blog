import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { recipeApi } from '@services/RecipeFetchApi';
import * as yup from 'yup';

import { Recipe } from 'src/domains/recipes/entities/Recipe';
import LoadingSpinner from '@ui/components/Spinner';
import { Link } from '@chakra-ui/react';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória')
});

const NewRecipePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Recipe>({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null);

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

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-96">
        <h3 className="text-2xl font-bold mb-4">Cadastre aqui sua Receita</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
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
