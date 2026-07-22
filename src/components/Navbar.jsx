import { useState, useContext, useMemo } from "react";
import "../styling/Navbar.css";
import { ThemeContext } from "../context/Theme.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const particles = useMemo(() => {
    const count = 30;
    return Array.from({ length: count }).map(() => {
      const left = Math.random() * 100;
      const size = Math.random() * 5 + 2;
      const duration = Math.random() * 2 + 1.2;
      const delay = Math.random() * 3;
      const top = Math.random() * 60 + 10;
      return { left, size, duration, delay, top };
    });
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#home" className="logo-brand">
          Sulduz<span className="logo-dot">.dev</span>
        </a>
        <button
          className="theme-toggle"
          onClick={() => toggleTheme()}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "dark-theme" ? "Light" : "Dark"} mode`}
        >
          <span className="icon">{theme === "dark-theme" ? "🌙" : "☀️"}</span>
        </button>
      </div>

      <div className="sky" aria-hidden="true">
        {particles.map((p, idx) => (
          <i
            key={idx}
            className="sky-particle"
            style={{
              '--left': `${p.left}%`,
              '--size': `${p.size}px`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--top': `${p.top}%`
            }}
          />
        ))}
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#home">Home</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#about">About</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#skills">Skills</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#projects">Projects</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#contact">Contact</a>
        </li>
        <li className="nav-cta-li" onClick={() => setMenuOpen(false)}>
          <a href="#contact" className="nav-resume-btn">
            Get in Touch
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
