import { useState } from "react";
import "./WholesaleContact.css";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";
import { uploadWholesaleAttachment } from "../utils/uploadWholesaleAttachment";

export default function WholesaleContact() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        company_name: "",
        contact_person: "",
        email: "",
        phone: "",
        country: "",
        website: "",
        business_type: "",
        estimated_order_value: "",
        products: [],
        quantity: "",
        shipping_destination: "",
        message: "",
        attachment: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            products: checked
                ? [...prev.products, value]
                : prev.products.filter((p) => p !== value),
        }));
    };

    const handleFile = (e) => {
        setForm((prev) => ({
            ...prev,
            attachment: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            let attachment = null;

            if (form.attachment) {
                attachment = await uploadWholesaleAttachment(form.attachment);
            }

            const { error } = await supabase
                .from("wholesale_inquiries")
                .insert({
                    company_name: form.company_name,
                    contact_person: form.contact_person,
                    email: form.email,
                    phone: form.phone,
                    website: form.website,
                    business_type: form.business_type,

                    estimated_order_value: form.estimated_order_value,

                    country: form.country,

                    products: form.products,

                    quantity: form.quantity,

                    message: form.message,

                    attachment: attachment,
                });

            if (error) throw error;

            toast.success(
                "Thank you! Our wholesale team will contact you shortly."
            );

            setForm({
                company_name: "",
                contact_person: "",
                email: "",
                phone: "",
                country: "",
                website: "",
                business_type: "",
                estimated_order_value: "",
                products: [],
                quantity: "",
                shipping_destination: "",
                message: "",
                attachment: null,
            });

            e.target.reset();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong.");

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container py-5 wholesale-contact">

            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold">
                    Wholesale & Custom Manufacturing
                </h1>

                <p
                    className="lead text-muted mx-auto"
                    style={{ maxWidth: "700px" }}
                >
                    Partner directly with Eurasian House for handcrafted rugs,
                    hotel projects, retail collections and custom manufacturing.
                </p>
            </div>

            <div className="row g-4">

                <div className="col-lg-8">

                    <form
                        onSubmit={handleSubmit}
                        className="card border-0 shadow-sm p-4"
                    >

                        {/* ================= Company Information ================= */}

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">

                                <h4 className="fw-semibold mb-4">
                                    <i className="bi bi-building me-2"></i>
                                    Company Information
                                </h4>

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="company_name"
                                                name="company_name"
                                                placeholder="Company Name"
                                                value={form.company_name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="company_name">
                                                Company Name *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="contact_person"
                                                name="contact_person"
                                                placeholder="Contact Person"
                                                value={form.contact_person}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="contact_person">
                                                Contact Person *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Business Email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="email">
                                                Business Email *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                placeholder="Phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="phone">
                                                Phone / WhatsApp *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                name="country"
                                                placeholder="Country"
                                                value={form.country}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="country">
                                                Country *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="url"
                                                className="form-control"
                                                id="website"
                                                name="website"
                                                placeholder="Website"
                                                value={form.website}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="website">
                                                Website
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* ================= Business Details ================= */}

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">

                                <h4 className="fw-semibold mb-4">
                                    <i className="bi bi-briefcase me-2"></i>
                                    Business Details
                                </h4>

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select
                                                className="form-select"
                                                id="business_type"
                                                name="business_type"
                                                value={form.business_type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value=""></option>
                                                <option>Importer</option>
                                                <option>Wholesaler</option>
                                                <option>Retail Chain</option>
                                                <option>Interior Designer</option>
                                                <option>Hotel</option>
                                                <option>Architect</option>
                                                <option>Contractor</option>
                                                <option>Distributor</option>
                                                <option>Other</option>
                                            </select>

                                            <label htmlFor="business_type">
                                                Business Type *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select
                                                className="form-select"
                                                id="estimated_order_value"
                                                name="estimated_order_value"
                                                value={form.estimated_order_value}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value=""></option>
                                                <option>₹10L–25L</option>
                                                <option>₹25L–50L</option>
                                                <option>₹50L–1Cr</option>
                                                <option>₹1Cr+</option>
                                            </select>

                                            <label htmlFor="estimated_order_value">
                                                Estimated Order Value *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12">

                                        <label className="form-label mb-3">
                                            Products Interested In
                                        </label>

                                        <div>
                                            {[
                                                "Hand Knotted Rugs",
                                                "Hand Tufted Rugs",
                                                "Flatweave",
                                                "Carpets",
                                                "Custom Designs",
                                            ].map((item, index) => (
                                                <div className="product-pill" key={item}>
                                                    <input
                                                        type="checkbox"
                                                        className="btn-check"
                                                        id={`product-${index}`}
                                                        value={item}
                                                        checked={form.products.includes(item)}
                                                        onChange={handleCheckbox}
                                                    />

                                                    <label
                                                        className="btn btn-outline-dark rounded-pill"
                                                        htmlFor={`product-${index}`}
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                className="form-control"
                                                id="quantity"
                                                name="quantity"
                                                placeholder="Quantity"
                                                value={form.quantity}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="quantity">
                                                Approx. Quantity
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                className="form-control"
                                                id="shipping_destination"
                                                name="shipping_destination"
                                                placeholder="Shipping Destination"
                                                value={form.shipping_destination}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="shipping_destination">
                                                Shipping Destination
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {/* ================= Additional Information ================= */}

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">

                                <h4 className="fw-semibold mb-4">
                                    <i className="bi bi-chat-square-text me-2"></i>
                                    Additional Information
                                </h4>

                                <div className="form-floating mb-4">
                                    <textarea
                                        id="message"
                                        className="form-control"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project..."
                                        style={{ height: "180px" }}
                                    />

                                    <label htmlFor="message">
                                        Tell us about your project, preferred sizes,
                                        quantity, timeline or any custom requirements
                                    </label>
                                </div>

                                <label className="form-label fw-semibold">
                                    Attachment
                                </label>

                                <div
                                    className="upload-dropzone"
                                    onClick={() => document.getElementById("wholesale-file").click()}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();

                                        if (e.dataTransfer.files.length > 0) {
                                            handleFile({
                                                target: {
                                                    files: e.dataTransfer.files,
                                                },
                                            });
                                        }
                                    }}
                                >

                                    <i className="bi bi-cloud-arrow-up fs-1 mb-3"></i>

                                    <h5 className="mb-2">
                                        Drag & Drop your files here
                                    </h5>

                                    <p className="text-muted mb-0">
                                        or <span className="fw-semibold">click to browse</span>
                                    </p>

                                    <small className="text-muted d-block mt-2">
                                        PDF, Word, Excel, JPG, PNG, WEBP
                                    </small>

                                    {form.attachment && (
                                        <div className="mt-3 text-success fw-semibold">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            {form.attachment.name}
                                        </div>
                                    )}

                                </div>

                                <input
                                    id="wholesale-file"
                                    type="file"
                                    hidden
                                    onChange={handleFile}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
                                />

                            </div>
                        </div>

                        <button
                            className="btn btn-dark btn-lg rounded-pill py-3 w-100 fw-semibold"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Sending Inquiry..."
                                : "Request a Wholesale Quote"}
                        </button>

                        <div className="text-center small text-muted mt-4">

                            <div>✓ Response within 24 business hours</div>
                            <div>✓ Worldwide shipping support</div>
                            <div>✓ Your inquiry remains confidential</div>

                        </div>

                    </form>

                </div>

                <div className="col-lg-4">

                    <div
                        className="card border-0 shadow-sm p-4 sticky-top"
                        style={{ top: "90px" }}
                    >

                        <h4 className="fw-bold mb-4">
                            Why Partner With Us?
                        </h4>

                        <div className="d-flex mb-4">
                            <i className="bi bi-patch-check-fill text-success me-3 fs-4"></i>

                            <div>
                                <strong>Direct Manufacturer</strong>

                                <div className="text-muted small">
                                    Factory pricing with complete quality control.
                                </div>
                            </div>
                        </div>

                        <div className="d-flex mb-4">
                            <i className="bi bi-globe2 text-primary me-3 fs-4"></i>

                            <div>
                                <strong>Worldwide Export</strong>

                                <div className="text-muted small">
                                    Shipping to hotels, retailers and wholesalers worldwide.
                                </div>
                            </div>
                        </div>

                        <div className="d-flex mb-4">
                            <i className="bi bi-palette text-warning me-3 fs-4"></i>

                            <div>
                                <strong>Custom Manufacturing</strong>

                                <div className="text-muted small">
                                    Custom colors, sizes and exclusive designs.
                                </div>
                            </div>
                        </div>

                        <div className="d-flex">
                            <i className="bi bi-headset text-danger me-3 fs-4"></i>

                            <div>
                                <strong>Dedicated Support</strong>

                                <div className="text-muted small">
                                    One point of contact from inquiry to delivery.
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}