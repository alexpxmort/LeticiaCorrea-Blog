import { Link } from '@chakra-ui/react';

const instaLink = 'https://www.instagram.com/cozinhasaudaveldaleticia/';

const Header = () => (
  <header className="text-white p-4 text-center bg-gray-200">
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          {/* Seu conteúdo esquerdo do header */}
          <Link href={'/'}>
            <img alt="Logomarca Blog" src="/images/logo-v2.png" className="max-w-200 mx-auto rounded-full" />
          </Link>
          <h2 className="pt-2 text-black font-bold text-2xl">Letícia Correa Receitas</h2>
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Seu conteúdo direito do header */}
          <p
            className="font-bold text-md text-center md:text-lg md:text-left mt-4 md:mt-0 md:mr-6"
            style={{ color: '#417162' }}
          >
            Suas receitas nutritivas aqui
          </p>

          <Link href={instaLink} target="_blank">
            <img
              alt="Instagram"
              src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_30,h_30,al_c,q_95,enc_auto/01c3aff52f2a4dffa526d7a9843d46ea.png"
              className="object-cover w-30 h-30 mt-4 md:mt-0"
            />
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
