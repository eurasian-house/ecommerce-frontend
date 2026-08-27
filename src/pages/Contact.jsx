import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/Contact.css";


const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [loginRequired, setLoginRequired] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: user?.email || "",
    }));
    setLoginRequired(false);
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setLoginRequired(true);
      return;
    }

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

      <div className="contact-page">

        <div className="container">

          {/* HERO */}

          <section className="contact-hero">

            <span className="contact-eyebrow">
              Contact Eurasian House
            </span>

            <h1 className="contact-title">
              Let's Create Something
              <br />
              Beautiful Together
            </h1>

            <p className="contact-description">
              Whether you're looking for a bespoke handmade rug, wholesale
              partnership, or simply have a question, our team is here to help.
            </p>

          </section>

          {/* CONTENT */}

          <section className="contact-layout row g-5">

            {/* FORM */}

            <div className="col-lg-7">

              <div className="contact-form-card">

                <h2 className="contact-card-title">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="row g-4">

                    <div className="col-md-6">

                      <label className="contact-label">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="app-input"
                      />

                    </div>

                    <div className="col-md-6">

                      <label className="contact-label">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="app-input"
                      />

                    </div>

                    <div className="col-12">

                      <label className="contact-label">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        required
                        readOnly
                        placeholder="Log in to auto-fill your email"
                        className="app-input"
                      />

                      {!user && (
                        <p className="contact-login-notice">
                          Please <Link to="/login">log in</Link> first to use your verified email address.
                        </p>
                      )}

                    </div>

                    <div className="col-12">

                      <label className="contact-label">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 202 555 0123"
                        className="app-input"
                      />

                    </div>

                    <div className="col-12">

                      <label className="contact-label">
                        Message
                      </label>

                      <textarea
                        rows="6"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        className="app-textarea"
                      />

                    </div>

                    {success && (

                      <div className="col-12">

                        <div className="contact-success">

                          {success}

                        </div>

                      </div>

                    )}

                    {loginRequired && (
                      <div className="col-12">
                        <div className="contact-login-notice contact-login-required">
                          Please <Link to="/login">log in</Link> first to send a message.
                        </div>
                      </div>
                    )}

                    <div className="col-12">

                      <button
                        type="submit"
                        disabled={loading}
                        className="app-btn-primary w-100"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

            {/* INFO */}

            <div className="col-lg-5">

              <div className="contact-info-card">

                <span className="contact-info-subtitle">
                  Contact Details
                </span>

                <h2 className="contact-info-title">
                  We'd Love To Hear
                  <br />
                  From You
                </h2>

                <div className="contact-info-list">

                  <div className="contact-info-item">

                    <div className="contact-info-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>

                    <div>

                      <h6>Studio & Workshop</h6>

                      <p className="contact-p">
                        Bhadohi, Uttar Pradesh
                        <br />
                        India
                      </p>

                    </div>

                  </div>

                  <div className="contact-info-item">

                    <div className="contact-info-icon">
                      <i className="bi bi-telephone"></i>
                    </div>

                    <div>

                      <h6>Phone</h6>

                      <p className="contact-p">+91 708 001 2972</p>

                    </div>

                  </div>

                  <div className="contact-info-item">

                    <div className="contact-info-icon">
                      <i className="bi bi-envelope"></i>
                    </div>

                    <div>

                      <h6>Email</h6>

                      <p className="contact-email contact-p">
                        contact@eurasianrugs.com
                      </p>

                    </div>

                  </div>

                </div>

                <div className="contact-divider"></div>

                <p className="contact-note contact-p">
                  Every inquiry is personally reviewed by our team. We typically
                  respond within one business day and are always happy to discuss
                  custom designs, wholesale orders and interior projects. Message on WhatsApp for instant response.
                </p>

              </div>

            </div>

          </section>

          {/* CTA */}

          <section className="contact-cta">

            <span className="contact-cta-subtitle">
              Discover
            </span>

            <h2 className="contact-cta-title">
              Explore Our Handmade Collection
            </h2>

            <p className="contact-cta-description">
              Browse our curated selection of Persian, Modern, Kilim, Tibetan,
              Jute and bespoke handmade rugs, crafted to bring timeless elegance
              into every space.
            </p>

            <Link
              to="/products"
              className="app-btn-primary text-decoration-none"
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
