// components/RecipeCard.js
import { Box, Heading, Text, Stack, Image, Link } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <Link href={`/receitas/${id}`} _hover={{ textDecoration: 'none' }}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" mb={8} mx="auto">
        <Image src={image} alt={title} objectFit="cover" boxSize="full" />
        <Box p={4}>
          <Heading as="h2" size="md" pt='2'>
            {title}
          </Heading>
          <Text fontSize='sm'>
            {description}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default RecipeCard;
