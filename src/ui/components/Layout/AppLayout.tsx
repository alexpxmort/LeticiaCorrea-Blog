import { Box, Container, Flex, Grid, Image, Text, Link, Heading } from '@chakra-ui/react';

const instaLink = 'https://www.instagram.com/letiiiciacorrea/';
const AppLayout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header" color="white" p={4} textAlign="center" bg="#EDEDED">
        {/* Conteúdo do Cabeçalho */}
        <Container maxWidth="container.md">
          <Link href={'/'}>
            <Image alt="Logomarca Blog" src="/images/logo.jpg" maxW="200px" mx="auto" borderRadius={'50px'} />
          </Link>
          <Heading pt="2" color="#000" fontWeight={'bold'}>
            Letícia Correa Receitas
          </Heading>
        </Container>
        <Box display={'flex'} gap={6} justifyContent="center" mt={4} alignItems={'center'}>
          <Text color="#417162" fontWeight={'bold'} fontSize={'md'}>
            Suas receitas nutritivas aqui
          </Text>

          <Link href={instaLink} target="_blank">
            <Image
              alt="Instagram"
              src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_30,h_30,al_c,q_95,enc_auto/01c3aff52f2a4dffa526d7a9843d46ea.png"
              boxSize="20px"
              objectFit="cover"
            />
          </Link>
        </Box>
      </Box>
      <Box flex="1">
        <Container maxWidth="container.xl" pt={8}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {children}
          </Grid>
        </Container>
      </Box>
      <Box as="footer" color="white" p={8} bg="#EDEDED" textAlign="center">
        <Container maxWidth="container.xl" ml="2rem">
          <Flex direction={'row'} justifyContent={'flex-start'}>
            <Flex direction={'column'}>
              <Link href={instaLink} target="_blank">
                <Image
                  alt="Instagram"
                  src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_30,h_30,al_c,q_95,enc_auto/01c3aff52f2a4dffa526d7a9843d46ea.png"
                  boxSize="30px"
                  objectFit="cover"
                />
              </Link>
              <Link href="mailto:letcorrea95@outlook.com?subject=Oi Seja Mais Nutritiva" target="_blank">
                <Text color="#417162" fontWeight={'bold'} fontSize={'md'}>
                  Contato
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Text color="#417162" fontWeight={'bolder'}>
            {' '}
            &copy; 2023 DexTI
          </Text>
        </Container>
      </Box>
    </Flex>
  );
};

export default AppLayout;
