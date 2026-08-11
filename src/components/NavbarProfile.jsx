import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import UserAvatar from "../components/common/UserAvatar";
import { getAvatar } from "../utils/getAvatar";

export default function NavbarProfile({ user }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile(null);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (!data) return;

      setProfile(data);
    }

    loadProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      {/* Avatar Button  */}
      <button
        type="button"
        className="navbar-profile-button btn border-0 bg-transparent p-0"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={user ? "Open account menu" : "Open login menu"}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {user ? (
          <div className="profile-avatar-wrapper rounded-circle d-inline-flex align-items-center justify-content-center">
            <UserAvatar
              src={getAvatar(profile)}
              alt={profile?.full_name}
              size={36}
            />
          </div>
        ) : (
          <i className="bi bi-person-circle fs-4"></i>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="profile-dropdown shadow-lg">
          <div className="profile-dropdown-body">
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center">
                <UserAvatar
                  src={getAvatar(profile)}
                  alt={profile?.full_name}
                  size={68}
                />
              </div>

              <h6 className="fw-semibold mt-3 mb-1">
                {profile?.full_name || "Guest"}
              </h6>

              {user && (
                <div className="profile-email small">
                  {user.email}
                </div>
              )}
            </div>

            <button
              className="profile-btn profile-btn-outline w-100 mb-2"
              onClick={() => {
                setOpen(false);
                navigate("/account");
              }}
            >
              <i className="bi bi-person me-2"></i>
              My Account
            </button>

            {!user ? (
              <button
                className="profile-btn profile-btn-outline w-100"
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </button>
            ) : (
              <button
                className="profile-btn profile-btn-danger w-100"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
