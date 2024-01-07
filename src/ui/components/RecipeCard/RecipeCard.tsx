// components/RecipeCard.js
import { Card, CardHeader, CardBody, Stack, Box, Heading, Text, StackDivider, Image, Link } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <Link href={`/receitas/${id}`} _hover={{ textDecoration: 'none' }}>
      <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" mb={8} mx="auto">
        <CardHeader>
          <Image src={image} alt={title} objectFit="cover" boxSize="full" />
          <Heading size='md' pt='2'>
            {title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Text fontSize='sm'>
                {description}
              </Text>
            </Box>
            {/* Add more Box components as needed */}
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default RecipeCard;
