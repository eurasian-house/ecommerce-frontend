import Navbar from "./Navbar";
import Footer from "../Footer"; // ✅ ADD THIS
import { Outlet } from "react-router-dom";
import WhatsAppFloat from "../WhatsAppFloat";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container-fluid px-1 mt-3">
          <Outlet />
        </div>
      </main>
      <WhatsAppFloat />

      <Footer /> {/* ✅ ADD THIS */}
    </>
  );
}