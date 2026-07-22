import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../assets/Hi.png";
import audioFile from "../assets/SiddavatamSulduz.mp3";
import "../styling/Home.css";

function Home() {
    const [isPlaying, setIsPlaying] = useState(false);

    const playPronunciation = () => {
        const audio = new Audio(audioFile);
        setIsPlaying(true);
        audio.play();
        audio.onended = () => setIsPlaying(false);
    };

    useEffect(() => {
        const btns = document.querySelectorAll(".animated-btn");
        btns.forEach(function (btn) {
            if (btn.querySelectorAll(".dec-span").length) return;
            for (let i = 0; i < 60; i++) {
                const span = document.createElement("span");
                span.className = "dec-span";
                span.style.left = `${i * 4}px`;
                const randomDelay = Math.random() * 0.8;
                span.style.transitionDelay = randomDelay + "s";
                btn.appendChild(span);
            }
        });
    }, []);
    
    return (
        <section id="home" className="home-section">
            <div className="home-container container">
                <div className="home-content">
                    <div className="hero-badge">
                        <span className="badge-pulse"></span>
                        Available for Frontend & UI Roles
                    </div>

                    <p className="intro-text">Hello, I'm</p>

                    <div className="name-container">
                        <h1 className="hero-name">Siddavatam Sulduz</h1>
                        <button 
                            className={`pronunciation-btn ${isPlaying ? 'playing' : ''}`}
                            onClick={playPronunciation}
                            title="Click to hear name pronunciation"
                            aria-label="Pronounce name"
                        >
                            <FontAwesomeIcon icon={faVolumeHigh} className="volume-icon" />
                        </button>
                    </div>

                    <h2 className="hero-role">
                        Front-End Developer <span className="role-gradient">&amp; UI Specialist</span>
                    </h2>

                    <p className="hero-description">
                        Front-End Developer at <strong>Tata Consultancy Services (TCS)</strong> specializing in building responsive, accessible, and high-performance web applications using React, JavaScript, and modern web UI technologies.
                    </p>

                    <div className="hero-buttons">
                        <a href="#contact" className="btn btn-primary">
                            Get In Touch <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                        <a href="#projects" className="btn btn-outline">
                            View Projects
                        </a>
                        <a 
                            href="https://github.com/MayasirSulduz" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-social"
                            title="GitHub Profile"
                        >
                            GitHub
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/mayasir-sulduz" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-social"
                            title="LinkedIn Profile"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="home-avatar-wrapper">
                    <div className="avatar-glow"></div>
                    <div className="avatar-card">
                        <img src={avatarImg} alt="Siddavatam Sulduz Avatar" className="avatar-img" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;