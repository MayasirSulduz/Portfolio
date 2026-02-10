import "../styling/Contact.css";
import InboxIcon from "../assets/icons/InboxIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import LocationAlt2Icon from "../assets/icons/LocationAlt2Icon";

function Contact() {
    return (
        <section id="contact" className="contact section">
            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-header">
                        <h2 className="contact-title">Get In Touch</h2>
                        <p className="contact-subtitle">Let's connect and collaborate</p>
                    </div>
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <InboxIcon />
                            </div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p><a href="mailto:shaiksulduz238@gmail.com">shaiksulduz238@gmail.com</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <PhoneIcon />
                            </div>
                            <div className="info-text">
                                <h3>Phone</h3>
                                <p><a href="tel:+919493662836">+91 9493662836</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <LocationAlt2Icon />
                            </div>
                            <div className="info-text">
                                <h3>Whitefield, Bengaluru</h3>
                                <p>Karnataka, India</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-image">
                    <img src="src/assets/contact.png" alt="Contact Anime" />
                </div>
            </div>
        </section>
    );
}

export default Contact;
