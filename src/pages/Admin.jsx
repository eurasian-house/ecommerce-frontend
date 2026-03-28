import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

export default function Admin() {

    const initialForm = {
        title: "",
        main_category: "",
        sub_category: "",
        item_type: "",
        description: "",
        shape: "",
        mrp: "",
        discount_percent: "",
        selling_price: "",
        materials: "",
        primary_color: "",
        other_colors: [],
        tags: [],
        thumbnail: "",
        images: [],
        colors: [{ color_name: "", color_image: "" }],
        sizes: [{ size: "", mrp_variation: "", discount_variation: "", selling_price: "", stock: "", sku: "" }]
    };

    const [form, setForm] = useState(initialForm);
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const limit = 10;

    /* ------------------ ORDERS STATE ------------------ */
    const [orders, setOrders] = useState([]);
    const [orderFilter, setOrderFilter] = useState("all");
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderItemsMap, setOrderItemsMap] = useState({});
    const [orderSearch, setOrderSearch] = useState("");
    const [orderPage, setOrderPage] = useState(1);
    const orderLimit = 10;
    const [totalOrders, setTotalOrders] = useState(0);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ecommerce_upload");

        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dfbzqjwss/image/upload",
            formData
        );

        return res.data.secure_url;
    };

    const fetchProducts = async () => {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (search) query = query.ilike("title", `%${search}%`);
        if (category) query = query.eq("main_category", category);

        const { data } = await query.range(from, to);
        setProducts(data || []);
    };

    /* ------------------ FETCH ORDERS ------------------ */

    const fetchOrderItems = async (orderId) => {
        const { data, error } = await supabase
            .from("order_items")
            .select(`
            *,
            products (title, thumbnail)
        `)
            .eq("order_id", orderId);

        if (!error) {
            setOrderItemsMap(prev => ({
                ...prev,
                [orderId]: data
            }));
        }
    };


    const fetchOrders = async () => {
        const from = (orderPage - 1) * orderLimit;
        const to = from + orderLimit - 1;

        let data, count;

        // 🔍 IF SEARCH EXISTS → use RPC
        if (orderSearch) {
            const res = await supabase
                .rpc("search_orders", { search_text: orderSearch });

            data = res.data || [];
            count = data.length;

            // manual pagination (since RPC returns all)
            data = data.slice(from, to + 1);
        } else {
            // NORMAL FLOW
            let query = supabase
                .from("orders")
                .select("*", { count: "exact" })
                .order("created_at", { ascending: false });

            if (orderFilter !== "all") {
                query = query.eq("status", orderFilter);
            }

            const res = await query.range(from, to);

            data = res.data;
            count = res.count;
        }

        setOrders(data || []);
        setTotalOrders(count || 0);
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search, category]);

    useEffect(() => {
        fetchOrders();
    }, [orderFilter, orderSearch, orderPage]);

    useEffect(() => {
        setPage(1);
    }, [search, category]);

    const resetForm = () => {
        setForm(initialForm);
        setIsEditing(false);
        setEditingId(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleArrayInput = (e, field) => {
        setForm({ ...form, [field]: e.target.value.split(",") });
    };

    const handleColorChange = (i, e) => {
        const updated = [...form.colors];
        updated[i][e.target.name] = e.target.value;
        setForm({ ...form, colors: updated });
    };

    const handleSizeChange = (i, e) => {
        const updated = [...form.sizes];
        updated[i][e.target.name] = e.target.value;

        const mrp = Number(updated[i].mrp_variation || 0);
        const discount = Number(updated[i].discount_variation || 0);

        if (mrp && discount) {
            updated[i].selling_price = mrp - (mrp * discount) / 100;
        } else {
            updated[i].selling_price = "";
        }

        setForm({ ...form, sizes: updated });
    };

    const addColor = () => {
        setForm({ ...form, colors: [...form.colors, { color_name: "", color_image: "" }] });
    };

    const addSize = () => {
        setForm({
            ...form,
            sizes: [...form.sizes, { size: "", mrp_variation: "", discount_variation: "", selling_price: "", stock: "", sku: "" }]
        });
    };

    const removeColor = (index) => {
        const updated = [...form.colors];
        updated.splice(index, 1);
        setForm({ ...form, colors: updated });
    };

    const removeSize = (index) => {
        const updated = [...form.sizes];
        updated.splice(index, 1);
        setForm({ ...form, sizes: updated });
    };

    useEffect(() => {
        if (form.mrp && form.discount_percent) {
            const sp = form.mrp - (form.mrp * form.discount_percent) / 100;
            setForm((prev) => ({ ...prev, selling_price: sp }));
        }
    }, [form.mrp, form.discount_percent]);

    const handleEdit = async (product) => {
        const { data: colors } = await supabase.from("product_colors").select("*").eq("product_id", product.id);
        const { data: sizes } = await supabase.from("product_sizes").select("*").eq("product_id", product.id);

        setForm({
            ...initialForm,
            ...product,
            colors: colors || [],
            sizes: sizes || []
        });

        setIsEditing(true);
        setEditingId(product.id);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        await supabase.from("product_colors").delete().eq("product_id", id);
        await supabase.from("product_sizes").delete().eq("product_id", id);
        await supabase.from("products").delete().eq("id", id);
        fetchProducts();
    };

    const handleCopy = async (product) => {
        const { data: colors } = await supabase.from("product_colors").select("*").eq("product_id", product.id);
        const { data: sizes } = await supabase.from("product_sizes").select("*").eq("product_id", product.id);

        setForm({
            ...initialForm,
            ...product,
            title: product.title + " (Copy)",
            colors: colors || [],
            sizes: (sizes || []).map(s => ({ ...s, sku: "" }))
        });

        setIsEditing(false);
        setEditingId(null);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const validateForm = () => {
        if (
            !form.title ||
            !form.main_category ||
            !form.sub_category ||
            !form.item_type ||
            !form.description ||
            !form.mrp ||
            !form.discount_percent ||
            !form.selling_price ||
            !form.materials ||
            !form.primary_color ||
            !form.thumbnail ||
            form.images.length === 0 ||
            form.colors.length === 0 ||
            form.sizes.length === 0
        ) return false;

        for (let c of form.colors) {
            if (!c.color_name || !c.color_image) return false;
        }

        for (let s of form.sizes) {
            if (!s.size || !s.selling_price || !s.stock || !s.sku) return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return alert("Fill all fields");

        if (isEditing) {
            await supabase.from("products").update({
                title: form.title,
                main_category: form.main_category,
                sub_category: form.sub_category,
                item_type: form.item_type,
                description: form.description,
                mrp: form.mrp,
                discount_percent: form.discount_percent,
                selling_price: form.selling_price,
                materials: form.materials,
                primary_color: form.primary_color,
                shape: form.shape,
                other_colors: form.other_colors,
                tags: form.tags,
                thumbnail: form.thumbnail,
                images: form.images
            }).eq("id", editingId);

            await supabase.from("product_colors").delete().eq("product_id", editingId);
            await supabase.from("product_sizes").delete().eq("product_id", editingId);

            await supabase.from("product_colors").insert(
                form.colors.map(c => ({
                    product_id: editingId,
                    color_name: c.color_name,
                    color_image: c.color_image
                }))
            );

            await supabase.from("product_sizes").insert(
                form.sizes.map(s => ({
                    product_id: editingId,
                    size: s.size,
                    mrp_variation: s.mrp_variation,
                    discount_variation: s.discount_variation,
                    selling_price: s.selling_price,
                    stock: s.stock,
                    sku: s.sku
                }))
            );

            alert("Product Updated ✅");
        } else {
            const { data: product } = await supabase
                .from("products")
                .insert([{
                    title: form.title,
                    main_category: form.main_category,
                    sub_category: form.sub_category,
                    item_type: form.item_type,
                    description: form.description,
                    mrp: form.mrp,
                    discount_percent: form.discount_percent,
                    selling_price: form.selling_price,
                    materials: form.materials,
                    primary_color: form.primary_color,
                    shape: form.shape,
                    other_colors: form.other_colors,
                    tags: form.tags,
                    thumbnail: form.thumbnail,
                    images: form.images,
                    views: 0,
                    clicks: 0
                }])
                .select()
                .single();

            const productId = product.id;

            await supabase.from("product_colors").insert(
                form.colors.map(c => ({
                    product_id: productId,
                    color_name: c.color_name,
                    color_image: c.color_image
                }))
            );

            await supabase.from("product_sizes").insert(
                form.sizes.map(s => ({
                    product_id: productId,
                    size: s.size,
                    mrp_variation: s.mrp_variation,
                    discount_variation: s.discount_variation,
                    selling_price: s.selling_price,
                    stock: s.stock,
                    sku: s.sku
                }))
            );

            alert("Product Added ✅");
        }

        resetForm();
        fetchProducts();
    };

    const handleExpand = async (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
            return;
        }

        setExpandedOrder(orderId);

        if (!orderItemsMap[orderId]) {
            await fetchOrderItems(orderId);
        }
    };
    // Helper for Expanded Item
    const getTotalItems = (items = []) => {
        return items.reduce((sum, i) => sum + i.quantity, 0);
    };
    /* ------------------ STATUS FLOW ------------------ */
    const STATUS_FLOW = ["pending", "paid", "shipped", "delivered"];

    const getNextStatus = (current) => {
        const index = STATUS_FLOW.indexOf(current);
        return STATUS_FLOW[index + 1] || null;
    };

    /* ------------------ UPDATE ORDER STATUS ------------------ */
    const updateOrderStatus = async (id, newStatus) => {
        const order = orders.find(o => o.id === id);
        if (!order) return;

        const allowedNext = getNextStatus(order.status);

        if (newStatus !== order.status && newStatus !== allowedNext) {
            alert("Invalid status transition ❌");
            return;
        }

        await supabase
            .from("orders")
            .update({ status: newStatus })
            .eq("id", id);

        fetchOrders();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "warning";
            case "paid": return "primary";
            case "shipped": return "info";
            case "delivered": return "success";
            default: return "secondary";
        }
    };

    return (
        <div className="container mt-4">
            {/* Add Product Form */}

            <div className="card p-4">
                <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>

                <input className="form-control mb-2" name="title" value={form.title} placeholder="Title" onChange={handleChange} />
                <input className="form-control mb-2" name="main_category" value={form.main_category} placeholder="Main Category" onChange={handleChange} />
                <input className="form-control mb-2" name="sub_category" value={form.sub_category} placeholder="Sub Category" onChange={handleChange} />
                <input className="form-control mb-2" name="item_type" value={form.item_type} placeholder="physical/digital" onChange={handleChange} />
                <textarea className="form-control mb-2" name="description" value={form.description} placeholder="Description" onChange={handleChange} />

                <input className="form-control mb-2" name="mrp" value={form.mrp} placeholder="MRP" onChange={handleChange} />
                <input className="form-control mb-2" name="discount_percent" value={form.discount_percent} placeholder="Discount %" onChange={handleChange} />
                <input className="form-control mb-2" value={form.selling_price} readOnly placeholder="Selling Price" />

                <input className="form-control mb-2" name="materials" value={form.materials} placeholder="Materials" onChange={handleChange} />
                <input className="form-control mb-2" name="primary_color" value={form.primary_color} placeholder="Primary Color" onChange={handleChange} />
                <input className="form-control mb-2" name="shape" value={form.shape} placeholder="Shape" onChange={handleChange} />

                <input className="form-control mb-2" value={form.other_colors.join(",")} placeholder="Other Colors" onChange={(e) => handleArrayInput(e, "other_colors")} />
                <input className="form-control mb-2" value={form.tags.join(",")} placeholder="Tags" onChange={(e) => handleArrayInput(e, "tags")} />

                <div>Upload Thumbnail</div>
                <input type="file" className="form-control mb-2" onChange={async e => {
                    const url = await uploadImage(e.target.files[0]);
                    setForm(prev => ({ ...prev, thumbnail: url }));
                }} />

                <div>Upload Images</div>
                <input type="file" multiple className="form-control mb-2" onChange={async e => {
                    const urls = await Promise.all([...e.target.files].map(uploadImage));
                    setForm(prev => ({ ...prev, images: urls }));
                }} />

                {/* COLORS */}
                <h5 className="mt-3">Color Variations</h5>
                {form.colors.map((c, i) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                        <input className="form-control" name="color_name" placeholder="Color Name" value={c.color_name} onChange={(e) => handleColorChange(i, e)} />
                        <input type="file" className="form-control" onChange={async (e) => {
                            const url = await uploadImage(e.target.files[0]);
                            const updated = [...form.colors];
                            updated[i].color_image = url;
                            setForm({ ...form, colors: updated });
                        }} />
                        <button className="btn btn-danger" onClick={() => removeColor(i)}>X</button>
                    </div>
                ))}
                <button className="btn btn-secondary w-100 mb-3" onClick={addColor}>Add Color</button>

                {/* SIZES */}
                <h5>Size Variations</h5>
                {form.sizes.map((s, i) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                        <input className="form-control" name="size" placeholder="Size" value={s.size} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="mrp_variation" placeholder="MRP" value={s.mrp_variation} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="discount_variation" placeholder="Discount %" value={s.discount_variation} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="selling_price" placeholder="Selling Price" value={s.selling_price} readOnly />
                        <input className="form-control" name="stock" placeholder="Stock" value={s.stock} onChange={(e) => handleSizeChange(i, e)} />
                        <input className="form-control" name="sku" placeholder="SKU" value={s.sku} onChange={(e) => handleSizeChange(i, e)} />
                        <button className="btn btn-danger" onClick={() => removeSize(i)}>X</button>
                    </div>
                ))}
                <button className="btn btn-secondary w-100 mb-3" onClick={addSize}>Add Size</button>

                <button className="btn btn-primary mt-3" onClick={handleSave}>
                    {isEditing ? "Update Product" : "Save Product"}
                </button>
            </div>

            {/* LIST (unchanged) */}
            <div className="card p-4 mt-4">

                {/* FILTERS */}
                <div className="d-flex gap-2 mb-3">
                    <input
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {[...new Set(products.map(p => p.main_category))].map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <h3>Products</h3>

                <div className="d-flex fw-bold mb-2">
                    <div style={{ width: "60px" }}>Img</div>
                    <div style={{ flex: 1 }}>Title</div>
                    <div style={{ width: "80px" }}>Views</div>
                    <div style={{ width: "80px" }}>Clicks</div>
                    <div style={{ width: "150px" }}>Actions</div>
                </div>

                {products.map(p => (
                    <div key={p.id} className="d-flex align-items-center mb-2">
                        <div style={{ width: "60px" }}>
                            <img src={p.thumbnail || ""} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        </div>

                        <div style={{ flex: 1 }}>{p.title}</div>

                        <div style={{ width: "80px" }}>{p.views || 0}</div>
                        <div style={{ width: "80px" }}>{p.clicks || 0}</div>

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

            {/* ------------------ ORDERS MANAGEMENT ------------------ */}
            <div className="card p-4 mt-4">
                <h3>Orders Management</h3>

                {/* Search UI */}
                <input
                    className="form-control mb-3"
                    placeholder="Search by Order ID / User / Amount..."
                    value={orderSearch}
                    onChange={(e) => {
                        setOrderSearch(e.target.value);
                        setOrderPage(1);
                    }}
                />

                {/* FILTERS */}
                <div className="d-flex gap-2 mb-3">
                    {["all", "pending", "paid", "shipped", "delivered"].map(f => (
                        <button
                            key={f}
                            className={`btn ${orderFilter === f ? "btn-dark" : "btn-outline-dark"}`}
                            onClick={() => setOrderFilter(f)}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* TABLE HEADER */}
                <div className="d-flex fw-bold mb-2">
                    <div style={{ width: "100px" }}>Order ID</div>
                    <div style={{ flex: 1 }}>User</div>
                    <div style={{ flex: 1 }}>Address</div>
                    <div style={{ width: "120px" }}>Amount</div>
                    <div style={{ width: "150px" }}>Status</div>
                    <div style={{ width: "150px" }}>Date</div>
                </div>

                {orders.map(o => (
                    <div key={o.id} className="card mb-3 shadow-sm">

                        {/* ORDER HEADER */}
                        <div
                            className="d-flex justify-content-between align-items-center p-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleExpand(o.id)}
                        >
                            <div>
                                <div className="fw-bold">
                                    Order #{o.id.slice(0, 8)}
                                </div>
                                <div className="text-muted small">
                                    {new Date(o.created_at).toLocaleString()}
                                </div>
                            </div>

                            <div>
                                ₹{Number(o.total_amount).toLocaleString()}
                            </div>

                            <div>
                                <span className={`badge bg-${getStatusColor(o.status)}`}>
                                    {o.status.toUpperCase()}
                                </span>
                            </div>

                            <div style={{ minWidth: 150 }}>
                                <select
                                    className="form-select"
                                    value={o.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                >
                                    {/* Current status */}
                                    <option value={o.status}>
                                        {o.status.toUpperCase()}
                                    </option>

                                    {/* Next allowed status */}
                                    {getNextStatus(o.status) && (
                                        <option value={getNextStatus(o.status)}>
                                            {getNextStatus(o.status).toUpperCase()}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* ORDER DETAILS */}
                        <div className="px-3 pb-2 text-muted small">
                            User: {o.user_id} | City: {o.address?.city || "-"}
                        </div>

                        {/* EXPANDED SECTION */}
                        {expandedOrder === o.id && (
                            <div className="border-top p-3 bg-light">

                                {/* SUMMARY */}
                                <div className="mb-2 fw-bold">
                                    Items: {getTotalItems(orderItemsMap[o.id] || [])}
                                </div>

                                {/* ITEMS */}
                                {(orderItemsMap[o.id] || []).map(item => (
                                    <div key={item.id} className="d-flex align-items-center mb-3">

                                        <img
                                            src={item.products?.thumbnail}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                objectFit: "cover",
                                                borderRadius: 8,
                                                marginRight: 12
                                            }}
                                        />

                                        <div style={{ flex: 1 }}>
                                            <div className="fw-semibold">
                                                {item.products?.title}
                                            </div>
                                            <div className="text-muted small">
                                                Qty: {item.quantity}
                                            </div>
                                        </div>

                                        <div className="fw-bold">
                                            ₹{Number(item.price).toLocaleString()}
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                ))}
                {/* Pagination UI */}
                <div className="d-flex gap-2 mt-3">
                    <button
                        disabled={orderPage === 1}
                        onClick={() => setOrderPage(orderPage - 1)}
                    >
                        Prev
                    </button>

                    <span>
                        Page {orderPage} / {Math.ceil(totalOrders / orderLimit) || 1}
                    </span>

                    <button
                        disabled={orderPage * orderLimit >= totalOrders}
                        onClick={() => setOrderPage(orderPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}