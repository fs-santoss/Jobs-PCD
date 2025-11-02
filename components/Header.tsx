
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-background-secondary shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-primary">JobsPCD</a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#jobs" className="text-text-main hover:text-primary transition-colors">Buscar Vagas</a>
          <a href="#candidates" className="text-text-main hover:text-primary transition-colors">Para Candidatos</a>
          <a href="#companies" className="text-text-main hover:text-primary transition-colors">Para Empresas</a>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-primary hover:text-text-main font-semibold py-2 px-4 rounded-lg transition-colors">
            Login
          </button>
          <button className="bg-primary text-text-interactive font-semibold py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-opacity">
            Cadastrar
          </button>
        </div>
      </nav>
    </header>
  );
};
