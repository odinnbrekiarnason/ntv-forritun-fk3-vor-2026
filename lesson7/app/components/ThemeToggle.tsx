import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/root';

type ThemeName = 'light' | 'dark';
type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

function getInitialTheme(): ThemeName {
  if (typeof document === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeToggle() {
  const context = useContext(ThemeContext as React.Context<ThemeContextValue | null>);
  if (!context) {
    throw new Error('ThemeToggle must be used inside ThemeContext.Provider');
  }

  const { theme, setTheme } = context;
  const [mounted, setMounted] = useState(false);
  const storageKey = 'theme';

  useEffect(() => {
    const storedTheme = sessionStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      setMounted(true);
      return;
    }

    setTheme(getInitialTheme());
    setMounted(true);
  }, [setTheme]);

  useEffect(() => {
    if (!mounted) return;
    sessionStorage.setItem(storageKey, theme);
    applyTheme(theme);
  }, [theme, mounted]);

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return (
      <div className="theme-toggle" aria-hidden>
        Toggle theme
      </div>
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}
