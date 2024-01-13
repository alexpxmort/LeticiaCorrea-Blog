// NewRecipePage.tsx
import React, { useEffect, useState } from 'react';
import Accordion from '@ui/components/Accordion';
import { Recipe } from 'src/domains/recipes/entities/Recipe';
import { useRouter } from 'next/router';
import { recipeApi } from '@services/RecipeFetchApi';
import LoadingSpinner from '@ui/components/Spinner';

const NewRecipePage = () => {
  const [sections, setSections] = useState<any[]>([]);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(true);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null);

  const addSection = () => {
    setSections(prevSections => [
      ...prevSections,
      {
        title: '',
        content: '',
        hasSubsections: false,
        subsections: [],
        listItems: []
      }
    ]);
  };

  const getRecipe = async (id:string | string[] ) => {
    const result = await recipeApi.getRecipe(id);
    setRecipe(result);
    setLoadingGet(false);
  };
  useEffect(() => {
    if (router?.query?.id) {
      getRecipe(router?.query?.id);
    }
  }, [router.query]);

  const addSubsection = sectionIndex => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].subsections.push({
        title: '',
        content: '',
        isList: false,
        listItems: []
      });
      return newSections;
    });
  };

  const onSubmit = async () => {

    if (recipe) {
    const { id = '', ...rest } = recipe;
    // Rest of your code
       const updatedData = {
      ...rest,
      sections: sections.map(section => ({
        title: section.title,
        ...(section.hasSubsections && {
          subsections: section.subsections.map(subsection => ({
            title: subsection.title,
            content: subsection.isList ? subsection.listItems : subsection.content
          }))
        }),
        ...(!section.hasSubsections && { content: section.content })
      }))
    };

    setLoading(true);

    try {
      await recipeApi.updateRecipe(id ?? '', updatedData);
      setLoading(false);
      setMessage({ type: 'success', content: 'Receita atualizada com sucesso!' });
      setTimeout(() => {
        setMessage(null);
      }, 1800);
    } catch (err:any) {
      setLoading(false);
      console.log(err);
      setMessage({ type: 'error', content: err.message });
    }
    }
    

   
  };

  const handleInputChange = (sectionIndex, field, value) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex][field] = value;

      return newSections;
    });
  };

  

  const handleSubsectionInputChange = (sectionIndex, subSectionIndex, field, value) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].subsections[subSectionIndex][field] = value;

      return newSections;
    });
  };

  const addSubsectionListItem = (sectionIndex, subSectionIndex) => {
    setSections(prevSections => {
      const newSections = [...prevSections];

      const value = (document.getElementById(`item-${sectionIndex}-${subSectionIndex}`) as HTMLInputElement)?.value;


      if (value) {
        newSections[sectionIndex].subsections[subSectionIndex].listItems.push(value);
      }

      return newSections;
    });
  };

  if (loadingGet) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-96">
        <button onClick={addSection} type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Criar Nova Seção
        </button>
        <form>
          {sections.map((section, sectionIndex) => (
            <Accordion key={sectionIndex} title={`Seção ${sectionIndex + 1}`}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                  Título
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={e => handleInputChange(sectionIndex, 'title', e.target.value)}
                  className={`mt-1 p-2 w-full border rounded-md`}
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`hasSubsections-${sectionIndex}`} className="block text-sm font-medium text-gray-600">
                  Possui Subseções?
                </label>
                <select
                  id={`hasSubsections-${sectionIndex}`}
                  value={section.hasSubsections}
                  onChange={e => handleInputChange(sectionIndex, 'hasSubsections', e.target.value === 'true')}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value={"true"}>Sim</option>
                  <option value={"false"}>Não</option>
                </select>
              </div>

              {!section.isList && !section.hasSubsections && (
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-600">
                    Conteúdo
                  </label>
                  <textarea
                    value={section.content}
                    onChange={e => handleInputChange(sectionIndex, 'content', e.target.value)}
                    rows={4}
                    className={`mt-1 p-2 w-full border rounded-md`}
                  ></textarea>
                </div>
              )}
              {section.hasSubsections && (
                <div>
                  <button
                    type="button"
                    onClick={() => addSubsection(sectionIndex)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Adicionar Subseção
                  </button>
                  {section.subsections.map((subsection, subSectionIndex) => (
                    <Accordion key={subSectionIndex} title={`Subseção ${subSectionIndex + 1}`}>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                          Título
                        </label>
                        <input
                          type="text"
                          value={subsection.title}
                          onChange={e =>
                            handleSubsectionInputChange(sectionIndex, subSectionIndex, 'title', e.target.value)
                          }
                          className={`mt-1 p-2 w-full border rounded-md`}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor={`isList-${sectionIndex}-${subSectionIndex}`}
                          className="block text-sm font-medium text-gray-600"
                        >
                          É uma lista?
                        </label>
                        <select
                          id={`isList-${sectionIndex}-${subSectionIndex}`}
                          value={subsection.isList}
                          onChange={e =>
                            handleSubsectionInputChange(
                              sectionIndex,
                              subSectionIndex,
                              'isList',
                              e.target.value === 'true'
                            )
                          }
                          className="mt-1 p-2 w-full border rounded-md"
                        >
                          <option value={"true"}>Sim</option>
                          <option value={"false"}>Não</option>
                        </select>
                      </div>

                      {!subsection.isList && (
                        <div className="mb-4">
                          <label htmlFor="content" className="block text-sm font-medium text-gray-600">
                            Conteúdo
                          </label>
                          <textarea
                            value={subsection.content}
                            onChange={e =>
                              handleSubsectionInputChange(sectionIndex, subSectionIndex, 'content', e.target.value)
                            }
                            rows={4}
                            className={`mt-1 p-2 w-full border rounded-md`}
                          ></textarea>
                        </div>
                      )}
                      {subsection.isList && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Itens da Lista</label>
                          <input
                            type="text"
                            id={`item-${sectionIndex}-${subSectionIndex}`}
                            className="p-2 border rounded-md mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => addSubsectionListItem(sectionIndex, subSectionIndex)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md"
                          >
                            +
                          </button>
                          <ul>
                            {subsection.listItems.map((item, listItemIndex) => (
                              <li key={listItemIndex} className="mb-2">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Accordion>
                  ))}
                </div>
              )}
            </Accordion>
          ))}
        </form>
      </div>
      <button
        disabled={loading}
        onClick={onSubmit}
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Salvar
      </button>
      {message && <div className={`${message.type}-message mb-4`}>{message.content}</div>}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default NewRecipePage;
