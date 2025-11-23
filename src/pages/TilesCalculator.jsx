import React, { useState } from 'react';
import { Heart } from 'lucide-react';

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
export default TilesCalculator;