// // src/components/NavbarProfile.jsx
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabase";

// export default function NavbarProfile() {
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const dropdownRef = useRef();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       setUser(data?.user || null);
//     };
//     getUser();
//   }, []);

//   // close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative" ref={dropdownRef}>
//       {/* Profile Icon */}
//       <button
//         className="btn btn-light ms-2"
//         onClick={() => setOpen(!open)}
//       >
//         <i className="bi bi-person-circle fs-4"></i>
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div
//           className="card shadow position-absolute end-0 mt-2"
//           style={{ width: "280px", zIndex: 1000 }}
//         >
//           <div className="card-body">

//             <div className="d-flex align-items-center mb-3">
//               <div
//                 className="bg-secondary rounded-circle me-2"
//                 style={{ width: 40, height: 40 }}
//               ></div>
//               <div>
//                 <strong>{user?.email || "Guest"}</strong>
//               </div>
//             </div>

//             <button
//               className="btn btn-primary w-100 mb-3"
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/account");
//               }}
//             >
//               View and edit profile
//             </button>

//             {!user && (
//               <button
//                 className="btn btn-outline-dark w-100"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function NavbarProfile({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <button
        className="btn btn-light ms-2"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-person-circle fs-4"></i>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="card shadow position-absolute end-0 mt-2"
          style={{ width: "280px", zIndex: 1000 }}
        >
          <div className="card-body">

            <div className="d-flex align-items-center mb-3">
              <div
                className="bg-secondary rounded-circle me-2"
                style={{ width: 40, height: 40 }}
              ></div>
              <div>
                <strong>{user ? user.email : "Guest"}</strong>
              </div>
            </div>

            <button
              className="btn btn-primary w-100 mb-3"
              onClick={() => {
                setOpen(false);
                navigate("/account");
              }}
            >
              View and edit profile
            </button>

            {!user ? (
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <button
                className="btn btn-dark w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
}