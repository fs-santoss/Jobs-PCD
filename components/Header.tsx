import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { MenuIcon } from './icons/MenuIcon';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-background-secondary shadow-md sticky top-0 z-30">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-primary">JobsPCD</a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#jobs" className="text-text-main hover:text-primary transition-colors">Buscar Vagas</a>
          <a href="#candidates" className="text-text-main hover:text-primary transition-colors">Para Candidatos</a>
          <a href="#companies" className="text-text-main hover:text-primary transition-colors">Para Empresas</a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <button className="text-primary hover:text-text-main font-semibold py-2 px-4 rounded-lg transition-colors">
            Login
          </button>
          <button className="bg-primary text-text-interactive font-semibold py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity">
            Cadastrar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-main hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded-md p-1"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Abrir menu principal</span>
            {isMobileMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-background-secondary shadow-md`} id="mobile-menu">
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <a href="#jobs" onClick={handleLinkClick} className="text-text-main hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Buscar Vagas</a>
          <a href="#candidates" onClick={handleLinkClick} className="text-text-main hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Para Candidatos</a>
          <a href="#companies" onClick={handleLinkClick} className="text-text-main hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Para Empresas</a>
          <div className="border-t border-gray-300 my-3"></div>
          <div className="flex items-center px-2 gap-2">
             <button className="flex-1 text-primary border border-primary hover:bg-primary/10 font-semibold py-2 px-4 rounded-lg transition-colors w-full">
                Login
              </button>
              <button className="flex-1 bg-primary text-text-interactive font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity w-full">
                Cadastrar
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};
