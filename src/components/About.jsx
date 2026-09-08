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
                                I am a dedicated Front-End Developer passionate about building clean, user-focused web interfaces. I enjoy turning complex requirements into clear, accessible, and dependable experiences.
                            </p>
                            <p className="about-text">
                                I bring a practical approach to problem-solving, debugging, testing, and product improvement. I work independently and collaboratively in fast-paced environments, always learning better ways to build and ship reliable software.
                            </p>

                            <div className="about-highlights">
                                <div className="highlight-item">
                                    <span className="highlight-number">3+</span>
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
                                            <li>Contributing to UI development, testing, debugging, and product improvements for enterprise applications.</li>
                                            <li>Building responsive React interfaces and integrating APIs for dependable data-driven workflows.</li>
                                            <li>Supporting quality delivery through unit testing, analysis, and close collaboration with cross-functional teams.</li>
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
