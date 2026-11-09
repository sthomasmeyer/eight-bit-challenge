import React, { useEffect, useState } from 'react';
import '../styles/ThemeToggle.css';

const THEME_STORAGE_KEY = 'eight-bit-challenge-theme';

const SunIcon = () => (
  <svg
    className='ThemeToggle-icon'
    viewBox='0 0 24 24'
    width='14'
    height='14'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.85'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='4.25' />
    <line x1='12' y1='2.5' x2='12' y2='4.75' />
    <line x1='12' y1='19.25' x2='12' y2='21.5' />
    <line x1='4.93' y1='4.93' x2='6.52' y2='6.52' />
    <line x1='17.48' y1='17.48' x2='19.07' y2='19.07' />
    <line x1='2.5' y1='12' x2='4.75' y2='12' />
    <line x1='19.25' y1='12' x2='21.5' y2='12' />
    <line x1='4.93' y1='19.07' x2='6.52' y2='17.48' />
    <line x1='17.48' y1='6.52' x2='19.07' y2='4.93' />
  </svg>
);

const MoonIcon = () => (
  <svg
    className='ThemeToggle-icon'
    viewBox='0 0 24 24'
    width='14'
    height='14'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.85'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z' />
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      className='ThemeToggle'
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span className='ThemeToggle-label'>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle;
