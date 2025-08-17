'use client';

import React from 'react';
import { useTheme } from '../context/useTheme';
import '../cssComponents/ThemeSwitcher.css';
import { useTranslations } from 'next-intl';

const ThemeSwitcher: React.FC = () => {
  const t = useTranslations();
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
        {t('theme_light')}
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        {t('theme_dark')}
      </label>
    </div>
  );
};

export default ThemeSwitcher;
