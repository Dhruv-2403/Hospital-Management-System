import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import "./ContactsPage.css";

export default function ContactsPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully (Dummy Action)!");
        e.target.reset();
    };

    return (
        <div className="contact-wrap">
            <div className="contact-info">
                <h2>Get in Touch</h2>
                <p className="contact-desc">
                    Have questions or need assistance? Our support team is here to help you 24/7.
                </p>

                <div className="c-info-box">
                    <div className="c-icon"><FaPhone /></div>
                    <div>
                        <h4>Phone</h4>
                        <p>+91 98765 43210<br />+91 11 2345 6789</p>
                    </div>
                </div>

                <div className="c-info-box">
                    <div className="c-icon"><FaEnvelope /></div>
                    <div>
                        <h4>Email</h4>
                        <p>support@medicare.in<br />appointments@medicare.in</p>
                    </div>
                </div>

                <div className="c-info-box">
                    <div className="c-icon"><FaMapMarkerAlt /></div>
                    <div>
                        <h4>Address</h4>
                        <p>12, Health Street, Near Grand Avenue, Mumbai, Maharashtra 400001</p>
                    </div>
                </div>
            </div>

            <div className="contact-form-card">
                <h3>Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="form-input" required rows="5" placeholder="How can we help you?"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                        <FaPaperPlane /> Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
