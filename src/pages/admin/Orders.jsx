import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Orders() {

    // 1. states
    const [orders, setOrders] = useState([]);
    const [orderFilter, setOrderFilter] = useState("all");
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderItemsMap, setOrderItemsMap] = useState({});
    const [orderSearch, setOrderSearch] = useState("");
    const [orderPage, setOrderPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    const orderLimit = 10;


    const STATUS_FLOW = [
        "pending",
        "paid",
        "processed",
        "manufacturing",
        "manufactured",
        "shipped",
        "delivered",
    ];

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [orderFilter, orderSearch, orderPage]);

    // 2. functions
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
    // const updateOrderStatus = async (id, newStatus) => {
    //     const order = orders.find(o => o.id === id);
    //     if (!order) return;

    //     const allowedNext = getNextStatus(order.status);

    //     if (newStatus !== order.status && newStatus !== allowedNext) {
    //         alert("Invalid status transition ❌");
    //         return;
    //     }

    //     await supabase
    //         .from("orders")
    //         .update({ status: newStatus })
    //         .eq("id", id);

    //     fetchOrders();
    // };

    const updateOrderStatus = async (id, newStatus) => {
        const order = orders.find(o => o.id === id);
        if (!order) return;

        const allowedNext = getNextStatus(order.status);

        if (newStatus !== order.status && newStatus !== allowedNext) {
            alert("Invalid status transition ❌");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/orders/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update order.");
            }

            fetchOrders();
        } catch (err) {
            console.error(err);
            alert("Failed to update order status.");
        }
    };



    const getNextStatus = (current) => {
        const index = STATUS_FLOW.indexOf(current);
        return STATUS_FLOW[index + 1] || null;
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning";

            case "paid":
                return "primary";

            case "processed":
                return "secondary";

            case "manufacturing":
                return "dark";

            case "manufactured":
                return "info";

            case "shipped":
                return "primary";

            case "delivered":
                return "success";

            default:
                return "secondary";
        }
    };

    // 3. effects
    // useEffect(() => { }, [orderFilter, orderSearch, orderPage]);

    // 4. return UI (orders UI)
    return (
        <div className="container mt-4">
            {/* paste orders UI */}
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
                            onClick={() => navigate(`/admin/orders/${o.id}`)}
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
                                ${Number(o.total_amount).toLocaleString()}
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
                                            ${Number(item.price).toLocaleString()}
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