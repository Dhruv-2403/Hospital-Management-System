import { Link } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { doctors } from "../../data/doctorsData";
import "./HomeDoctors.css";

export default function HomeDoctors() {
    const featured = doctors.slice(0, 8);

    return (
        <section className="home-doctors">
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">Our Team</p>
                    <h2 className="section-title">Meet Our Specialists</h2>
                    <p className="section-sub">Experienced, caring doctors across every major specialty.</p>
                </div>

                <div className="doctors-grid">
                    {featured.map((doc) => (
                        <Link to={`/doctors/${doc.id}`} key={doc.id} className="doc-card">
                            <div className="doc-img-wrap">
                                <img src={doc.image} alt={doc.name} className="doc-img" />
                                <span className={`avail-badge ${doc.available ? "avail" : "unavail"}`}>
                                    {doc.available ? "Available" : "Busy"}
                                </span>
                            </div>
                            <div className="doc-info">
                                <h3>{doc.name}</h3>
                                <p className="doc-spec">{doc.specialization}</p>
                                <div className="doc-meta">
                                    <span className="doc-rating">
                                        <FaStar className="star" /> {doc.rating}
                                    </span>
                                    <span className="doc-fee">₹{doc.fee}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="home-doctors-cta">
                    <Link to="/doctors" className="btn btn-outline">
                        View All Doctors <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
