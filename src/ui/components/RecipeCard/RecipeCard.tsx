// components/RecipeCard.js
import { Card, CardHeader, CardBody, Stack, Box, Heading, Text, StackDivider, Image } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  const { id, title, image, description } = recipe;

  return (
    <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" mb={8} mx="auto">
      <CardHeader>
        <Image src={image} alt={title} objectFit="cover" boxSize="full" />
        
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
       <Heading size='md' pt='2'>
          {title}
        </Heading>
          <Box>
            <Text fontSize='sm'>
              {description}
            </Text>
          </Box>
          {/* Add more Box components as needed */}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
