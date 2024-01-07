// components/RecipeCard.js
import { Box, Heading, Text, Link, VStack, Image } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <Link href={`/receitas/${id}`} _hover={{ textDecoration: 'none' }}>
      <Box
        width="100%" // Set width to 100% for full width
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        mb={8}
        mx="auto"
      >
        <Image src={image} alt={title} objectFit="cover" boxSize="full" />
        <VStack p={4} align="start">
          <Heading as="h2" size="md">
            {title}
          </Heading>
          <Text fontSize="sm">{description}</Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default RecipeCard;
