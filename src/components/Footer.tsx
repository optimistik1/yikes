import React from 'react';
import { FaInstagram, FaTelegram, FaWhatsapp, FaSmile } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaSmile className="text-[#00FF00] text-2xl mr-2" />
            <div>
              <h3 className="text-xl font-bold text-[#00FF00]">YIKES</h3>
              <p className="text-gray-400 text-sm">Найди идеального компаньона</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FF00] text-xl transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FF00] text-xl transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FF00] text-xl transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
            <span className="text-gray-500 mx-4 hidden md:inline">|</span>
            <a href="mailto:support@yikes.com" className="text-gray-400 hover:text-[#00FF00] text-sm transition-colors">
              support@yikes.com
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} YIKES. Все права защищены.
        </div>
      </div>
    </footer>
  );
};