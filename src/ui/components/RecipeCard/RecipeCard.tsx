// components/RecipeCard.js
import { Box, Image, Heading, Text, Link } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <Link href={`/receitas/${id}`}>
      <Box
        display="flex"
        flexDirection="row" // Mudança para row
        justifyContent="center"
        alignItems="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mb={8} // Ajuste o valor conforme necessário para aumentar o espaço vertical
        boxShadow="md"
        textAlign="center"
        width="100%"
        w="800px" // Ajuste a largura máxima conforme necessário
        mx="auto" // Centraliza o card horizontalmente
      >
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          boxSize="200px" // Ajuste o tamanho da imagem conforme necessário
          mr={'48px'} // Adiciona um espaçamento à direita da imagem
        />
        <Box display={'flex'} flex={1} flexDirection={'column'} alignItems={'flex-start'} gap={3}>
          <Heading as="h3" size="md" color={'#555'}>
            {title}
          </Heading>
          <Text color={'#333'}>{description}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default RecipeCard;
