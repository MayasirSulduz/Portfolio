import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "../styling/Home.css";

function Home() {
    const [isPlaying, setIsPlaying] = useState(false);

    const playPronunciation = () => {
        const audio = new Audio("src/assets/SiddavatamSulduz.mp3");
        setIsPlaying(true);
        audio.play();
        audio.onended = () => setIsPlaying(false);
    };

    useEffect(() => {
        // Generate decorative spans for any button with the shared `animated-btn` class
        const btns = document.querySelectorAll(".animated-btn");
        btns.forEach(function (btn) {
            // avoid regenerating if spans already exist
            if (btn.querySelectorAll(".dec-span").length) return;
            for (let i = 0; i < 120; i++) {
                const span = document.createElement("span");
                span.className = "dec-span";
                span.style.left = `${i * 2}px`;
                // small random delay for staggered animation
                const randomDelay = Math.random() * 1;
                span.style.transitionDelay = randomDelay + "s";
                btn.appendChild(span);
            }
        });
    }, []);
    
    return (
        <div className="home-container container">
            <div className="avatar">
                <img src="src/assets/Hi.png" alt="Avatar" />

            </div>
            <section id="home" className=" home section">
                <p className="intro">Hii!, I am</p>
                <div className="name-container">
                    <h1 className="name">Siddavatam Sulduz</h1>
                    <button 
                        className={`pronunciation-btn ${isPlaying ? 'playing' : ''}`}
                        onClick={playPronunciation}
                        title="Click to hear pronunciation"
                    >
                        <FontAwesomeIcon icon={faVolumeHigh} beatFade className="volume-icon" />
                    </button>
                </div>
                
                <h3 className="role">A Front End Developer</h3>

                <div className="buttons">
                    <a href="#contact" className="hire animated-btn">Get in touch</a>
                    <a href="https://github.com/MayasirSulduz" target="_blank" rel="noreferrer" className="animated-btn git">GitHub</a>
                    <a href="https://www.linkedin.com/in/mayasir-sulduz" target="_blank" rel="noreferrer" className="animated-btn link">Linkedin</a>
                </div>
            </section>

        </div>
    )
}


export default Home;