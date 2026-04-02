import ContactsPage from "../../components/ContactsPage/ContactsPage";

export default function Contact() {
  return (
    <div className="page-pad">
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-eyebrow">Support</p>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-sub">We're here to help and answer any questions you might have.</p>
      </div>
      <ContactsPage />
    </div>
  );
}
