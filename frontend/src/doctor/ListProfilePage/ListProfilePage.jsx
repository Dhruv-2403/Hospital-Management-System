import { useState, useRef } from "react";
import { doctors } from "../../data/doctorsData";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./ListProfilePage.css";

export default function ListProfilePage() {
    const container = useRef();
    const [docList, setDocList] = useState(doctors);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".lpp-header", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5 })
          .fromTo(".dash-table th", { y: -10, opacity: 1 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "-=0.2")
          .fromTo("tbody tr", { x: -20, opacity: 1 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.05 }, "-=0.2");
    }, { scope: container });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this doctor?")) {
            setDocList(docList.filter((d) => d.id !== id));
        }
    };

    return (
        <div className="list-profile-page" ref={container}>
            <div className="lpp-header">
                <div>
                    <h2 className="lpp-title">Doctors List</h2>
                    <p className="lpp-sub">Manage the hospital's registered doctors.</p>
                </div>
                <button className="btn btn-primary"><FaPlus /> Add Doctor</button>
            </div>

            <div className="table-responsive">
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Experience</th>
                            <th>Fee</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docList.map((doc) => (
                            <tr key={doc.id}>
                                <td>
                                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                        <img src={doc.image} alt={doc.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                                        <strong>{doc.name}</strong>
                                    </div>
                                </td>
                                <td style={{ color: "var(--gray-600)" }}>{doc.specialization}</td>
                                <td>{doc.experience}</td>
                                <td style={{ fontWeight: 600 }}>₹{doc.fee}</td>
                                <td>
                                    <span className={`badge badge-${doc.available ? "green" : "red"}`}>
                                        {doc.available ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button className="action-btn edit-btn" title="Edit"><FaEdit /></button>
                                        <button className="action-btn delete-btn" title="Remove" onClick={() => handleDelete(doc.id)}><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {docList.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "var(--gray-500)" }}>
                                    No doctors found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
