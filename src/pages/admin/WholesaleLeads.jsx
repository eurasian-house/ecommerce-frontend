import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-toastify";

export default function WholesaleLeads() {
    const [loading, setLoading] = useState(true);
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        setLoading(true);

        const { data, error } = await supabase
            .from("wholesale_inquiries")
            .select("*");

        if (error) {
            toast.error(error.message);
        } else {
            setLeads(data);
        }

        setLoading(false);
    }

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="container-fluid py-4">

            <h2 className="fw-bold mb-4">
                Wholesale Leads
            </h2>

            <div className="table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-light">
                        <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Business</th>
                            <th>Country</th>
                            <th>Products</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>

                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-5 text-muted">
                                    No wholesale inquiries yet.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>
                                        <strong>{lead.company_name}</strong>
                                    </td>

                                    <td>
                                        <div>{lead.contact_person}</div>
                                        <small className="text-muted">{lead.email}</small>
                                        <br />
                                        <small className="text-muted">{lead.phone}</small>
                                    </td>

                                    <td>{lead.business_type}</td>

                                    <td>{lead.country}</td>

                                    <td>
                                        {lead.products?.join(", ")}
                                    </td>

                                    <td>{lead.quantity}</td>

                                    <td>
                                        <span className="badge bg-secondary">
                                            {lead.status}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}