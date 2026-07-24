import { useEffect, useRef, useState } from "react";
import "../styling/SkillConstellation.css";

const skillsList = [
    { name: "React", category: "Frontend", color: "#61DAFB" },
    { name: "Redux", category: "Frontend", color: "#764ABC" },
    { name: "JavaScript", category: "Frontend", color: "#F7DF1E" },
    { name: "HTML5", category: "Frontend", color: "#E34F26" },
    { name: "CSS3", category: "Frontend", color: "#1572B6" },
    { name: "Vite", category: "Frontend", color: "#646CFF" },
    { name: "Python", category: "Backend", color: "#3776AB" },
    { name: "Flask", category: "Backend", color: "#000000" },
    { name: "OpenCV", category: "Backend", color: "#5C3EE8" },
    { name: "NumPy", category: "Backend", color: "#013243" },
    { name: "Streamlit", category: "Data Viz", color: "#FF4B4B" },
    { name: "Grafana", category: "Data Viz", color: "#F46800" },
    { name: "Prometheus", category: "Data Viz", color: "#E6522C" },
    { name: "MySQL", category: "Database", color: "#4479A1" },
    { name: "MongoDB", category: "Database", color: "#47A248" },
    { name: "Docker", category: "DevOps", color: "#2496ED" },
    { name: "Azure", category: "DevOps", color: "#0089D6" },
    { name: "Git", category: "DevOps", color: "#F05032" }
];

function SkillConstellation() {
    const canvasRef = useRef(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let width = (canvas.width = canvas.parentElement.clientWidth || 400);
        let height = (canvas.height = 360);

        const handleResize = () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.clientWidth;
                height = canvas.height = 360;
            }
        };
        window.addEventListener("resize", handleResize);

        // 3D Nodes setup
        const radius = Math.min(width, height) * 0.35;
        const nodes = skillsList.map((skill, i) => {
            const phi = Math.acos(-1 + (2 * i + 1) / skillsList.length);
            const theta = Math.sqrt(skillsList.length * Math.PI) * phi;
            return {
                ...skill,
                x3d: radius * Math.cos(theta) * Math.sin(phi),
                y3d: radius * Math.sin(theta) * Math.sin(phi),
                z3d: radius * Math.cos(phi),
                x2d: 0,
                y2d: 0,
                scale: 1
            };
        });

        let angleX = 0.003;
        let angleY = 0.005;
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;

        const onMouseDown = (e) => {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        };

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (isDragging) {
                const deltaX = e.clientX - lastMouseX;
                const deltaY = e.clientY - lastMouseY;
                angleY = deltaX * 0.0005;
                angleX = deltaY * 0.0005;
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            }

            // Check hover state
            let found = null;
            nodes.forEach((node) => {
                const dx = mouseX - node.x2d;
                const dy = mouseY - node.y2d;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 20) {
                    found = node;
                }
            });
            setHoveredSkill(found);
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        canvas.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        // Render loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);

            // Rotate nodes
            nodes.forEach((node) => {
                // Rotate around Y
                let x = node.x3d * cosY - node.z3d * sinY;
                let z = node.z3d * cosY + node.x3d * sinY;

                // Rotate around X
                let y = node.y3d * cosX - z * sinX;
                z = z * cosX + node.y3d * sinX;

                node.x3d = x;
                node.y3d = y;
                node.z3d = z;

                const perspective = 300 / (300 + z);
                node.x2d = cx + x * perspective;
                node.y2d = cy + y * perspective;
                node.scale = perspective;
            });

            // Draw connection lines
            ctx.lineWidth = 0.8;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const n1 = nodes[i];
                    const n2 = nodes[j];
                    const dx = n1.x2d - n2.x2d;
                    const dy = n1.y2d - n2.y2d;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.35;
                        ctx.strokeStyle = n1.category === n2.category
                            ? `rgba(56, 189, 248, ${alpha})`
                            : `rgba(244, 63, 94, ${alpha * 0.7})`;
                        ctx.beginPath();
                        ctx.moveTo(n1.x2d, n1.y2d);
                        ctx.lineTo(n2.x2d, n2.y2d);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes sorted by Z depth
            const sortedNodes = [...nodes].sort((a, b) => a.z3d - b.z3d);

            sortedNodes.forEach((node) => {
                const alpha = Math.max(0.2, (node.z3d + radius) / (2 * radius));
                const size = Math.max(3, 5 * node.scale);

                // Glow
                ctx.save();
                ctx.beginPath();
                ctx.arc(node.x2d, node.y2d, size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.15})`;
                ctx.fill();

                // Core Node
                ctx.beginPath();
                ctx.arc(node.x2d, node.y2d, size, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.globalAlpha = alpha;
                ctx.fill();

                // Label
                ctx.font = `${Math.round(11 * node.scale)}px Outfit, sans-serif`;
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
                ctx.textAlign = "center";
                ctx.fillText(node.name, node.x2d, node.y2d + size + 12);
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <div className="constellation-wrapper glass-card">
            <div className="constellation-header">
                <span className="constellation-title">🌌 3D Interactive Skill Matrix</span>
                <span className="constellation-hint">Drag to rotate • Hover node to inspect</span>
            </div>

            <canvas ref={canvasRef} className="constellation-canvas"></canvas>

            {hoveredSkill && (
                <div className="constellation-tooltip">
                    <strong>{hoveredSkill.name}</strong> — {hoveredSkill.category}
                </div>
            )}
        </div>
    );
}

export default SkillConstellation;
