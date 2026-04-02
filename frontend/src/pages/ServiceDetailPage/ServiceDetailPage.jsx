import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SERVICES } from "../../components/ServicePage/ServicePage";
import "./ServiceDetailPage.css";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = SERVICES.find((s) => String(s.id) === id);

  if (!service) {
    return (
      <div className="page-pad" style={{ textAlign: "center", paddingTop: 140 }}>
        <h2>Service not found</h2>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: 20 }}>Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail page-pad">
      <Link to="/services" className="back-link"><FaArrowLeft /> Back to Services</Link>

      <div className="sd-card">
        <div className="sd-icon" style={{ background: service.color + "18", color: service.color }}>
          {service.icon}
        </div>
        <h1>{service.name}</h1>
        <p className="sd-desc">{service.desc}</p>

        <div className="sd-price-row">
          <span className="sd-price-label">Starting Price</span>
          <span className="sd-price-value">{service.price > 0 ? `₹${service.price}` : "Contact us"}</span>
        </div>

        <div className="sd-info">
          <h3>What's Included</h3>
          <ul>
            <li>Consultation with specialist doctor</li>
            <li>Complete diagnostic report within 24 hours</li>
            <li>Follow-up consultation included</li>
            <li>Digital report access via patient portal</li>
          </ul>
        </div>

        <Link to="/appointments" className="btn btn-primary" style={{ marginTop: 24 }}>
          Book This Service
        </Link>
      </div>
    </div>
  );
}
