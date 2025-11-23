// src/pages/ConcreteCalculator.jsx
import React, { useState } from 'react';
import { HelpCircle, Heart } from 'lucide-react';

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
          <div> {/* Новый внешний div, который обертывает всё содержимое условия */}
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

              {/* КНОПКА СОХРАНЕНИЯ - ОСТАЕТСЯ ЗДЕСЬ, ВНУТРИ ВНЕШНЕГО DIV */}
              <button
                onClick={() => {
                  addToFavorites({
                    type: 'concrete',
                    length,
                    width,
                    height,
                    lengthUnit,
                    widthUnit,
                    heightUnit,
                    volume: volume.toFixed(3),
                    weight: weight.toFixed(1)
                  });
                  alert('✅ Расчет бетона сохранен в избранное!');
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
            </div>
          </div> // <-- Закрывающий div для нового внешнего контейнера
        )}
      </div>

      {showHelp && <HelpModal />}
    </div>
  );
};

export default ConcreteCalculator;