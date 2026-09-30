import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCodeBranch, faFolder } from "@fortawesome/free-solid-svg-icons";
import onlineClipboardVideo from "../assets/OnlineClipboard.mp4";
import testCaseGeneratorVideo from "../assets/tescasegeneratorV1.mp4";
import "../styling/Projects.css";

function ProjectVideoCard({ project }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="project-card glass-card">
            {project.video && (
                <div className="project-video-wrapper">
                    <video
                        ref={videoRef}
                        src={project.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="project-video"
                    />
                </div>
            )}

            <div className="project-header">
                <div className="folder-icon">
                    <FontAwesomeIcon icon={faFolder} />
                </div>
                <div className="project-links">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            title="View GitHub Repository"
                            className="icon-link"
                        >
                            <FontAwesomeIcon icon={faCodeBranch} />
                        </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            title="Live Demo"
                            className="icon-link"
                        >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-tech-list">
                {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-badge">{t}</span>
                ))}
            </div>

            {project.demo && project.demo !== "#" && (
                <div className="project-actions">
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-demo-btn"
                    >
                        <span>Live Demo</span>
                        <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </a>
                </div>
            )}
        </div>
    );
}

function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");

    const projectsData = [
        {
            id: 1,
            title: "Online Clipboard Platform",
            category: "Web App",
            description: "A real-time online clipboard application for instant cross-device text sharing, code snippet storage, and live synchronization.",
            tech: ["React", "TypeScript", "Node", "Postgres", "HTML5", "CSS3"],
            video: onlineClipboardVideo,
            github: "https://github.com/MayasirSulduz/onlineClipboard",
            demo: "https://online-clipboard-woad.vercel.app/"
        },
        {
            id: 2,
            title: "Test Case Generator V1",
            category: "Automation & QA",
            description: "An automated test case generator engineered to streamline QA testing workflows and dynamically create structured software test scenarios.",
            tech: ["React", "TypeScript", "Tailwind", "Node", "Automation", "REST API"],
            video: testCaseGeneratorVideo,
            github: "https://github.com/MayasirSulduz/TestCaseGenerator",
            demo: "https://aitestcasegen.vercel.app/"
        },
        {
            id: 3,
            title: "Real-Time Analytics & Monitoring Dashboard",
            category: "Frontend & Viz",
            description: "Enterprise metric tracking interface featuring real-time data streaming, custom filter controls, and dynamic dark mode themes.",
            tech: ["React", "Redux", "Grafana", "Prometheus"],
            github: "https://github.com/MayasirSulduz",
            demo: "#"
        }
    ];

    const categories = ["All", "Web App", "Automation & QA", "Frontend & Viz"];

    const filteredProjects = activeFilter === "All"
        ? projectsData
        : projectsData.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="projects-section section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">Explore live video previews and engineering showcases of recent web apps & automation tools</p>

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
                        <ProjectVideoCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
