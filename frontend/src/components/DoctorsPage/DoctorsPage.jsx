import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaSearch } from "react-icons/fa";
import { doctors } from "../../data/doctorsData";
import "./DoctorsPage.css";

const SPECIALIZATIONS = ["All", ...new Set(doctors.map((d) => d.specialization))];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || d.specialization === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="doctors-wrapper">
      <div className="doctors-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input search-input"
          />
        </div>
        <div className="filter-pills">
          {SPECIALIZATIONS.map((s) => (
            <button
              key={s}
              className={`pill ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No doctors found matching your criteria.</p>
      ) : (
        <div className="doctors-grid">
          {filtered.map((doc) => (
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
                <p className="doc-exp">{doc.experience} exp</p>
                <div className="doc-meta">
                  <span className="doc-rating"><FaStar className="star" /> {doc.rating}</span>
                  <span className="doc-fee">₹{doc.fee}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
