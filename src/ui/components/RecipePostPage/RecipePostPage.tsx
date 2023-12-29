import { Box, Flex, Heading, Image, Text, UnorderedList, ListItem } from '@chakra-ui/react';

const renderSections = sections => {
  return sections.map((section, index) => (
    <Box key={index} mt="4" width="100%">
      <Box maxWidth="800px">
        <Heading as="h2" mb="2" color="#555" fontSize={'28px'}>
          {section.title}
        </Heading>
        <Box overflowY={section.isList ? 'auto' : 'unset'}>
          {section.isList ? (
            <UnorderedList>
              {section.content.map((item, itemIndex) => (
                <ListItem color="#555" fontSize={'18px'} key={itemIndex}>
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Text color="#555" fontSize={'18px'}>
              {section.content}
            </Text>
          )}

          {/* Recursive rendering for subsections */}
          {section.subsections && section.subsections.length > 0 && renderSections(section.subsections)}
        </Box>
      </Box>
    </Box>
  ));
};

const RecipePostPage = ({ recipe, sections }) => {
  const { title, image } = recipe;

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center" // Center content vertically
      border="2px solid #ddd"
      borderRadius="md"
      p="6"
    >
      {/* Title section */}
      <Heading as="h1" mb="4" color="#555" fontSize={'40px'}>
        {title}
      </Heading>

      {/* Image section */}
      <Box width="100%" mb="4" maxWidth="400px">
        <Image src={image} alt={title} borderRadius="md" w="100%" />
      </Box>

      {/* Sections section */}
      <Flex flex="1" flexDirection="column" alignItems="center" overflowY="auto">
        {sections && renderSections(sections)}
      </Flex>
    </Box>
  );
};

export default RecipePostPage;
