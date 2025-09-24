import { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(''); // Assume from login
  const [form, setForm] = useState({ customerDetails: { name: '', phone: '' }, products: [] });

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/orders', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setOrders(res.data));
    }
  }, [token]);

  const handleCreate = async () => {
    await axios.post('http://localhost:3000/orders', form, { headers: { Authorization: `Bearer ${token}` } });
    // Refresh
  };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((o: any) => (
          <li key={o.id}>Order {o.id} - Total {o.totalAmount}</li>
        ))}
      </ul>
      {/* Form for create */}
      <button onClick={handleCreate}>Create Order</button>
    </div>
  );
};

export default OrdersPage;