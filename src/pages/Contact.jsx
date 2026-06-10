import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
        }));
      }
    };

    getUser();
  }, []);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Failed to send message");
    } else {
      setSuccess("Message sent successfully!");

      setFormData((prev) => ({
        firstName: "",
        lastName: "",
        email: prev.email,
        phone: "",
        message: "",
      }));
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold lh-1 mb-3 text-primary">Get in Touch</h1>
        <p className="lead text-muted">
          Have a question? We'd love to hear from you.
        </p>
      </div>

      <div className="row g-5">

        {/* LEFT */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg rounded-4 p-4">

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="form-control form-control-lg bg-light border-0 small-placeholder"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="form-control form-control-lg bg-light border-0 small-placeholder"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="form-control form-control-lg bg-light border-0 small-placeholder"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+CountryCode ContactNumber (+1 202 555 0123)"
                    className="form-control form-control-lg bg-light border-0 small-placeholder"
                    required
                  />
                </div>



                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Message
                  </label>

                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="form-control form-control-lg bg-light border-0 small-placeholder"
                  />
                </div>

                {success && (
                  <div className="col-12">
                    <div className="alert alert-success">
                      {success}
                    </div>
                  </div>
                )}

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm"
                    style={{
                      backgroundColor: "#0d6efd",
                      borderColor: "#0d6efd",
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-5">
          <div className="h-100 p-5 bg-dark text-white rounded-4 shadow-lg">

            <h2 className="fw-bold mb-4 text-center">
              Contact Information
            </h2>

            <p className="text-secondary mb-5 text-center">
              Fill out the form and our team will get back to you within a fraction of time.
            </p>

            <div className="d-flex align-items-center mb-4">
              <div className="fs-3 me-3 text-primary">📍</div>

              <div>
                <h6 className="mb-0">Our Office</h6>

                <p className="mb-0 text-secondary">
                  Bhadohi, Uttar Pradesh, India
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="fs-3 me-3 text-primary">📞</div>

              <div>
                <h6 className="mb-0">Phone</h6>

                <p className="mb-0 text-secondary">
                  +91 708 001 2972
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="fs-3 me-3 text-primary">📧</div>

              <div>
                <h6 className="mb-0">Email</h6>

                <p
                  className="mb-0 text-secondary"
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  contacteurasianhouse@gmail.com
                </p>
              </div>
            </div>

            <hr className="my-5 opacity-25" />

            <div className="d-flex gap-3 fs-4">
              <span>🌐</span>
              <span>📱</span>
              <span>✉️</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;