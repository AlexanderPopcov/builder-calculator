import React, { useState, useEffect } from 'react';
import { HelpCircle, Sun, Moon, ArrowLeft, Heart } from 'lucide-react';
import UnitConverter from './UnitConverter';
import useFavorites from './useFavorites';
import FavoritesScreen from './FavoritesScreen';

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'concrete' ? 'Калькулятор бетона' : 'Калькулятор плитки'}
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
                onClick={() => setActiveTab('main')}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
          </div>
        </div>

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

const CalculatorCard = ({ title, description, onClick, icon, darkMode, badge }) => (
  <button
    onClick={onClick}
    className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-blue-500 text-white' 
        : 'bg-white border-gray-200 hover:border-blue-300 text-gray-900'
    } shadow-lg hover:shadow-xl relative`}
  >
    {badge && (
      <div className={`absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full ${
        darkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {badge}
      </div>
    )}
    <div className="text-4xl mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {description}
    </p>
  </button>
);

const ConcreteCalculator = ({ darkMode, onBack, addToFavorites }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [lengthUnit, setLengthUnit] = useState('m');
  const [widthUnit, setWidthUnit] = useState('m');
  const [heightUnit, setHeightUnit] = useState('m');
  const [showHelp, setShowHelp] = useState(false);

  const convertToMeters = (value, unit) => {
    if (!value) return 0;
    const numValue = parseFloat(value);
    return unit === 'm' ? numValue : numValue / 100;
  };

  const lengthM = convertToMeters(length, lengthUnit);
  const widthM = convertToMeters(width, widthUnit);
  const heightM = convertToMeters(height, heightUnit);
  
  const volume = lengthM * widthM * heightM;
  const weight = volume * 2400;

  const HelpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div 
        className={`w-full max-w-md rounded-t-3xl p-6 transform transition-transform ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Пропорции бетона М200</h3>
          <button
            onClick={() => setShowHelp(false)}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <p className="text-lg font-medium">4 ведра щебенки, 2 ведра песка, 2 ведра цемента</p>
          </div>
          
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            На 1 замес в стандартной бетономешалке
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🪨</div>
              <div className="text-sm font-medium">Щебень</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏖️</div>
              <div className="text-sm font-medium">Песок</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🧱</div>
              <div className="text-sm font-medium">Цемент</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold">Расчет бетона</h2>
        <button
          onClick={() => setShowHelp(true)}
          className={`p-2 rounded-full ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors`}
        >
          <HelpCircle size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Length Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Длина</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Единицы измерения</label>
            <select
              value={lengthUnit}
              onChange={(e) => setLengthUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="m">метры</option>
              <option value="cm">сантиметры</option>
            </select>
          </div>
        </div>

        {/* Width Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ширина</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Единицы измерения</label>
            <select
              value={widthUnit}
              onChange={(e) => setWidthUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="m">метры</option>
              <option value="cm">сантиметры</option>
            </select>
          </div>
        </div>

        {/* Height Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Высота</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Единицы измерения</label>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="m">метры</option>
              <option value="cm">сантиметры</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {(volume > 0 || weight > 0) && (
          <div className={`mt-6 p-4 rounded-2xl ${
            darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Объем</div>
                <div className="text-2xl font-bold">{volume.toFixed(3)} м³</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Вес бетона</div>
                <div className="text-2xl font-bold">{weight.toFixed(1)} кг</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showHelp && <HelpModal />}
    </div>
  );
};

