import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    
    // Remove any existing theme attributes
    root.removeAttribute('data-theme');
    
    // Apply new theme
    if (theme !== 'light') {
      root.setAttribute('data-theme', theme);
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
      switch (current) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'modern';
        case 'modern':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  const setSpecificTheme = (newTheme) => {
    if (['light', 'dark', 'modern'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isModern: theme === 'modern',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;