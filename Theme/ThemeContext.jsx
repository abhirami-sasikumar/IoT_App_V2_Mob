import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [userSelected, setUserSelected] = useState(false);
  // Load saved theme when app starts
  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme');
      if (savedTheme) {
        setTheme(savedTheme);
           setUserSelected(true);
      } else {
        // If no saved theme, use system default
        setTheme(Appearance.getColorScheme() || 'light');
           setUserSelected(false);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setUserSelected(true); 
    try {
      await AsyncStorage.setItem('@theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!userSelected) {
        setTheme(colorScheme || 'light');
      }
    });

    return () => subscription.remove();
  }, [userSelected]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};