const TilesCalculator = ({ darkMode, onBack, addToFavorites }) => {
  const [surfaceType, setSurfaceType] = useState('floor');
  const [surfaceLength, setSurfaceLength] = useState('');
  const [surfaceWidth, setSurfaceWidth] = useState('');
  const [surfaceLengthUnit, setSurfaceLengthUnit] = useState('m');
  const [surfaceWidthUnit, setSurfaceWidthUnit] = useState('m');
  const [packageArea, setPackageArea] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [wastePercentage, setWastePercentage] = useState('10');

  const convertToMeters = (value, unit) => {
    if (!value) return 0;
    const numValue = parseFloat(value);
    return unit === 'm' ? numValue : numValue / 100;
  };

  const surfaceLengthM = convertToMeters(surfaceLength, surfaceLengthUnit);
  const surfaceWidthM = convertToMeters(surfaceWidth, surfaceWidthUnit);
  const surfaceArea = surfaceLengthM * surfaceWidthM;
  const packageAreaNum = parseFloat(packageArea) || 0;
  const wastePercent = parseFloat(wastePercentage) || 0;
  const totalAreaWithWaste = surfaceArea * (1 + wastePercent / 100);
  
  const packagesNeeded = packageAreaNum > 0 ? Math.ceil(totalAreaWithWaste / packageAreaNum) : 0;
  const remainingArea = packageAreaNum > 0 ? (packagesNeeded * packageAreaNum - totalAreaWithWaste) : 0;

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-xl font-bold mb-6">Расчет плитки</h2>

      {/* Surface Type Toggle */}
      <div className="flex bg-gray-200 dark:bg-gray-700 rounded-xl p-1 mb-6">
        <button
          onClick={() => setSurfaceType('floor')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            surfaceType === 'floor'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          Пол
        </button>
        <button
          onClick={() => setSurfaceType('wall')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            surfaceType === 'wall'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          Стена
        </button>
      </div>

      {/* Surface Dimensions */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {surfaceType === 'floor' 
                ? 'Длина пола' 
                : 'Высота стены'}
            </label>
            <input
              type="number"
              value={surfaceLength}
              onChange={(e) => setSurfaceLength(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Единицы измерения</label>
            <select
              value={surfaceLengthUnit}
              onChange={(e) => setSurfaceLengthUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="m">метры</option>
              <option value="cm">сантиметры</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {surfaceType === 'floor' 
                ? 'Ширина пола' 
                : 'Ширина стены'}
            </label>
            <input
              type="number"
              value={surfaceWidth}
              onChange={(e) => setSurfaceWidth(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Единицы измерения</label>
            <select
              value={surfaceWidthUnit}
              onChange={(e) => setSurfaceWidthUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="m">метры</option>
              <option value="cm">сантиметры</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Площадь покрытия одной пачки (м²)
        </label>
        <input
          type="number"
          value={packageArea}
          onChange={(e) => setPackageArea(e.target.value)}
          className={`w-full p-3 rounded-xl border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder="0"
          min="0"
          step="0.01"
        />
      </div>

      {/* Advanced Options */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`w-full text-left p-3 rounded-xl border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-blue-400' 
              : 'bg-gray-100 border-gray-200 text-blue-600'
          } font-medium`}
        >
          {showAdvanced ? 'Скрыть дополнительные параметры' : 'Дополнительные параметры'}
        </button>
        
        {showAdvanced && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Длина плитки (см)</label>
                <input
                  type="number"
                  value={tileLength}
                  onChange={(e) => setTileLength(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ширина плитки (см)</label>
                <input
                  type="number"
                  value={tileWidth}
                  onChange={(e) => setTileWidth(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Запас на подрезку ({wastePercentage}%)
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={wastePercentage}
                onChange={(e) => setWastePercentage(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {(surfaceArea > 0 && packageAreaNum > 0) && (
        <div className={`p-4 rounded-2xl ${
          darkMode ? 'bg-green-900/30' : 'bg-green-50'
        }`}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Площадь поверхности:</span>
              <span>{surfaceArea.toFixed(2)} м²</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">С учетом запаса ({wastePercent}%):</span>
              <span>{totalAreaWithWaste.toFixed(2)} м²</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Необходимо пачек:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{packagesNeeded}</span>
            </div>
            {remainingArea > 0 && (
              <div className="flex justify-between">
                <span className="font-medium">Остаток материала:</span>
                <span>{remainingArea.toFixed(2)} м²</span>
              </div>
            )}
            {/* КНОПКА СОХРАНЕНИЯ (вставьте СРАЗУ ПОСЛЕ results и ПЕРЕД закрывающим </div>) */}
      {(surfaceArea > 0 && packageAreaNum > 0) && (
        <button
          onClick={() => {
            addToFavorites({
              type: 'tiles',
              surfaceType,
              surfaceLength,
              surfaceWidth,
              surfaceLengthUnit,
              surfaceWidthUnit,
              packageArea,
              packagesNeeded,
              remainingArea: remainingArea,
              wastePercentage: wastePercent
            });
            alert('✅ Расчет сохранен в избранное!');
          }}
          className={`mt-6 w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center ${
            darkMode 
              ? 'bg-amber-600 hover:bg-amber-700' 
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          } transition-all shadow-lg hover:shadow-xl`}
        >
          <Heart size={24} className="mr-2" />
          Сохранить расчет
        </button>
      )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
