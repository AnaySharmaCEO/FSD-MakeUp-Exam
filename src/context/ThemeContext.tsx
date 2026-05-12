import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'dark' | 'light' | 'cinematic' | 'minimal' | 'kids';
export type AccentColor = 'red' | 'blue' | 'purple' | 'emerald' | 'gold';

interface ThemeContextType {
  theme: ThemeType;
  accentColor: AccentColor;
  kidsMode: boolean;
  setTheme: (theme: ThemeType) => void;
  setAccentColor: (color: AccentColor) => void;
  toggleKidsMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const accentColorClasses = {
  red: {
    primary: 'bg-red-600 hover:bg-red-700',
    text: 'text-red-500',
    border: 'border-red-500',
    gradient: 'from-red-600 to-pink-600'
  },
  blue: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    text: 'text-blue-500',
    border: 'border-blue-500',
    gradient: 'from-blue-600 to-cyan-600'
  },
  purple: {
    primary: 'bg-purple-600 hover:bg-purple-700',
    text: 'text-purple-500',
    border: 'border-purple-500',
    gradient: 'from-purple-600 to-pink-600'
  },
  emerald: {
    primary: 'bg-emerald-600 hover:bg-emerald-700',
    text: 'text-emerald-500',
    border: 'border-emerald-500',
    gradient: 'from-emerald-600 to-teal-600'
  },
  gold: {
    primary: 'bg-yellow-600 hover:bg-yellow-700',
    text: 'text-yellow-500',
    border: 'border-yellow-500',
    gradient: 'from-yellow-600 to-orange-600'
  }
};

export const getAccentClasses = (color: AccentColor) => accentColorClasses[color];

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>('dark');
  const [accentColor, setAccentColorState] = useState<AccentColor>('red');
  const [kidsMode, setKidsModeState] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as ThemeType;
    const savedAccent = localStorage.getItem('app-accent') as AccentColor;
    const savedKidsMode = localStorage.getItem('app-kids-mode') === 'true';

    if (savedTheme) setThemeState(savedTheme);
    if (savedAccent) setAccentColorState(savedAccent);
    setKidsModeState(savedKidsMode);
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('app-accent', color);
  };

  const toggleKidsMode = () => {
    const newMode = !kidsMode;
    setKidsModeState(newMode);
    localStorage.setItem('app-kids-mode', String(newMode));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        kidsMode,
        setTheme,
        setAccentColor,
        toggleKidsMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
