// src/components/layout/Header.jsx
import React from 'react';
import { Sun, Moon, ArrowLeft } from 'lucide-react';

const Header = ({ activeTab, darkMode, setDarkMode, onBack }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {/* Обновляем логику заголовка, чтобы она учитывала все вкладки */}
        {activeTab === 'concrete' ? 'Калькулятор бетона' :
         activeTab === 'tiles' ? 'Калькулятор плитки' :
         activeTab === 'converter' ? 'Конвертер единиц' :
         activeTab === 'favorites' ? 'Избранное' :
         'Строительный калькулятор'} {/* Заголовок для главной страницы */}
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {activeTab !== 'main' && (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;