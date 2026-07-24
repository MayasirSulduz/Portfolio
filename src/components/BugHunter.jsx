import { useState, useEffect } from "react";
import "../styling/BugHunter.css";

function BugHunter() {
    const [active, setActive] = useState(false);
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const totalBugs = 5;

    const startGame = () => {
        setActive(true);
        setCompleted(false);
        setScore(0);

        // Generate random bugs on screen
        const initialBugs = Array.from({ length: totalBugs }).map((_, i) => ({
            id: i,
            top: Math.random() * 70 + 15,
            left: Math.random() * 80 + 10,
            speed: Math.random() * 2 + 1,
            caught: false
        }));
        setBugs(initialBugs);
    };

    const catchBug = (id) => {
        setBugs((prevBugs) =>
            prevBugs.map((bug) => (bug.id === id ? { ...bug, caught: true } : bug))
        );
        setScore((prev) => {
            const nextScore = prev + 1;
            if (nextScore >= totalBugs) {
                setCompleted(true);
                setTimeout(() => {
                    setActive(false);
                }, 3500);
            }
            return nextScore;
        });
    };

    return (
        <div className="bug-hunter-root">
            {!active && (
                <button
                    className="bug-launcher-btn"
                    onClick={startGame}
                    title="Play Mini Bug Hunter Game"
                >
                    🐛 <span className="launcher-text">Bug Hunter</span>
                </button>
            )}

            {active && (
                <div className="bug-game-overlay">
                    <div className="bug-game-header glass-card">
                        <span>🐛 Bug Hunter Mini-Game ({score}/{totalBugs} Patched)</span>
                        <button className="bug-close-btn" onClick={() => setActive(false)}>✕</button>
                    </div>

                    {completed ? (
                        <div className="bug-victory-modal glass-card">
                            <span className="victory-emoji">🎉 🚀</span>
                            <h3>All Bugs Patched!</h3>
                            <p>Great debugging skills! Production systems are 100% nominal.</p>
                        </div>
                    ) : (
                        bugs.map(
                            (bug) =>
                                !bug.caught && (
                                    <button
                                        key={bug.id}
                                        className="bug-target"
                                        style={{ top: `${bug.top}%`, left: `${bug.left}%` }}
                                        onClick={() => catchBug(bug.id)}
                                        aria-label="Catch Bug"
                                    >
                                        🐛
                                    </button>
                                )
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default BugHunter;
