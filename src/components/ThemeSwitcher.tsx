'use client';

import React from 'react';
import { useTheme } from '../context/useTheme';
import '../cssComponents/ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
        />
        Light
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        Dark
      </label>
    </div>
  );
};

export default ThemeSwitcher;
