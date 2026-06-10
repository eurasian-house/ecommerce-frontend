import Navbar from "./Navbar";
import Footer from "../Footer"; // ✅ ADD THIS
import { Outlet } from "react-router-dom";
import WhatsAppFloat from "../WhatsAppFloat";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container-fluid px-4 mt-3">
        <Outlet />
      </div>
      <WhatsAppFloat />

      <Footer /> {/* ✅ ADD THIS */}
    </>
  );
}