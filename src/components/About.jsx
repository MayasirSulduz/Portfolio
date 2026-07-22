import aboutImg from "../assets/About.png";
import "../styling/About.css";

function About() {
    return (
        <section id="about" className="about-section section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">Passionate about clean code, intuitive UI, and continuous learning</p>

                <div className="about-grid">
                    <div className="about-text-content">
                        <div className="about-card glass-card">
                            <h3 className="about-heading">Who I Am</h3>
                            <p className="about-text">
                                I am a dedicated Front-End Developer with a strong focus on building modern, high-performance, and user-centric web applications.
                            </p>
                            <p className="about-text">
                                I thrive on solving complex UI challenges, optimizing web performance, and delivering clean, maintainable code using React and modern frontend technology ecosystems.
                            </p>

                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <span className="highlight-number">1.5+</span>
                                    <span className="highlight-label">Years Experience</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-number">TCS</span>
                                    <span className="highlight-label">Current Employer</span>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-number">10+</span>
                                    <span className="highlight-label">Tech Skills</span>
                                </div>
                            </div>
                        </div>

                        <div className="experience-container">
                            <h3 className="timeline-title">Work Experience</h3>
                            
                            <div className="timeline">
                                <div className="timeline-item glass-card">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <div>
                                                <h4 className="timeline-company">Tata Consultancy Services (TCS)</h4>
                                                <p className="timeline-role">Front-End Developer</p>
                                            </div>
                                            <span className="timeline-date">Sept 2023 — Present</span>
                                        </div>
                                        <ul className="timeline-details">
                                            <li>Engineering responsive, accessible React interfaces for enterprise applications.</li>
                                            <li>Streamlining state management and API integration to ensure seamless data flow.</li>
                                            <li>Performing rigorous code reviews, unit testing, and UI debugging for high quality delivery.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-illustration-wrapper">
                        <div className="illustration-card glass-card">
                            <img
                                src={aboutImg}
                                alt="Siddavatam Sulduz Illustration"
                                className="about-illustration"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
