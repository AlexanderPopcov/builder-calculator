import React from 'react';
import { Trash2, Star, ArrowLeft } from 'lucide-react';

const FavoritesScreen = ({ darkMode, onBack, favorites, removeFromFavorite }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCalculationType = (type) => {
    const types = {
      'concrete': '🏗️ Бетон',
      'tiles': '🪵 Плитка',
      'converter': '↔️ Конвертер'
    };
    return types[type] || type;
  };

  const renderCalculationDetails = (item) => {
    switch(item.type) {
      case 'concrete':
        return (
          <div className="space-y-2">
            <div><span className="font-medium">Длина:</span> {item.length}{item.unit}</div>
            <div><span className="font-medium">Ширина:</span> {item.width}{item.unit}</div>
            <div><span className="font-medium">Высота:</span> {item.height}{item.unit}</div>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div><span className="font-bold">Объем:</span> {item.volume} м³</div>
              <div><span className="font-bold">Вес:</span> {item.weight} кг</div>
            </div>
          </div>
        );
      case 'tiles':
        return (
          <div className="space-y-2">
            <div><span className="font-medium">Тип:</span> {item.surfaceType === 'floor' ? 'Пол' : 'Стена'}</div>
            <div><span className="font-medium">Размеры:</span> {item.surfaceLength} × {item.surfaceWidth} м</div>
            <div><span className="font-medium">Пачка:</span> {item.packageArea} м²</div>
            <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div><span className="font-bold">Пачек нужно:</span> {item.packagesNeeded}</div>
              <div><span className="font-bold">Остаток:</span> {Number(item.remainingArea).toFixed(2)} м²</div>
            </div>
          </div>
        );
      case 'converter':
        return (
          <div className="space-y-2">
            <div><span className="font-medium">Конвертация:</span> {item.fromValue} {item.fromUnit} → {item.toValue} {item.toUnit}</div>
            <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <div className="text-lg font-bold">{item.fromValue} {item.fromUnit} = {item.toValue} {item.toUnit}</div>
            </div>
          </div>
        );
      default:
        return <div>Детали расчета не доступны</div>;
    }
  };

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className={`p-2 rounded-full mr-3 ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold flex items-center">
          <Star size={24} className="text-yellow-400 mr-2" />
          Избранное
        </h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">❤️</div>
          <h3 className="text-xl font-bold mb-2">Нет сохраненных расчетов</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Сохраняйте расчеты, чтобы быстро к ним вернуться
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Сохранено: {favorites.length}</span>
            <button
              onClick={() => {
                if (window.confirm('Очистить все сохраненные расчеты?')) {
                  localStorage.removeItem('builderFavorites');
                  window.location.reload();
                }
              }}
              className={`text-sm font-medium ${
                darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
              }`}
            >
              Очистить все
            </button>
          </div>

          {favorites.map(item => (
            <div 
              key={item.id} 
              className={`border rounded-xl p-4 ${
                darkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${
                    item.type === 'concrete' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'tiles' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {item.type === 'concrete' ? '🏗️' : item.type === 'tiles' ? '🪵' : '↔️'}
                  </div>
                  <div>
                    <div className="font-bold">{getCalculationType(item.type)}</div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {formatDate(item.timestamp)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromFavorite(item.id)}
                  className={`p-1.5 rounded-full ${
                    darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="mt-3">
                {renderCalculationDetails(item)}
              </div>
            </div>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className={`mt-6 p-4 rounded-xl ${
          darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-start">
            <div className="text-2xl mr-3 mt-1">💡</div>
            <div className={`text-sm ${
              darkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              Все расчеты сохраняются в вашем браузере и доступны даже без интернета. 
              Чтобы сохранить расчет, нажмите кнопку ❤️ в любом калькуляторе.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;