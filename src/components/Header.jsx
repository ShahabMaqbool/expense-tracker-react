import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./Header.css";

function Header() {
  const { theme, toggleTheme } =
    useContext(ThemeContext);

  return (
    <div className="header">
      <h1>💰 Expense Tracker</h1>

      <button
        className="theme-btn"
        onClick={toggleTheme}
      >
        {theme === "light"
          ? "🌙 Dark Mode"
          : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default Header;