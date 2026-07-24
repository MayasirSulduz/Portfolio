import { useState, useRef, useEffect } from "react";
import "../styling/AIChatAssistant.css";

const knowledgeBase = [
    {
        keywords: ["tcs", "role", "experience", "work", "job", "tata"],
        answer: "Sulduz is a Front-End Developer at Tata Consultancy Services (TCS) since September 2023. She builds responsive React UIs, optimizes performance, and conducts unit testing."
    },
    {
        keywords: ["skills", "stack", "tech", "react", "python", "frontend"],
        answer: "Sulduz specializes in React, Redux, JavaScript (ES6+), HTML5, CSS3, Python, Flask, OpenCV, Streamlit, Grafana, MySQL, MongoDB, Docker, and Azure CI/CD."
    },
    {
        keywords: ["contact", "email", "phone", "hire", "reach", "location"],
        answer: "You can email Sulduz at shaiksulduz238@gmail.com, call +91 9493662836, or connect on LinkedIn. She is based in Whitefield, Bengaluru, Karnataka!"
    },
    {
        keywords: ["project", "projects", "portfolio", "built", "workshowcase"],
        answer: "Sulduz has built real-time Grafana/Prometheus analytics dashboards, Python OpenCV image processing apps, and high-performance glassmorphic React applications."
    }
];

function AIChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hi! I'm Sulduz's AI Assistant. Ask me anything about his experience, skills, or projects!" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (textToSend) => {
        const query = (textToSend || input).trim();
        if (!query) return;

        const userMsg = { sender: "user", text: query };
        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInput("");

        // Find best contextual answer
        const lower = query.toLowerCase();
        let matched = knowledgeBase.find((kb) =>
            kb.keywords.some((kw) => lower.includes(kw))
        );

        const aiReplyText = matched
            ? matched.answer
            : "Sulduz is a passionate Front-End Developer at TCS skilled in React, Python, UI design, and modern web apps. You can contact him directly via the Contact section below!";

        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: "ai", text: aiReplyText }]);
        }, 500);
    };

    return (
        <div className="ai-assistant-root">
            {!isOpen && (
                <button
                    className="ai-assistant-badge"
                    onClick={() => setIsOpen(true)}
                    title="Ask Sulduz AI Assistant"
                >
                    🤖 <span className="badge-text">Ask Sulduz AI</span>
                </button>
            )}

            {isOpen && (
                <div className="ai-chat-window glass-card">
                    <div className="ai-chat-header">
                        <div className="header-info">
                            <span className="ai-avatar">🤖</span>
                            <div>
                                <h4>Ask Sulduz AI</h4>
                                <span className="online-indicator">Online</span>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-prompt-chips">
                        <button onClick={() => handleSend("Tell me about your role at TCS")}>
                            💼 TCS Experience
                        </button>
                        <button onClick={() => handleSend("What are your top technical skills?")}>
                            ⚡ Skills & Stack
                        </button>
                        <button onClick={() => handleSend("How can I contact Sulduz?")}>
                            ✉️ Contact Info
                        </button>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="ai-chat-input-form"
                    >
                        <input
                            type="text"
                            placeholder="Type a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AIChatAssistant;
