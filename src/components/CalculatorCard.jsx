// src/components/CalculatorCard.jsx
import React from 'react';

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

export default CalculatorCard;