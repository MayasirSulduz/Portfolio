import { useState, useContext, useMemo, useRef, useEffect } from "react";
import "../styling/Navbar.css";
import { ThemeContext } from "../context/Theme.jsx";
import { usePet } from "../context/PetContext.jsx";

const Navbar = ({ onOpenHuskyViewer }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pawDropdownOpen, setPawDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { isAtHome, goHome, comeBack, playBall, sayHello } = usePet();
  const dropdownRef = useRef(null);

  // Close paw dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPawDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          title={
            theme === "dark-theme"
              ? "Switch to Cyberpunk Overdrive Mode ⚡"
              : theme === "cyber-theme"
              ? "Switch to Light Mode ☀️"
              : "Switch to Dark Mode 🌙"
          }
        >
          <span className="icon">
            {theme === "dark-theme" ? "🌙" : theme === "cyber-theme" ? "⚡" : "☀️"}
          </span>
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
        {/* Paw symbol before Home */}
        <li className="paw-nav-item" ref={dropdownRef}>
          <button
            className="paw-symbol-btn"
            onClick={() => setPawDropdownOpen(!pawDropdownOpen)}
            aria-label="Leo Pet Menu"
            title="Leo 3D Pet Controls 🐾"
          >
            🐾 <span className="paw-label">Leo</span>
          </button>

          {pawDropdownOpen && (
            <div className="paw-dropdown-menu">
              <div className="paw-dropdown-header">
                <span>🐕 Leo Pet Controls</span>
              </div>
              <button
                className="paw-dropdown-item"
                onClick={() => {
                  goHome();
                  setPawDropdownOpen(false);
                }}
              >
                <span className="paw-item-icon">🏠</span> 1. Leo go home
              </button>
              <button
                className={`paw-dropdown-item ${!isAtHome ? "disabled" : "active-comeback"}`}
                disabled={!isAtHome}
                onClick={() => {
                  if (isAtHome) {
                    comeBack();
                    setPawDropdownOpen(false);
                  }
                }}
              >
                <span className="paw-item-icon">🐕</span> 2. Come back Leo
              </button>
              <button
                className="paw-dropdown-item"
                onClick={() => {
                  playBall();
                  setPawDropdownOpen(false);
                }}
              >
                <span className="paw-item-icon">⚽</span> 3. Leo play
              </button>
              <button
                className="paw-dropdown-item"
                onClick={() => {
                  sayHello();
                  setPawDropdownOpen(false);
                }}
              >
                <span className="paw-item-icon">🔊</span> 4. Hello Leo
              </button>
              <div className="paw-dropdown-divider" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.4rem 0' }}></div>
              <button
                className="paw-dropdown-item model-download-item"
                onClick={() => {
                  if (onOpenHuskyViewer) onOpenHuskyViewer();
                  setPawDropdownOpen(false);
                }}
                style={{ color: '#38bdf8', fontWeight: 'bold' }}
              >
                <span className="paw-item-icon">📦</span> 5. 3D Model Asset (.GLB/.GLTF)
              </button>
            </div>
          )}
        </li>

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
