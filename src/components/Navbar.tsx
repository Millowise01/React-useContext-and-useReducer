import { useTheme } from "../context/ThemeContext";
import styles from "./Navbar.module.css";
import { DARK_THEME, LIGHT_THEME } from "../constants/theme";

const Navbar = () => {
  // Pull both values out of the theme context via the custom hook.
  // Because useTheme() throws if there's no provider, `theme` and
  // `toggleTheme` here are guaranteed to be defined.
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>React App</span>

      {/* Clicking this button calls the context's toggleTheme,
          which flips the shared theme state — anything else reading
          the theme (like TaskManager) will re-render with the new value. */}
      <button className={styles.toggleButton} onClick={toggleTheme}>
        {/* Label shows what you'll switch TO, not the current theme */}
        Switch to {theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME} Mode
      </button>
    </nav>
  );
};

export default Navbar;