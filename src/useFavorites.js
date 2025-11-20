import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('builderFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('builderFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (calculation) => {
    const newFavorite = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...calculation
    };
    setFavorites(prev => [newFavorite, ...prev]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites
  };
};

export default useFavorites;