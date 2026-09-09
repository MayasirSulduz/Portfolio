import { useContext } from "react";
import { ThemeContext } from "../context/Theme.jsx";
import "../styling/PortfolioDoodles.css";

const palettes = {
    dark: {
        primary: "#38BDF8",
        secondary: "#A78BFA",
        ink: "#E2E8F0",
        muted: "#64748B",
        paper: "#151E2E",
    },
    light: {
        primary: "#0284C7",
        secondary: "#6366F1",
        ink: "#0F172A",
        muted: "#64748B",
        paper: "#FFFFFF",
    },
};

function Spark({ palette }) {
    return (
        <svg viewBox="0 0 120 120" aria-hidden="true">
            <path d="M60 10 67 51 110 60 67 68 60 110 52 68 10 60 52 51Z" fill={palette.primary} opacity=".16" />
            <path d="M60 18 66 54 102 60 66 66 60 102 54 66 18 60 54 54Z" fill="none" stroke={palette.primary} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="91" cy="27" r="4" fill={palette.secondary} />
        </svg>
    );
}

function Note({ palette }) {
    return (
        <svg viewBox="0 0 150 120" aria-hidden="true">
            <path d="M24 18c25-9 75-8 101 2l-6 73c-28 8-68 8-101-1Z" fill={palette.paper} stroke={palette.ink} strokeWidth="3" strokeLinejoin="round" />
            <path d="M42 43c19-7 39-7 61-1M41 59c15-5 34-5 51-1M41 75c10-3 23-3 34-1" fill="none" stroke={palette.primary} strokeWidth="3" strokeLinecap="round" />
            <path d="m106 78 9 15-16-5Z" fill={palette.secondary} stroke={palette.ink} strokeWidth="2" />
        </svg>
    );
}

function Cursor({ palette }) {
    return (
        <svg viewBox="0 0 120 140" aria-hidden="true">
            <path d="m27 13 69 70-30 2-13 35-10-4 13-35-25-16Z" fill={palette.primary} stroke={palette.ink} strokeWidth="4" strokeLinejoin="round" />
            <path d="m80 25 14-8M92 42l16-1M73 12l3-10" fill="none" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

function Orbit({ palette }) {
    return (
        <svg viewBox="0 0 180 120" aria-hidden="true">
            <path d="M20 64c16-39 99-54 139-20 24 20 3 53-39 60-44 7-108-1-100-40Z" fill="none" stroke={palette.muted} strokeWidth="3" strokeLinecap="round" strokeDasharray="7 9" />
            <path d="M91 29c13 0 24 10 24 23S104 76 91 76 67 65 67 52s11-23 24-23Z" fill={palette.secondary} opacity=".2" stroke={palette.secondary} strokeWidth="3" />
            <circle cx="34" cy="31" r="6" fill={palette.primary} />
            <circle cx="142" cy="88" r="5" fill={palette.primary} />
        </svg>
    );
}

export default function PortfolioDoodles({ preview = false }) {
    const { theme } = useContext(ThemeContext);
    const palette = theme === "dark-theme" ? palettes.dark : palettes.light;

    return (
        <div className="portfolio-doodles" aria-label="Portfolio doodle preview">
            {preview && (
                <div className="doodle-preview-card" aria-label="Doodle icon preview">
                    <span className="doodle-preview-title">Doodle preview</span>
                    <div className="doodle-preview-icons">
                        <div><Spark palette={palette} /></div>
                        <div><Note palette={palette} /></div>
                        <div><Cursor palette={palette} /></div>
                        <div><Orbit palette={palette} /></div>
                    </div>
                </div>
            )}
            <div className="doodle doodle-spark"><Spark palette={palette} /></div>
            <div className="doodle doodle-note"><Note palette={palette} /></div>
            <div className="doodle doodle-cursor"><Cursor palette={palette} /></div>
            <div className="doodle doodle-orbit"><Orbit palette={palette} /></div>
        </div>
    );
}
