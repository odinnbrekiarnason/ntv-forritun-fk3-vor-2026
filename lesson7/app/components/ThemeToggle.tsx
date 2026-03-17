import { useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../root";



function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeToggle() {
  const theme = useContext<Theme>(ThemeContext);
  const [themeState, setThemeState] = useState<Theme>(theme)
  const [mounted, setMounted] = useState(false);
  const storageKey = 'key';

  useEffect(() => {
    if(sessionStorage.getItem(storageKey) !== null) {
      const getStoredTheme = sessionStorage.getItem(storageKey)
      const parsed = getStoredTheme as Theme
      setThemeState(parsed);
      setMounted(true)
      return
    }
    setThemeState(getInitialTheme())
    setMounted(true);
  }, [theme, mounted]);
  
  useEffect(() => {
    sessionStorage.setItem(storageKey, theme)
  })

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, mounted]);


  const toggle = () => {
    setThemeState((t) => (themeState === 'light' ? 'dark' : 'light'));
    console.log(themeState, theme)
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
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
