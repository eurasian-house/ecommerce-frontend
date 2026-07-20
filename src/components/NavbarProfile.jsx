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

      if (!data.avatar_url) {
        const { assignDefaultAvatar } = await import("../utils/assignDefaultAvatar");
        const avatar = assignDefaultAvatar();

        const { error } = await supabase
          .from("profiles")
          .update({ avatar_url: avatar })
          .eq("id", user.id);

        if (error) {
          console.error("Failed to assign default avatar:", error);
          return;
        }

        data.avatar_url = avatar;
      }

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
    <div
      className="position-relative"
      ref={dropdownRef}
      style={{ overflow: "visible" }}
    >
      {/* Profile Icon */}
      <button
        className="btn border-0 bg-transparent p-0 ms-2"
        onClick={() => setOpen(!open)}
        aria-label={user ? "Open account menu" : "Open login menu"}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {user ? (
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{
              padding: "2px",
              border: "1.5px solid #d6d6d6",
            }}
          >
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
        <div
          className="card border-0 shadow-lg rounded-4 profile-dropdown"
          style={{ width: 280, overflow: "hidden" }}
        >
          <div className="card-body">

            <div className="text-center mb-4">

              <UserAvatar
                src={getAvatar(profile)}
                alt={profile?.full_name}
                size={68}
              />

              <h6 className="fw-bold mt-3 mb-1">
                {profile?.full_name || "Guest"}
              </h6>

              {user && (
                <div
                  className="text-muted small"
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {user.email}
                </div>
              )}

            </div>

            <button
              className="btn btn-outline-dark rounded-pill w-100 mb-2"
              onClick={() => {
                setOpen(false);
                navigate("/account");
              }}
            >
              <>
                <i className="bi bi-person me-2"></i>
                My Account
              </>
            </button>

            {!user ? (
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => navigate("/login")}
              >
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </>
              </button>
            ) : (
              <button
                className="btn btn-danger rounded-pill w-100"
                onClick={handleLogout}
              >
                <>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </>
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
