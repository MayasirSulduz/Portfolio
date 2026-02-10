import { useState, useContext, useMemo } from "react";
import "../styling/Navbar.css"
import { ThemeContext } from "../context/Theme.jsx";


const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const particles = useMemo(() => {
    const count = 36; // number of particles across the navbar
    return Array.from({ length: count }).map(() => {
      const left = Math.random() * 100; // percent across the navbar
      const size = Math.random() * 6 + 2; // px for star size or thickness for asteroid
      const duration = Math.random() * 2 + 1.2; // seconds
      const delay = Math.random() * 3; // seconds
      const top = Math.random() * 60 + 10; // vertical placement in px-percent hybrid
      return { left, size, duration, delay, top };
    });
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#home">Shaik</a>
        <button
          className="theme-toggle"
          onClick={() => toggleTheme()}
          aria-label="Toggle theme"
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
              ['--left']: `${p.left}%`,
              ['--size']: `${p.size}px`,
              ['--duration']: `${p.duration}s`,
              ['--delay']: `${p.delay}s`,
              ['--top']: `${p.top}%`
            }}
          />
        ))}
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
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
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
