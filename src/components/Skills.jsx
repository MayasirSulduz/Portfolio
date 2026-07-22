import skillsImg from "../assets/skills.png";
import "../styling/Skills.css";

function Skills() {
    const skillsData = {
        frontend: {
            title: "Frontend Development",
            icon: "⚡",
            skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Redux", "Vite"]
        },
        backend: {
            title: "Backend & Vision",
            icon: "🐍",
            skills: ["Python", "Flask", "OpenCV", "NumPy"]
        },
        dataVisualization: {
            title: "Data & Dashboards",
            icon: "📊",
            skills: ["Streamlit", "Gradio", "Grafana", "Prometheus"]
        },
        database: {
            title: "Database Systems",
            icon: "🗄️",
            skills: ["MySQL", "MongoDB"]
        },
        otherSkills: {
            title: "Tools & DevOps",
            icon: "🛠️",
            skills: ["API Integration", "Debugging", "Unit Testing", "Azure CI/CD", "Git & GitHub", "Docker"]
        },
        softSkills: {
            title: "Soft Skills",
            icon: "💡",
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
                                    <span className="category-icon">{category.icon}</span>
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