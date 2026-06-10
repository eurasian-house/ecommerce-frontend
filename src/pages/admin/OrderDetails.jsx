import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../../services/orderService";

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        const data = await getOrderById(id);
        setOrder(data);
    };

    const handleStatusChange = async (status) => {
        await updateOrderStatus(id, status);
        fetchOrder();
    };

    if (!order) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4">

            <h3>Order Details</h3>

            <div className="card p-3 mb-3">
                <p><b>Order ID:</b> {order.id}</p>
                <p><b>Name:</b> {order.profiles?.full_name}</p>
                <p><b>Phone:</b> {order.profiles?.phone}</p>
                <p><b>Email:</b> {order.profiles?.email}</p>
                <p><b>Address:</b> {order.profiles?.address}</p>
                <p><b>City:</b> {order.profiles?.city}</p>
                <p><b>State:</b> {order.profiles?.state}</p>
                <p><b>Country:</b> {order.profiles?.country}</p>
                <p><b>Pin Code:</b> {order.profiles?.pincode}</p>
                <p><b>Total:</b> ${order.total_amount}</p>
                <p><b>Date:</b> {new Date(order.created_at).toLocaleString()}</p>
            </div>

            <div className="card p-3 mb-3">
                <h5>Status</h5>
                <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <option value="pending">PENDING</option>
                    <option value="paid">PAID</option>
                    <option value="shipped">SHIPPED</option>
                    <option value="delivered">DELIVERED</option>
                    <option value="cancelled">CANCELLED</option>
                </select>
            </div>

            <div className="card p-3">
                <h5>Items</h5>

                {order.order_items.map(item => (
                    <div key={item.id} className="d-flex mb-3">

                        <img
                            src={item.products?.thumbnail}
                            style={{ width: 60, height: 60, marginRight: 10 }}
                        />

                        <div style={{ flex: 1 }}>
                            {item.products?.title}
                            <div className="small text-muted">
                                Qty: {item.quantity}
                            </div>

                            {item.products?.size}
                            <div className="small text-muted">
                                Size: {item.size}
                            </div>
                            {item.products?.color}
                            <div className="small text-muted">
                                Color: {item.color}
                            </div>
                        </div>


                        <div>${item.price}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}