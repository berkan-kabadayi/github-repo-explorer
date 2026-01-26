import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button } from "react-bootstrap";

function ThemeToggle() {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <Button
      variant={theme === "light" ? "dark" : "light"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="ms-2"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}

export default ThemeToggle;
