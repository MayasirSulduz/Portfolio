import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCodeBranch, faFolder } from "@fortawesome/free-solid-svg-icons";
import "../styling/Projects.css";

function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");

    const projectsData = [
        {
            id: 1,
            title: "Real-Time Analytics & Monitoring Dashboard",
            category: "React & Data Viz",
            description: "Enterprise metric tracking and data visualization interface featuring real-time data streaming, dynamic filter controls, and custom dark mode themes.",
            tech: ["React", "Redux", "Grafana", "Prometheus", "CSS3"],
            github: "https://github.com/MayasirSulduz",
            demo: "#"
        },
        {
            id: 2,
            title: "Computer Vision & Image Processing Studio",
            category: "Python & AI",
            description: "Interactive web app leveraging OpenCV techniques for real-time image analysis, object detection, and visual inspection workflow management.",
            tech: ["Python", "Flask", "OpenCV", "NumPy", "Streamlit"],
            github: "https://github.com/MayasirSulduz",
            demo: "#"
        },
        {
            id: 3,
            title: "Glassmorphic React Portfolio Engine",
            category: "Frontend",
            description: "A sleek, responsive developer portfolio platform with fluid theme switching, custom particle effects, and soundwave audio pronunciation.",
            tech: ["React", "Vite", "JavaScript", "CSS Glassmorphism"],
            github: "https://github.com/MayasirSulduz",
            demo: "#"
        }
    ];

    const categories = ["All", "Frontend", "React & Data Viz", "Python & AI"];

    const filteredProjects = activeFilter === "All"
        ? projectsData
        : projectsData.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="projects-section section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">A showcase of recent web applications, data dashboards, and frontend engineering work</p>

                <div className="filter-buttons">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="project-card glass-card">
                            <div className="project-header">
                                <div className="folder-icon">
                                    <FontAwesomeIcon icon={faFolder} />
                                </div>
                                <div className="project-links">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        title="View GitHub Repository"
                                        className="icon-link"
                                    >
                                        <FontAwesomeIcon icon={faCodeBranch} />
                                    </a>
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        title="Live Demo"
                                        className="icon-link"
                                    >
                                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    </a>
                                </div>
                            </div>

                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>

                            <div className="project-tech-list">
                                {project.tech.map((t, idx) => (
                                    <span key={idx} className="tech-badge">{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
