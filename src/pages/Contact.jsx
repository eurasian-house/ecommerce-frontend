import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

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
    <>
      <SEO
        title="Contact Eurasian House"
        description="Get in touch with Eurasian House for product inquiries, orders, or customer support."
        canonical="https://www.eurasianrugs.com/contact"
      />

      <div
        className="py-5"
        style={{
          background: "#FAF8F5",
          minHeight: "100vh",
        }}
      >
        <div className="container">

          {/* Hero */}
          <section className="text-center mb-5">

            <small
              className="text-uppercase"
              style={{
                letterSpacing: "4px",
                color: "#B68D40",
                fontWeight: 600,
              }}
            >
              Contact Eurasian House
            </small>

            <h1
              className="fw-bold mt-3"
              style={{
                color: "#2F241F",
                fontSize: "clamp(2.4rem,5vw,4.3rem)",
                lineHeight: 1.15,
              }}
            >
              Let's Create Something
              <br />
              Beautiful Together
            </h1>

            <p
              className="text-muted mx-auto mt-4"
              style={{
                maxWidth: "720px",
                lineHeight: 1.8,
                fontSize: "1.08rem",
              }}
            >
              Whether you're looking for a bespoke handmade rug, wholesale
              partnership, or simply have a question, our team is here to help.
            </p>

          </section>

          <div className="row g-5 align-items-stretch">

            {/* Contact Form */}

            <div className="col-lg-7">

              <div
                className="bg-white rounded-4 shadow-sm h-100"
                style={{
                  border: "1px solid rgba(0,0,0,.06)",
                  padding: "2.5rem",
                }}
              >

                <h2
                  className="fw-bold mb-4"
                  style={{
                    color: "#2F241F",
                  }}
                >
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="row g-4">

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="form-control form-control-lg rounded-3"
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
                        required
                        placeholder="Doe"
                        className="form-control form-control-lg rounded-3"
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
                        required
                        placeholder="name@example.com"
                        className="form-control form-control-lg rounded-3"
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
                        required
                        placeholder="+1 202 555 0123"
                        className="form-control form-control-lg rounded-3"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Message
                      </label>

                      <textarea
                        rows="6"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        className="form-control form-control-lg rounded-3"
                      />
                    </div>

                    {success && (
                      <div className="col-12">
                        <div className="alert alert-success rounded-3">
                          {success}
                        </div>
                      </div>
                    )}

                    <div className="col-12">

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-dark rounded-pill px-5 py-3 w-100"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

            {/* Contact Info */}

            <div className="col-lg-5">

              <div
                className="rounded-4 shadow-sm h-100"
                style={{
                  background:
                    "linear-gradient(135deg,#2F241F,#6B5748)",
                  color: "#fff",
                  padding: "3rem",
                }}
              >

                <small
                  className="text-uppercase"
                  style={{
                    letterSpacing: "3px",
                    opacity: ".8",
                  }}
                >
                  Contact Details
                </small>

                <h2 className="fw-bold mt-3 mb-5">
                  We'd Love To Hear
                  <br />
                  From You
                </h2>

                <div className="mb-5">

                  <div className="d-flex mb-4">

                    <div
                      className="me-3"
                      style={{
                        fontSize: "1.6rem",
                      }}
                    >
                      📍
                    </div>

                    <div>
                      <h6 className="fw-semibold mb-1">
                        Studio & Workshop
                      </h6>

                      <p className="mb-0" style={{ opacity: ".85" }}>
                        Bhadohi, Uttar Pradesh,
                        <br />
                        India
                      </p>
                    </div>

                  </div>

                  <div className="d-flex mb-4">

                    <div
                      className="me-3"
                      style={{
                        fontSize: "1.6rem",
                      }}
                    >
                      📞
                    </div>

                    <div>
                      <h6 className="fw-semibold mb-1">
                        Phone
                      </h6>

                      <p className="mb-0" style={{ opacity: ".85" }}>
                        +91 708 001 2972
                      </p>
                    </div>

                  </div>

                  <div className="d-flex">

                    <div
                      className="me-3"
                      style={{
                        fontSize: "1.6rem",
                      }}
                    >
                      ✉️
                    </div>

                    <div>
                      <h6 className="fw-semibold mb-1">
                        Email
                      </h6>

                      <p
                        className="mb-0"
                        style={{
                          opacity: ".85",
                          wordBreak: "break-word",
                        }}
                      >
                        contact@eurasianrugs.com
                      </p>
                    </div>

                  </div>

                </div>

                <hr className="border-light opacity-25 my-5" />

                <p
                  className="mb-0"
                  style={{
                    lineHeight: 1.8,
                    opacity: ".85",
                  }}
                >
                  Every inquiry is personally reviewed by our team. We typically
                  respond within one business day and are always happy to discuss
                  custom designs, wholesale orders and interior projects.
                </p>

              </div>

            </div>

          </div>

          {/* Bottom CTA */}

          <section
            className="bg-white rounded-4 shadow-sm text-center mt-5"
            style={{
              border: "1px solid rgba(0,0,0,.06)",
              padding: "4rem 2rem",
            }}
          >

            <small
              className="text-uppercase"
              style={{
                letterSpacing: "4px",
                color: "#B68D40",
                fontWeight: 600,
              }}
            >
              Discover
            </small>

            <h2
              className="fw-bold mt-3"
              style={{
                color: "#2F241F",
              }}
            >
              Explore Our Handmade Collection
            </h2>

            <p
              className="text-muted mx-auto mt-3"
              style={{
                maxWidth: "700px",
                lineHeight: 1.8,
              }}
            >
              Browse our curated selection of Persian, Modern, Kilim, Tibetan,
              Jute and bespoke handmade rugs, crafted to bring timeless elegance
              into every space.
            </p>

            <Link
              to="/products"
              className="btn btn-dark rounded-pill px-5 py-3 mt-3"
            >
              Explore Collection
            </Link>

          </section>

        </div>
      </div>
    </>
  );
};

export default Contact;