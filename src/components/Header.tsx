import React from 'react';
import { Link } from 'react-router-dom';
import { FaSmile } from 'react-icons/fa';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold text-[#00FF00]">
          <FaSmile className="mr-2" />
          YIKES
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-[#00FF00] transition-colors">
            Главная
          </Link>
          <Link to="/blog" className="text-gray-300 hover:text-[#00FF00] transition-colors">
            О нас
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-[#00FF00] transition-colors">
            Отзывы
          </Link>
          <Link to="/cart" className="text-gray-300 hover:text-[#00FF00] transition-colors">
            Тарифы
          </Link>
        </nav>
      </div>
    </header>
  );
};