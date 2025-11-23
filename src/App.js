import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import UnitConverter from './pages/UnitConverter'; // Путь к файлу в папке pages
import TilesCalculator from './pages/TilesCalculator';
import ConcreteCalculator from './pages/ConcreteCalculator';
import useFavorites from './hooks/useFavorites'; // Путь к файлу в папке hooks
import FavoritesScreen from './pages/FavoritesScreen'; // Путь к файлу в папке pages
// В начале файла App.js, после других импортов
import CalculatorCard from './components/CalculatorCard';

const App = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [darkMode, setDarkMode] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  // ... (ваш код useState, useEffect и т.д.)

  const renderActiveTab = () => {
  switch (activeTab) {
    case 'concrete':
      return <ConcreteCalculator darkMode={darkMode} onBack={() => setActiveTab('main')} addToFavorites={addToFavorites} />;
    case 'tiles':
      return <TilesCalculator darkMode={darkMode} onBack={() => setActiveTab('main')} addToFavorites={addToFavorites} />;
    case 'converter':
      return <UnitConverter darkMode={darkMode} onBack={() => setActiveTab('main')} addToFavorites={addToFavorites} />;
    case 'favorites':
      return <FavoritesScreen darkMode={darkMode} onBack={() => setActiveTab('main')} favorites={favorites} removeFromFavorite={removeFromFavorites} />;
    default: // Для 'main' или любых других значений, показываем главный экран
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CalculatorCard
            title="Калькулятор бетона"
            description="Рассчитайте объем и вес бетона для вашей конструкции"
            onClick={() => setActiveTab('concrete')}
            icon="🏗️"
            darkMode={darkMode}
          />
          <CalculatorCard
            title="Калькулятор плитки"
            description="Определите количество плитки для пола или стены"
            onClick={() => setActiveTab('tiles')}
            icon="🪵"
            darkMode={darkMode}
          />
          <CalculatorCard
            title="Конвертер единиц"
            description="Мгновенно переводите метры в сантиметры, литры в м³ и многое другое"
            onClick={() => setActiveTab('converter')}
            icon="↔️"
            darkMode={darkMode}
          />
          <CalculatorCard
            title="Избранное"
            description={`Сохраненные расчеты (${favorites.length})`}
            onClick={() => setActiveTab('favorites')}
            icon="❤️"
            darkMode={darkMode}
            badge={favorites.length > 0 ? favorites.length : null}
          />
        </div>
      );
  }
};

return (
  <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Header
        activeTab={activeTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onBack={() => setActiveTab('main')}
      />
      {renderActiveTab()}
    </div>
  </div>
);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Main Navigation */}
{activeTab === 'main' ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <CalculatorCard
      title="Калькулятор бетона"
      description="Рассчитайте объем и вес бетона для вашей конструкции"
      onClick={() => setActiveTab('concrete')}
      icon="🏗️"
      darkMode={darkMode}
    />
    <CalculatorCard
      title="Калькулятор плитки"
      description="Определите количество плитки для пола или стены"
      onClick={() => setActiveTab('tiles')}
      icon="🪵"
      darkMode={darkMode}
    />
    <CalculatorCard
      title="Конвертер единиц"
      description="Мгновенно переводите метры в сантиметры, литры в м³ и многое другое"
      onClick={() => setActiveTab('converter')}
      icon="↔️"
      darkMode={darkMode}
    />
    {/* НОВАЯ КАРТОЧКА ДЛЯ ИЗБРАННОГО */}
    <CalculatorCard
      title="Избранное"
      description={`Сохраненные расчеты (${favorites.length})`}
      onClick={() => setActiveTab('favorites')}
      icon="❤️"
      darkMode={darkMode}
      badge={favorites.length > 0 ? favorites.length : null}
    />
  </div>
) : activeTab === 'concrete' ? (
  <ConcreteCalculator 
    darkMode={darkMode} 
    onBack={() => setActiveTab('main')} 
    addToFavorites={addToFavorites} 
  />
) : activeTab === 'tiles' ? (
  <TilesCalculator 
    darkMode={darkMode} 
    onBack={() => setActiveTab('main')} 
    addToFavorites={addToFavorites} 
  />
) : activeTab === 'converter' ? (
  <UnitConverter 
    darkMode={darkMode} 
    onBack={() => setActiveTab('main')} 
    addToFavorites={addToFavorites} 
  />
) : activeTab === 'favorites' ? (
  <FavoritesScreen 
    darkMode={darkMode} 
    onBack={() => setActiveTab('main')} 
    favorites={favorites}
    removeFromFavorite={removeFromFavorites}
  />
) : null}
      </div>
    </div>
  );
};




export default App;
