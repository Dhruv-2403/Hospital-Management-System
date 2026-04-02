import ServicePage from "../../components/ServicePage/ServicePage";

export default function Service() {
  return (
    <div className="page-pad">
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-eyebrow">What We Offer</p>
        <h1 className="section-title">Our Services</h1>
        <p className="section-sub">Browse our comprehensive range of healthcare services and book online.</p>
      </div>
      <ServicePage />
    </div>
  );
}
