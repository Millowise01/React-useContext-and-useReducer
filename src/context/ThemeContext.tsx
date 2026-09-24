import { createContext, useContext, useState, type ReactNode } from "react";
import { LIGHT_THEME, DARK_THEME } from "../constants/theme";

// The theme can only ever be one of the two constant values.
// `typeof LIGHT_THEME` pulls the literal type "light" (not just `string`),
// so `Theme` becomes the union "light" | "dark" — nothing else is valid.
type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

// This describes exactly what a component gets back when it reads this
// context: the current theme, and a function to flip it. Note there's
// no direct "setTheme" exposed — consumers can only toggle, not set
// arbitrary values.
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context. The default value is `undefined` on purpose —
// not a fake/placeholder theme object — so that using this context
// outside of a ThemeProvider fails loudly instead of silently doing
// the wrong thing. The `useTheme` hook below is what turns that
// failure into a clear error message.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// The provider component. It owns the actual state and wraps whatever
// part of the app needs access to the theme.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // `useState<Theme>` locks the state down to the same union type,
  // so it's impossible to accidentally set it to some other string.
  const [theme, setTheme] = useState<Theme>(LIGHT_THEME);

  // Flip between the two themes. Using the functional updater form
  // `(prevTheme) => ...` instead of reading `theme` directly is safer
  // if state updates ever get batched.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  };

  // Everything wrapped in <ThemeProvider> can now read `theme` and
  // call `toggleTheme` via the context.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook: this is the only way components should read the theme
// context. It does the "is this undefined" check once, here, instead
// of making every component that uses the theme repeat that check.
// The learning activity intentionally keeps the provider and hook together.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};