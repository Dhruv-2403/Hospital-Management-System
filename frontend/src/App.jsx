import { Routes, Route, useLocation } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Patient Pages
import Home from "./pages/Home/Home";
import Doctors from "./pages/Doctors/Doctors";
import DoctorDetail from "./pages/DoctorDetail/DoctorDetail";
import Service from "./pages/Service/Service";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage";
import Appointments from "./pages/Appointments/Appointments";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Contact from "./pages/Contact/Contact";
import EditProfile from "./pages/EditProfile/EditProfile";

// Doctor Portal Pages
import DHome from "./pages/DHome/DHome";
import List from "./pages/List/List";

import "./index.css";

const DOCTOR_PATHS = ["/doctor/dashboard", "/doctor/list", "/doctor/edit-profile"];

export default function App() {
  const { pathname } = useLocation();
  const isDoctorPortal = DOCTOR_PATHS.some((p) => pathname.startsWith(p));

  return (
    <>
      {!isDoctorPortal && <Navbar />}
      <main>
        <Routes>
          {/* Patient routes */}
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/services" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Doctor portal routes */}
          <Route path="/doctor/dashboard" element={<DHome />} />
          <Route path="/doctor/list" element={<List />} />
        </Routes>
      </main>
      {!isDoctorPortal && <Footer />}
    </>
  );
}
