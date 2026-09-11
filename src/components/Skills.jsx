import { useContext } from "react";
import { ThemeContext } from "../context/Theme.jsx";
import skillsImg from "../assets/skills.png";
import "../styling/Skills.css";

function Skills() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark-theme";

    const skillsData = {
        frontend: {
            title: "Frontend Development",
            iconGif: isDark ? "/frontend_dark.gif" : "/frontend_light.gif",
            skills: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript", "React.js", "Redux", "Vite"]
        },
        backend: {
            title: "Backend & Vision",
            iconGif: isDark ? "/backend_dark.gif" : "/backend_light.gif",
            skills: ["Python", "Flask", "Node.js", "OpenCV", "NumPy"]
        },
        dataVisualization: {
            title: "Data & Dashboards",
            iconGif: isDark ? "/data_dark.gif" : "/data_light.gif",
            skills: ["Streamlit", "Gradio", "Grafana", "Prometheus"]
        },
        database: {
            title: "Database Systems",
            iconGif: isDark ? "/database_dark.gif" : "/database_light.gif",
            skills: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"]
        },
        otherSkills: {
            title: "Tools & DevOps",
            iconGif: isDark ? "/tools_dark.gif" : "/tools_light.gif",
            skills: ["API Integration", "Debugging", "Unit Testing", "Azure CI/CD", "Git & GitHub", "Docker", "Kubernetes"]
        },
        softSkills: {
            title: "Soft Skills",
            iconGif: isDark ? "/softskills_dark.gif" : "/softskills_light.gif",
            skills: ["Problem Solving", "Communication", "Team Collaboration", "Quick Learner", "Time Management"]
        }
    };

    return (
        <section id="skills" className="skills-section section">
            <div className="container">
                <h2 className="section-title">Technical Skills</h2>
                <p className="section-subtitle">Core technologies, frameworks, and tools I work with every day</p>

                <div className="skills-grid-container">
                    <div className="skills-illustration-card glass-card">
                        <img src={skillsImg} alt="Skills & Technologies Illustration" className="skills-img" />
                        <div className="skills-banner">
                            <h3>Continuous Growth</h3>
                            <p>Constantly expanding my toolkit with modern web standard practices.</p>
                        </div>
                    </div>

                    <div className="skills-categories-grid">
                        {Object.entries(skillsData).map(([key, category]) => (
                            <div key={key} className="skill-category-card glass-card">
                                <div className="category-header">
                                    <div className="category-gif-wrapper">
                                        <img 
                                            src={category.iconGif} 
                                            alt={category.title} 
                                            className="category-gif-icon" 
                                        />
                                    </div>
                                    <h3 className="category-title">{category.title}</h3>
                                </div>
                                <div className="skill-badges-container">
                                    {category.skills.map((skill, index) => (
                                        <span key={index} className="skill-badge-pill">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;