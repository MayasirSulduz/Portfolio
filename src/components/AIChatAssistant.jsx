import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/Theme.jsx";
import "../styling/AIChatAssistant.css";

const knowledgeBase = [
    {
        keywords: ["who", "sulduz", "about", "her", "she", "bio", "developer"],
        answer: "Sulduz is a skilled Front-End Developer at TCS. She specializes in building clean, responsive React interfaces and delivering high-quality web applications."
    },
    {
        keywords: ["tcs", "role", "experience", "work", "job", "tata"],
        answer: "Front-End Developer at Tata Consultancy Services (TCS) since September 2023. She specializes in building responsive React UIs, performance optimization, and unit testing."
    },
    {
        keywords: ["skills", "stack", "tech", "react", "python", "frontend"],
        answer: "Her core technical stack includes React, Redux, JavaScript (ES6+), HTML5, CSS3, Python, Flask, OpenCV, Streamlit, Grafana, MySQL, MongoDB, Docker, and Azure CI/CD."
    },
    {
        keywords: ["contact", "email", "phone", "hire", "reach", "location"],
        answer: "You can reach out to her via email at shaiksulduz238@gmail.com or connect on LinkedIn. She is located in Whitefield, Bengaluru, Karnataka, India!"
    },
    {
        keywords: ["project", "projects", "portfolio", "built", "workshowcase"],
        answer: "Her experience includes building real-time Grafana/Prometheus analytics dashboards, Python OpenCV image processing apps, and high-performance glassmorphic React applications."
    }
];

function AIChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hi! Ask me anything about skills, experience, or contact information!" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const { theme } = useContext(ThemeContext);
    const assistantGif = "/peeking_hi_light.gif";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToContact = (e) => {
        if (e) e.preventDefault();
        setIsOpen(false);
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.hash = "#contact";
        }
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

        const aiReply = matched
            ? { sender: "ai", text: matched.answer }
            : { sender: "ai", isFallback: true };

        setTimeout(() => {
            setMessages((prev) => [...prev, aiReply]);
        }, 500);
    };

    return (
        <div className="ai-assistant-root">
            {!isOpen && (
                <div className="peeking-assistant-container">
                    <div className="peeking-speech-bubble">
                        <span>Hi! Ask me anything 👋</span>
                    </div>
                    <button
                        className="ai-assistant-fab"
                        onClick={() => setIsOpen(true)}
                        title="Chat with Assistant"
                        aria-label="Open Assistant"
                    >
                        <img src={assistantGif} alt="Assistant Peeking" className="ai-fab-gif" />
                    </button>
                </div>
            )}

            {isOpen && (
                <div className="ai-chat-window glass-card">
                    <div className="ai-chat-header">
                        <div className="header-info">
                            <img src={assistantGif} alt="Assistant" className="ai-header-gif" />
                            <div>
                                <h4>Assistant</h4>
                                <span className="online-indicator">● Online</span>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-bubble ${msg.sender}`}>
                                {msg.isFallback ? (
                                    <span>
                                        I'm sorry not in my box, Please contact Sulduz in{" "}
                                        <button
                                            className="contact-link-btn"
                                            onClick={scrollToContact}
                                        >
                                            "contact"
                                        </button>{" "}
                                        page she will help you out. thank you
                                    </span>
                                ) : (
                                    msg.text
                                )}
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
                        <button onClick={() => handleSend("How can I contact you?")}>
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
