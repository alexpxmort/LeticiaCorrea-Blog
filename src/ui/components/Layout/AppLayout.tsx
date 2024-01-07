// components/AppLayout.js
import Header from '../Header';

const instaLink = 'https://www.instagram.com/cozinhasaudaveldaleticia/';

const MainContent = ({ children }) => (
  <div className="flex-1">
    <div className="container mx-auto pt-8">
      {/* Adjust the grid to a single column on small screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="text-white p-8 bg-gray-200 text-center">
    <div className="container mx-auto ml-2">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row items-center">
          <a href={instaLink} target="_blank" rel="noreferrer">
            <img
              alt="Instagram"
              src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_30,h_30,al_c,q_95,enc_auto/01c3aff52f2a4dffa526d7a9843d46ea.png"
              className="box-content w-5 h-5 object-cover"
            />
          </a>
          <a href="mailto:letcorrea95@outlook.com?subject=Oi Seja Mais Nutritiva" target="_blank" rel="noreferrer">
            <p className="text-green-600 font-bold text-md md:ml-2" style={{ color: '#417162' }}>
              Contato
            </p>
          </a>
        </div>
      </div>
      <p className="text-green-600 font-bold text-lg" style={{ color: '#417162' }}>
        &copy; 2023 DexTI
      </p>
    </div>
  </footer>
);

const AppLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <MainContent>{children}</MainContent>
    <Footer />
  </div>
);

export default AppLayout;
