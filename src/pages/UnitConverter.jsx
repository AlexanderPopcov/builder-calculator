import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Heart } from 'lucide-react';

const UnitConverter = ({ darkMode, onBack, addToFavorites }) => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');
  const [result, setResult] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const convert = () => {
    if (!value || isNaN(value)) {
      setResult('Введите число');
      return;
    }

    const numValue = parseFloat(value);
    let convertedValue = 0;

    // Конвертация длины
    if (['m', 'cm', 'mm', 'inch', 'ft'].includes(fromUnit) && 
        ['m', 'cm', 'mm', 'inch', 'ft'].includes(toUnit)) {
      
      // Сначала конвертируем всё в метры
      let inMeters = 0;
      switch(fromUnit) {
        case 'm': inMeters = numValue; break;
        case 'cm': inMeters = numValue / 100; break;
        case 'mm': inMeters = numValue / 1000; break;
        case 'inch': inMeters = numValue * 0.0254; break;
        case 'ft': inMeters = numValue * 0.3048; break;
        default: inMeters = numValue;
      }

      // Затем конвертируем из метров в нужную единицу
      switch(toUnit) {
        case 'm': convertedValue = inMeters; break;
        case 'cm': convertedValue = inMeters * 100; break;
        case 'mm': convertedValue = inMeters * 1000; break;
        case 'inch': convertedValue = inMeters / 0.0254; break;
        case 'ft': convertedValue = inMeters / 0.3048; break;
        default: convertedValue = inMeters;
      }
    }
    
    // Конвертация объема
    else if (['m3', 'l', 'cm3'].includes(fromUnit) && 
             ['m3', 'l', 'cm3'].includes(toUnit)) {
      
      let inCubicMeters = 0;
      switch(fromUnit) {
        case 'm3': inCubicMeters = numValue; break;
        case 'l': inCubicMeters = numValue / 1000; break;
        case 'cm3': inCubicMeters = numValue / 1000000; break;
        default: inCubicMeters = numValue;
      }

      switch(toUnit) {
        case 'm3': convertedValue = inCubicMeters; break;
        case 'l': convertedValue = inCubicMeters * 1000; break;
        case 'cm3': convertedValue = inCubicMeters * 1000000; break;
        default: convertedValue = inCubicMeters;
      }
    }
    
    // Конвертация веса
    else if (['kg', 't', 'g'].includes(fromUnit) && 
             ['kg', 't', 'g'].includes(toUnit)) {
      
      let inKg = 0;
      switch(fromUnit) {
        case 'kg': inKg = numValue; break;
        case 't': inKg = numValue * 1000; break;
        case 'g': inKg = numValue / 1000; break;
        default: inKg = numValue;
      }

      switch(toUnit) {
        case 'kg': convertedValue = inKg; break;
        case 't': convertedValue = inKg / 1000; break;
        case 'g': convertedValue = inKg * 1000; break;
        default: convertedValue = inKg;
      }
    }
    
    else {
      setResult('Выберите совместимые единицы');
      return;
    }

    setResult(convertedValue.toFixed(4));
  };

  const HelpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div 
        className={`w-full max-w-md rounded-t-3xl p-6 transform transition-transform ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Подсказки по конвертации</h3>
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
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
            }`}>
              <div className="font-medium mb-1">Длина:</div>
              <div className="text-sm">1 м = 100 см</div>
              <div className="text-sm">1 см = 10 мм</div>
              <div className="text-sm">1 дюйм = 2.54 см</div>
            </div>
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-green-900/30' : 'bg-green-50'
            }`}>
              <div className="font-medium mb-1">Объем:</div>
              <div className="text-sm">1 м³ = 1000 л</div>
              <div className="text-sm">1 л = 1000 см³</div>
              <div className="text-sm">1 м³ = 1 000 000 см³</div>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${
            darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
          }`}>
            <div className="font-medium mb-1">Вес:</div>
            <div className="text-sm">1 т = 1000 кг</div>
            <div className="text-sm">1 кг = 1000 г</div>
            <div className="text-sm">1 т = 1 000 000 г</div>
          </div>
          
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            💡 Совет: Для точных расчетов используйте метрические единицы (м, см, мм)
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold">Конвертер единиц</h2>
        <button
          onClick={() => setShowHelp(true)}
          className={`p-2 rounded-full ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors`}
        >
          <HelpCircle size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Выбор типа конвертации */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => {
              setFromUnit('m');
              setToUnit('cm');
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              ['m', 'cm', 'mm', 'inch', 'ft'].includes(fromUnit)
                ? 'bg-blue-500 text-white shadow'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Длина
          </button>
          <button
            onClick={() => {
              setFromUnit('m3');
              setToUnit('l');
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              ['m3', 'l', 'cm3'].includes(fromUnit)
                ? 'bg-blue-500 text-white shadow'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Объем
          </button>
          <button
            onClick={() => {
              setFromUnit('kg');
              setToUnit('t');
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              ['kg', 't', 'g'].includes(fromUnit)
                ? 'bg-blue-500 text-white shadow'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Вес
          </button>
        </div>

        {/* Основная форма конвертации */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Число</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="0"
              min="0"
              step="any"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Из</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              {/* Длина */}
              <optgroup label="Длина">
                <option value="m">метры (м)</option>
                <option value="cm">сантиметры (см)</option>
                <option value="mm">миллиметры (мм)</option>
                <option value="inch">дюймы (in)</option>
                <option value="ft">футы (ft)</option>
              </optgroup>
              
              {/* Объем */}
              <optgroup label="Объем">
                <option value="m3">кубометры (м³)</option>
                <option value="l">литры (л)</option>
                <option value="cm3">см³</option>
              </optgroup>
              
              {/* Вес */}
              <optgroup label="Вес">
                <option value="kg">килограммы (кг)</option>
                <option value="t">тонны (т)</option>
                <option value="g">граммы (г)</option>
              </optgroup>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">В</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              {/* Длина */}
              <optgroup label="Длина">
                <option value="m">метры (м)</option>
                <option value="cm">сантиметры (см)</option>
                <option value="mm">миллиметры (мм)</option>
                <option value="inch">дюймы (in)</option>
                <option value="ft">футы (ft)</option>
              </optgroup>
              
              {/* Объем */}
              <optgroup label="Объем">
                <option value="m3">кубометры (м³)</option>
                <option value="l">литры (л)</option>
                <option value="cm3">см³</option>
              </optgroup>
              
              {/* Вес */}
              <optgroup label="Вес">
                <option value="kg">килограммы (кг)</option>
                <option value="t">тонны (т)</option>
                <option value="g">граммы (г)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Кнопка конвертации */}
        <button
          onClick={convert}
          className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } shadow-lg hover:shadow-xl`}
        >
          ⇄ Конвертировать
        </button>

        {/* Результат */}
        {result && (
          <div className={`p-4 rounded-2xl mt-4 ${
            darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <div className="text-center">
              <div className="text-sm font-medium mb-1">Результат:</div>
              <div className="text-3xl font-bold">
                {value} {fromUnit} = {result} {toUnit}
              </div>
            </div>
          </div>
        )}

        {/* Быстрые конвертации */}
        <div className="mt-6">
          <h3 className="font-bold mb-3 text-center">Частые конвертации</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { from: 'm', to: 'cm', text: 'м → см' },
              { from: 'cm', to: 'mm', text: 'см → мм' },
              { from: 'm3', to: 'l', text: 'м³ → л' },
              { from: 'kg', to: 't', text: 'кг → т' }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setValue('1');
                  setFromUnit(item.from);
                  setToUnit(item.to);
                  setResult('');
                }}
                className={`p-3 rounded-xl border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } transition-colors`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      {result && (
          <button
            onClick={() => {
              addToFavorites({
                type: 'converter',
                fromValue: value,
                fromUnit,
                toValue: result,
                toUnit,
                timestamp: new Date().toISOString()
              });
              alert('✅ Конвертация сохранена в избранное!');
            }}
            className={`mt-6 w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center ${
              darkMode 
                ? 'bg-amber-600 hover:bg-amber-700' 
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            } transition-all shadow-lg hover:shadow-xl`}
          >
            <Heart size={24} className="mr-2" />
            Сохранить конвертацию
          </button>
        )}

      {showHelp && <HelpModal />}
    </div>
  );
};

export default UnitConverter;