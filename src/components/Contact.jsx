import { useState } from "react";
import "../styling/Contact.css";
import InboxIcon from "../assets/icons/InboxIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import LocationAlt2Icon from "../assets/icons/LocationAlt2Icon";
import contactImg from "../assets/contact.png";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [copyStatus, setCopyStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 4000);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(`${label} copied!`);
        setTimeout(() => setCopyStatus(""), 2500);
    };

    return (
        <section id="contact" className="contact-section section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle">Have a question or want to work together? Send me a message!</p>

                {copyStatus && (
                    <div className="copy-toast">
                        {copyStatus}
                    </div>
                )}

                <div className="contact-grid">
                    <div className="contact-info-column">
                        <div className="info-card glass-card" onClick={() => copyToClipboard("shaiksulduz238@gmail.com", "Email")}>
                            <div className="info-icon">
                                <InboxIcon />
                            </div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p>shaiksulduz238@gmail.com</p>
                                <span className="click-copy-hint">Click to copy</span>
                            </div>
                        </div>

                        <div className="info-card glass-card" onClick={() => copyToClipboard("+919493662836", "Phone number")}>
                            <div className="info-icon">
                                <PhoneIcon />
                            </div>
                            <div className="info-text">
                                <h3>Phone</h3>
                                <p>+91 9493662836</p>
                                <span className="click-copy-hint">Click to copy</span>
                            </div>
                        </div>

                        <div className="info-card glass-card">
                            <div className="info-icon">
                                <LocationAlt2Icon />
                            </div>
                            <div className="info-text">
                                <h3>Location</h3>
                                <p>Whitefield, Bengaluru, Karnataka, India</p>
                            </div>
                        </div>

                        <div className="contact-illustration-box glass-card">
                            <img src={contactImg} alt="Contact Illustration" className="contact-illustration" />
                        </div>
                    </div>

                    <div className="contact-form-column">
                        <div className="form-card glass-card">
                            <h3 className="form-title">Send a Message</h3>

                            {submitted ? (
                                <div className="form-success">
                                    <span className="success-icon">✨</span>
                                    <h4>Thank you!</h4>
                                    <p>Your message has been sent successfully. I will get back to you soon!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Project Inquiry / Job Opportunity"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            placeholder="Write your message here..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary submit-btn">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
