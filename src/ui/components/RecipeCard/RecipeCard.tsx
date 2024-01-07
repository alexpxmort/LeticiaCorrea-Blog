// components/RecipeCard.js
import { Card, CardHeader, CardBody, CardFooter, Image, Text, Link, Stack, Heading } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <Link href={`/receitas/${id}`} _hover={{ textDecoration: 'none' }}>
      <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" mb={8} mx="auto">
        <Image src={image} alt={title} objectFit="cover" boxSize="full" />
        <Stack p={4}>
          <Heading as="h2" size="md" color={'#555'} mb={2}>
            {title}
          </Heading>
          <Text fontSize="md" color={'#333'}>
            {description}
          </Text>
        </Stack>
      </Card>
    </Link>
  );
};

export default RecipeCard;
