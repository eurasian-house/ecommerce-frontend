import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";


export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [priceAction, setPriceAction] = useState("");
    const [priceValue, setPriceValue] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const limit = 10;

    useEffect(() => {
        fetchProducts();
    }, [page, search, category, statusFilter]);

    const fetchProducts = async () => {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (search) query = query.ilike("title", `%${search}%`);
        if (category) query = query.eq("main_category", category);
        if (statusFilter) query = query.eq("status", statusFilter);

        const { data } = await query.range(from, to);
        setProducts(data || []);
    };

    const handleEdit = async (product) => {
        const { data: colors } = await supabase
            .from("product_colors")
            .select("*")
            .eq("product_id", product.id);

        const { data: sizes } = await supabase
            .from("product_sizes")
            .select("*")
            .eq("product_id", product.id);

        navigate("/admin/add-product", {
            state: {
                mode: "edit",
                product: {
                    ...product,
                    colors: colors || [],
                    sizes: sizes || []
                }
            }
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        await supabase.from("product_colors").delete().eq("product_id", id);
        await supabase.from("product_sizes").delete().eq("product_id", id);
        await supabase.from("products").delete().eq("id", id);
        fetchProducts();
    };

    const handleCopy = async (product) => {
        const { data: colors } = await supabase
            .from("product_colors")
            .select("*")
            .eq("product_id", product.id);

        const { data: sizes } = await supabase
            .from("product_sizes")
            .select("*")
            .eq("product_id", product.id);

        navigate("/admin/add-product", {
            state: {
                mode: "copy",
                product: {
                    ...product,
                    title: product.title + " (Copy)",
                    colors: colors || [],
                    sizes: (sizes || []).map(s => ({ ...s, sku: "" }))
                }
            }
        });
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]);
        } else {
            setSelectedIds(products.map(p => p.id));
        }
        setSelectAll(!selectAll);
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!window.confirm("Delete selected products?")) return;

        await supabase.from("product_colors").delete().in("product_id", selectedIds);
        await supabase.from("product_sizes").delete().in("product_id", selectedIds);
        await supabase.from("products").delete().in("id", selectedIds);

        setSelectedIds([]);
        setSelectAll(false);
        fetchProducts();
    };

    // ✅ REFACTORED: SINGLE RPC CALL (NO LOOPS)
    const handleBulkPriceUpdate = async () => {
        if (!priceAction || !priceValue || selectedIds.length === 0) return;

        const value = parseFloat(priceValue);

        const { error } = await supabase.rpc("bulk_update_prices", {
            product_ids: selectedIds,
            action_type: priceAction,
            action_value: value
        });

        if (error) {
            console.error("Bulk price update failed:", error.message);
            return;
        }

        setPriceAction("");
        setPriceValue("");
        setSelectedIds([]);
        setSelectAll(false);

        fetchProducts();
    };

    useEffect(() => { }, [page, search, category]);

    return (
        <div className="container mt-4 " style={{
            border: "2px solid #E60023",
            borderRadius: "40px",
            background: "#FAF8F5",
        }}>
            <div className="card p-4 mt-4 " style={{
                border: "none",
                background: "#FAF8F5",
            }}>
                <div style={{
                    border: "2px solid #E60023",
                    borderRadius: "40px",
                    background: "#FAF8F5",
                }}>

                    <h3 className="display-6 fw-bold text-center" >Products</h3>

                    {/* FILTERS */}
                    <div className="d-flex gap-2 mb-3">
                        <div className="position-relative w-100 mb-3">
                            <input
                                type="text"
                                placeholder="Search for anything"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="form-control"
                                style={{
                                    border: "2px solid #E60023",
                                    borderRadius: "40px",
                                    padding: "14px 60px 14px 20px",
                                    fontSize: "16px",
                                    outline: "none"
                                }}
                            />

                            <button
                                style={{
                                    position: "absolute",
                                    right: "6px",
                                    top: "47%",
                                    transform: "translateY(-50%)",
                                    background: "#E60023",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                <i className="bi bi-search text-white"></i>
                            </button>
                        </div>

                        <div className="mb-4" style={{ width: "25%" }}>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{
                                    width: "75%",
                                    padding: "12px 10px",
                                    marginRight: "30px",
                                    border: "2px solid #E60023",
                                    backgroundColor: "#FAF8F5",
                                    color: "#333",
                                    fontSize: "15px",
                                    outline: "none",
                                    appearance: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="">All Categories</option>
                                {[...new Set(products.map(p => p.main_category))].map((cat, i) => (
                                    <option key={i} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>



                    {/* BULK HEADER */}
                    <div className="d-flex align-items-center mb-2" style={{
                        borderRadius: "30px",
                        border: "2px solid #E60023",
                        backgroundColor: "#FAF8F5",
                        padding: "10px"
                    }}>

                        <div style={{ width: "40px" }}>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </div>

                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            {selectedIds.length > 0 && (
                                <>
                                    <span>{selectedIds.length} selected</span>

                                    <button onClick={handleBulkDelete}>Delete</button>

                                    <select
                                        value={priceAction}
                                        onChange={(e) => setPriceAction(e.target.value)}
                                    >
                                        <option value="">Edit Price</option>
                                        <option value="inc_amount">Increase by amount</option>
                                        <option value="inc_percent">Increase by %</option>
                                        <option value="dec_amount">Decrease by amount</option>
                                        <option value="dec_percent">Decrease by %</option>
                                        <option value="set">Set amount</option>
                                    </select>

                                    {priceAction && (
                                        <>
                                            <input
                                                type="number"
                                                placeholder="Enter value"
                                                value={priceValue}
                                                onChange={(e) => setPriceValue(e.target.value)}
                                                style={{ width: "120px" }}
                                            />

                                            <button onClick={handleBulkPriceUpdate}>
                                                Apply
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="d-flex fw-bold mb-2" style={{
                        borderRadius: "30px",
                        border: "2px solid #E60023",
                        backgroundColor: "#FAF8F5",
                    }}>
                        <div style={{ width: "60px", padding: "1%" }}>Img</div>
                        <div style={{ flex: 1, padding: "1%" }}>Title</div>
                        <div style={{ width: "80px", padding: "1%" }}>Views</div>
                        <div style={{ width: "80px", padding: "1%" }}>Clicks</div>
                        <div style={{ position: "relative", width: "200px" }}>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "30px",
                                    border: "2px solid #E60023",
                                    backgroundColor: "#FAF8F5",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    outline: "none",
                                    appearance: "none",
                                    transition: "0.3s"
                                }}
                                onMouseEnter={(e) => e.target.style.boxShadow = "0 0 0 2px #E60023 inset"}
                                onMouseLeave={(e) => e.target.style.boxShadow = "none"}
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            {/* custom arrow */}
                            <div style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none"
                            }}>
                                ▼
                            </div>
                        </div>
                        <div style={{ width: "150px", padding: "1%" }}>Actions</div>
                    </div>

                    {products.map(p => (
                        <div key={p.id} className="d-flex align-items-center mb-2">
                            <div style={{ width: "40px" }}>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(p.id)}
                                    onChange={() => handleSelectOne(p.id)}
                                />
                            </div>

                            <div style={{ width: "60px" }}>
                                <img src={p.thumbnail || ""} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                            </div>

                            <div style={{ flex: 1 }}>{p.title}</div>
                            <div style={{ width: "80px" }}>{p.views || 0}</div>
                            <div style={{ width: "80px" }}>{p.clicks || 0}</div>
                            <div style={{ width: "120px" }}>
                                <select
                                    value={p.status || ""}
                                    onChange={async (e) => {
                                        const newStatus = e.target.value;

                                        await supabase
                                            .from("products")
                                            .update({ status: newStatus || null })
                                            .eq("id", p.id);

                                        fetchProducts(); // refresh
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "6px",
                                        borderRadius: "20px",
                                        border: "1px solid #E60023",
                                        background:
                                            p.status === "active"
                                                ? "#d4edda"   // green
                                                : p.status === "inactive"
                                                    ? "#f8d7da" // red
                                                    : "#fff3cd", // yellow
                                        cursor: "pointer"
                                    }}
                                >
                                    <option value="">None</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div style={{ width: "150px" }}>
                                <button onClick={() => handleEdit(p)}>Edit</button>
                                <button onClick={() => handleDelete(p.id)}>Delete</button>
                                <button onClick={() => handleCopy(p)}>Copy</button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-3 d-flex gap-2">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                        <span>Page {page}</span>
                        <button disabled={products.length < limit} onClick={() => setPage(page + 1)}>Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}