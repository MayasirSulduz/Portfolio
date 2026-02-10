// function Skills() {
//     return (
//         <section id="skills" className="section">
//             <h1>Skills Section</h1>
//             <p>Add your skills content here.</p>
//         </section>
//     );
// }

// export default Skills;










import "../styling/Skills.css";

function Skills() {
    const skillsData = {
        frontend: {
            title: "Frontend",
            skills: ["HTML5", "CSS3", "JavaScript", "React", "Redux"]
        },
        backend: {
            title: "Backend",
            skills: ["Python", "Flask", "Open CV techniques", "Numpy"]
        },
        dataVisualization: {
            title: "Data Visualization",
            skills: ["Streamlit", "Gradio", "Grafana", "Prometheus"]
        },
        database: {
            title: "Database",
            skills: ["MySQL", "Mongo DB"]
        },
        otherSkills: {
            title: "Other Skills",
            skills: ["API Integration", "Debugging", "Unit testing", "Azure CI/CD pipeline", "Git", "Docker"]
        },
        softSkills: {
            title: "Soft Skills",
            skills: ["Problem-solving", "Communication", "Teamwork", "Quick Learning", "Time Management"]
        }
    };

    return (
        <section id="skills" className="skills section">
            <div className="skills-container">
                <div className="skills-image">
                    <img src="src/assets/skills.png" alt="Skills Anime" />
                </div>
                <div className="skills-content">
                    <h2 className="skills-title">Skills</h2>
                    <div className="skills-grid">
                        {Object.entries(skillsData).map(([key, category]) => (
                            <div key={key} className="skill-category">
                                <h3 className="category-title">{category.title}</h3>
                                <div className="skill-list">
                                    {category.skills.map((skill, index) => (
                                        <span key={index} className="skill-badge">{skill}</span>
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